from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from datetime import datetime
import asyncio
from database import get_db
from utils.auth import get_current_user
from utils.pdf_parser import extract_text, detect_sections
from nlp.pipeline import run_full_analysis

router = APIRouter(prefix="/resume", tags=["resume"])

def _save_analysis_sync(user_id, filename, text, sections, jd_text, report):
    db = get_db()
    # Save resume doc
    resume_ref = db.collection("resumes").document()
    resume_ref.set({
        "user_id":    user_id,
        "filename":   filename,
        "raw_text":   text,
        "sections":   sections,
        "uploaded_at": datetime.utcnow().isoformat()
    })
    # Save analysis doc
    analysis_ref = db.collection("analyses").document()
    analysis_ref.set({
        "user_id":    user_id,
        "resume_id":  resume_ref.id,
        "filename":   filename,
        "jd_text":    jd_text,
        "created_at": datetime.utcnow().isoformat(),
        **report
    })
    return resume_ref.id, analysis_ref.id

def _get_history_sync(user_id):
    db = get_db()
    docs = (db.collection("analyses")
              .where("user_id", "==", user_id)
              .order_by("created_at", direction="DESCENDING")
              .limit(20)
              .get())
    results = []
    for doc in docs:
        d = doc.to_dict()
        d["id"] = doc.id
        # Only return summary fields for history list
        results.append({
            "id":            doc.id,
            "filename":      d.get("filename", ""),
            "overall_score": d.get("overall_score", 0),
            "tfidf_score":   d.get("tfidf_score", 0),
            "created_at":    d.get("created_at", ""),
            "job_title":     d.get("job_title", ""),
            "company":       d.get("company", ""),
        })
    return results

def _get_analysis_sync(analysis_id, user_id):
    db = get_db()
    doc = db.collection("analyses").document(analysis_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Analysis not found")
    d = doc.to_dict()
    d["id"] = doc.id
    return d

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    jd_text: str = Form(default=""),
    current_user: dict = Depends(get_current_user)
):
    raw = await file.read()
    text = extract_text(raw)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")
    sections = detect_sections(text)
    report   = await asyncio.to_thread(run_full_analysis, text, jd_text, sections)
    resume_id, analysis_id = await asyncio.to_thread(
        _save_analysis_sync, current_user["user_id"],
        file.filename, text, sections, jd_text, report
    )
    return {"resume_id": resume_id, "analysis_id": analysis_id, "report": report}

@router.get("/history")
async def get_history(current_user: dict = Depends(get_current_user)):
    return await asyncio.to_thread(_get_history_sync, current_user["user_id"])

@router.get("/analysis/{analysis_id}")
async def get_analysis(analysis_id: str, current_user: dict = Depends(get_current_user)):
    return await asyncio.to_thread(_get_analysis_sync, analysis_id, current_user["user_id"])