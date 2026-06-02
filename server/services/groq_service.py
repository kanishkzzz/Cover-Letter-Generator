import json
import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)

_client = None


def _get_api_key() -> str:
  key = (os.getenv("GROQ_API_KEY") or "").strip()
  if not key:
    raise ValueError(
      "GROQ_API_KEY is missing. Add it to server/.env and save the file, then restart uvicorn."
    )
  return key


def _get_model() -> str:
  return (os.getenv("GROQ_MODEL") or "llama-3.3-70b-versatile").strip()


def _get_client() -> Groq:
  global _client
  if _client is None:
    # Legacy .env used GROQ_BASE_URL=https://api.groq.com/openai/v1 for the
    # OpenAI-compatible client. The native Groq SDK already uses /openai/v1,
    # so that env var doubles the path -> 404 .../openai/v1/openai/v1/...
    base = (os.getenv("GROQ_BASE_URL") or "").rstrip("/")
    if base.endswith("/openai/v1"):
      os.environ.pop("GROQ_BASE_URL", None)

    _client = Groq(api_key=_get_api_key())
  return _client


def generate_cover_letter(
  resume_text: str, profile: dict, job_description: str
) -> str:
  prompt = f"""
You are an expert technical recruiter and career coach. Write a cover letter using ONLY the resume, profile, and job description below.

Resume:
{resume_text}

Candidate Profile:
{json.dumps(profile, indent=2)}

Job Description:
{job_description}

Rules:
- Use ONLY information from the resume and candidate profile.
- Never invent skills, projects, internships, certifications, or achievements.
- Match existing skills and projects to the job requirements.
- Sound professional but human, like a recent engineering graduate.
- Avoid corporate buzzwords.
- Do not use: "I am excited to apply", "I am thrilled to apply", "I am passionate about", "Dynamic professional", "Leveraging my skills".
- Keep it under 250 words.
- Output ONLY the cover letter.
"""
  client = _get_client()
  response = client.chat.completions.create(
    model=_get_model(),
    temperature=0.3,
    messages=[{"role": "user", "content": prompt}],
  )
  return response.choices[0].message.content.strip()
