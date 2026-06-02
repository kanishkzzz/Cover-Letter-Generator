from fastapi import FastAPI
from routes import cover_letter
app = FastAPI()


@app.get("/")
def root():
  return {"message": "Server is Running!"}

app.include_router(cover_letter.router, prefix="/api")