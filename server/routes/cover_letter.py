from fastapi import (
  APIRouter,
  UploadFile,
  File,
  Form,
  HTTPException
)
import json
from services.pdf_service import (
  extract_text_from_pdf
)
from services.groq_service import (
  generate_cover_letter,
  
)

router = APIRouter()

@router.post('/generate-cover-letter')
async def generate_cover_letter_route(
  resume: UploadFile = File(...),
  jd_text: str = Form(None),
  jd_pdf: UploadFile = File(None)
):
  if not jd_text and not jd_pdf:
    raise HTTPException(
      status_code=400,
      detail="Please provide JD text or JD pdf"
    )
  
  if not resume.filename.endswith('.pdf'):
    raise HTTPException(
      status_code=400,
      detail="Resume must be a PDF file"
    )
  #1 Extract Resume Text
  try: resume_text = await extract_text_from_pdf(resume)
  except Exception as e:
    raise HTTPException(
      status_code=500,
      detail=f"Resume Processing Failed: {str(e)}"
    )
    
  #2 Extract JD Text
  if jd_text: 
    job_description = jd_text
  else:
    try:
      job_description = await extract_text_from_pdf(jd_pdf)
    except Exception as e:
      raise HTTPException(
        status_code=500,
        detail=f"JD PDF processing failed: {str(e)}"
      )
    
  #3 Load Profile
  try:
    with open("data/profile.json", "r", encoding="utf-8") as file:
      USER_PROFILE = json.load(file)
  except FileNotFoundError:
    USER_PROFILE = {}
  
  #4 Generate Cover Letter
  try:
    cover_letter = generate_cover_letter(
      resume_text = resume_text,
      profile= USER_PROFILE,
      job_description=job_description
    )
  except Exception as e:
    raise HTTPException(
      status_code=500,
      detail=f"Groq API failed: {str(e)}"
    )
    
  return {
    "cover_letter": cover_letter
  }

