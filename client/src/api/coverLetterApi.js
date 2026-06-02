const API_URL = import.meta.env.VITE_API_URL

export async function requestCoverLetter({ resumeFile, jdText, jdPdfFile }) {
  const formData = new FormData();
  formData.append("resume", resumeFile);

  if (jdText && jdText.trim().length > 0) {
    formData.append("jd_text", jdText.trim());
  } else if (jdPdfFile) {
    formData.append("jd_pdf", jdPdfFile);
  }

  const res = await fetch(
    `${API_URL}/api/generate-cover-letter`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const detail = data?.detail || `Request failed with status ${res.status}`;
    throw new Error(detail);
  }

  return data;
}

