import fitz
from fastapi import UploadFile

async def extract_text_from_pdf(pdf_file: UploadFile) -> str:
  try:
    pdf_bytes = await pdf_file.read()
    
    document = fitz.open(stream=pdf_bytes, filetype="pdf")
    pages = [page.get_text() for page in document]
    document.close()
    
    return "\n".join(pages).strip()
  except Exception as e:
    raise ValueError(f"Failed to extract text from PDF: {str(e)}")