from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import cover_letter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://cover-letter-generator-teal.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Server is Running!"}

app.include_router(cover_letter.router, prefix="/api")