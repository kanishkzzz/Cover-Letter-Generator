# 🚀 AI Cover Letter Generator

An AI-powered web application that generates personalized cover letters from a resume and job description.

Users can upload their resume PDF and either paste a job description or upload a JD PDF. The application analyzes both documents and generates a tailored cover letter using AI.

## 🌐 Live Demo

Frontend: https://cover-letter-generator-teal.vercel.app/

Backend API: https://cover-letter-generator-jzdt.onrender.com

---

## ✨ Features

- Upload Resume PDF
- Paste Job Description Text
- Upload Job Description PDF
- AI-Powered Cover Letter Generation
- Copy Generated Cover Letter
- Download Generated Cover Letter
- Responsive Modern UI
- FastAPI Backend
- React + Vite Frontend

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript
- shadcn UI

### Backend
- FastAPI
- Python
- PyMuPDF
- fitz
- Groq API

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📁 Project Structure

```bash
Cover-Letter-Generator/
│
├── client/                         # React + Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── coverLetterApi.js   # API communication layer
│   │   │
│   │   ├── components/            # Reusable UI components
│   │   │
│   │   ├── lib/                   # Utility/helper functions
│   │   │
│   │   ├── styles/                # Styling files
│   │   │
│   │   ├── App.jsx                # Main application component
│   │   └── main.jsx               # React entry point
│   │
│   ├── .env.example               # Frontend environment variables template
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                        # FastAPI Backend
│   ├── data/                      # Sample data / storage files
│   │
│   ├── routes/
│   │   └── cover_letter.py        # API endpoints
│   │
│   ├── services/
│   │   ├── groq_service.py        # AI generation logic
│   │   └── pdf_service.py         # PDF extraction utilities
│   │
│   ├── .env.example               # Backend environment variables template
│   ├── main.py                    # FastAPI application entry point
│   ├── requirements.txt
│   └── example.py
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
GROQ_API_KEY=your_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

### Frontend (.env)

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---

## 🚀 Local Installation

### Clone Repository

```bash
git clone https://github.com/kanishkzzz/Cover-Letter-Generator.git
cd Cover-Letter-Generator
```

### Backend Setup

```bash
cd server

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

---

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoint

### Generate Cover Letter

```http
POST /api/generate-cover-letter
```

#### Request

- Resume PDF
- Job Description Text OR Job Description PDF

#### Response

```json
{
  "cover_letter": "Generated cover letter..."
}
```

---

## Screenshots

### Home Page

(Add screenshot here)

### Generated Cover Letter

(Add screenshot here)

---

## Future Improvements

- User Authentication
- Cover Letter Templates
- Multiple AI Models
- Cover Letter History
- ATS Score Analysis
- Resume Optimization Suggestions

---

## Author

**Kanishk Negi**

GitHub: https://github.com/kanishkzzz

LinkedIn: https://www.linkedin.com/in/kanishk-negi-264018302/

---

## License

This project is licensed under the MIT License.
