from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime
import asyncio
import spacy
from database import get_db
from utils.auth import get_current_user

router = APIRouter(prefix="/jobs", tags=["jobs"])

nlp = spacy.load("en_core_web_sm")

class JDRequest(BaseModel):
    title:       str = "Untitled Job"
    company:     str = ""
    location:    str = ""
    salary:      str = ""
    job_type:    str = "Full-time"
    description: str

def _analyze_jd_sync(user_id, data):
    doc    = nlp(data.description)
    skills = list(set([ent.text for ent in doc.ents if ent.label_ in ("ORG", "PRODUCT", "GPE")]))
    keywords = list(set([
        token.lemma_.lower() for token in doc
        if not token.is_stop and not token.is_punct and token.pos_ in ("NOUN", "PROPN")
    ]))[:20]
    keywords_typed = [{"word": kw, "type": "skill"} for kw in keywords]

    db  = get_db()
    ref = db.collection("jobs").document()
    ref.set({
        "user_id":          user_id,
        "title":            data.title,
        "company":          data.company,
        "location":         data.location,
        "salary":           data.salary,
        "job_type":         data.job_type,
        "description":      data.description,
        "extracted_skills": skills,
        "keywords":         keywords_typed,
        "created_at":       datetime.utcnow().isoformat()
    })
    return ref.id, skills, keywords_typed

def _get_saved_sync(user_id):
    db   = get_db()
    docs = (db.collection("jobs")
              .where("user_id", "==", user_id)
              .order_by("created_at", direction="DESCENDING")
              .get())
    results = []
    for doc in docs:
        d = doc.to_dict()
        d["id"] = doc.id
        results.append(d)
    return results

def _delete_job_sync(job_id, user_id):
    db  = get_db()
    ref = db.collection("jobs").document(job_id)
    doc = ref.get()
    if not doc.exists or doc.to_dict().get("user_id") != user_id:
        raise HTTPException(status_code=404, detail="Job not found")
    ref.delete()

@router.post("/analyze-jd")
async def analyze_jd(data: JDRequest, current_user: dict = Depends(get_current_user)):
    job_id, skills, keywords = await asyncio.to_thread(_analyze_jd_sync, current_user["user_id"], data)
    return {
        "id":               job_id,
        "title":            data.title,
        "company":          data.company,
        "location":         data.location,
        "salary":           data.salary,
        "job_type":         data.job_type,
        "extracted_skills": skills,
        "keywords":         keywords,
    }

@router.get("/saved")
async def get_saved_jobs(current_user: dict = Depends(get_current_user)):
    return await asyncio.to_thread(_get_saved_sync, current_user["user_id"])

@router.delete("/{job_id}")
async def delete_job(job_id: str, current_user: dict = Depends(get_current_user)):
    await asyncio.to_thread(_delete_job_sync, job_id, current_user["user_id"])
    return {"message": "Deleted successfully"}