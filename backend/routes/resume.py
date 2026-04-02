from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from database import get_db
from utils.auth import get_current_user
from utils.pdf_parser import extract_text, detect_sections
from nlp.pipeline import run_full_analysis
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/resume", tags=["resume"])

def str_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    jd_text: str = Form(...),
    current_user: dict = Depends(get_current_user)
):
    raw = await file.read()
    text = extract_text(raw)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")
    sections = detect_sections(text)
    report = run_full_analysis(text, jd_text, sections)
    db = get_db()
    resume_doc = {
        "user_id": current_user["user_id"],
        "filename": file.filename,
        "raw_text": text,
        "sections": sections,
        "uploaded_at": datetime.utcnow()
    }
    res = await db["resumes"].insert_one(resume_doc)
    analysis_doc = {
        "resume_id": str(res.inserted_id),
        "user_id": current_user["user_id"],
        "jd_text": jd_text,
        **report,
        "created_at": datetime.utcnow()
    }
    await db["analyses"].insert_one(analysis_doc)
    return {"resume_id": str(res.inserted_id), "report": report}

@router.get("/history")
async def get_history(current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db["analyses"].find({"user_id": current_user["user_id"]}).sort("created_at", -1).limit(20)
    results = []
    async for doc in cursor:
        results.append(str_id(doc))
    return results

@router.get("/analysis/{analysis_id}")
async def get_analysis(analysis_id: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    doc = await db["analyses"].find_one({"_id": ObjectId(analysis_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return str_id(doc)