from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from database import get_db
from utils.auth import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/jobs", tags=["jobs"])

def str_id(doc):
    doc["_id"] = str(doc["_id"])
    return doc

class JDRequest(BaseModel):
    jd_text: str
    title: str = "Untitled Job"

@router.post("/analyze-jd")
async def analyze_jd(data: JDRequest, current_user: dict = Depends(get_current_user)):
    import spacy
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(data.jd_text)
    skills = list(set([ent.text for ent in doc.ents if ent.label_ in ("ORG", "PRODUCT", "GPE")]))
    keywords = list(set([token.lemma_.lower() for token in doc
                         if not token.is_stop and not token.is_punct and token.pos_ in ("NOUN", "PROPN")]))[:20]
    db = get_db()
    job_doc = {
        "user_id": current_user["user_id"],
        "title": data.title,
        "jd_text": data.jd_text,
        "extracted_skills": skills,
        "keywords": keywords,
        "created_at": datetime.utcnow()
    }
    res = await db["jobs"].insert_one(job_doc)
    return {"job_id": str(res.inserted_id), "extracted_skills": skills, "keywords": keywords}

@router.get("/saved")
async def get_saved_jobs(current_user: dict = Depends(get_current_user)):
    db = get_db()
    cursor = db["jobs"].find({"user_id": current_user["user_id"]}).sort("created_at", -1)
    results = []
    async for doc in cursor:
        results.append(str_id(doc))
    return results

@router.delete("/{job_id}")
async def delete_job(job_id: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    result = await db["jobs"].delete_one({"_id": ObjectId(job_id), "user_id": current_user["user_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Deleted successfully"}