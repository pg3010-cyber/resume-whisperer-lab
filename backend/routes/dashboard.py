from fastapi import APIRouter, Depends
from database import get_db
from utils.auth import get_current_user
import asyncio

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

def _get_stats_sync(user_id):
    db = get_db()

    resumes  = db.collection("resumes").where("user_id", "==", user_id).get()
    analyses = db.collection("analyses").where("user_id", "==", user_id).get()
    analyses = list(analyses)

    total_resumes   = len(list(resumes))
    total_analyses  = len(analyses)

    scores = [d.to_dict().get("tfidf_score", 0) for d in analyses]
    avg_score = round((sum(scores) / len(scores)) * 100, 1) if scores else 0

    # Collect all skills across analyses
    from collections import Counter
    all_skills = []
    for d in analyses:
        all_skills.extend(d.to_dict().get("resume_skills", []))
    skill_counts = Counter(all_skills)
    top_skills = [
        {"name": skill, "percentage": min(99, int((count / max(total_analyses, 1)) * 100) + 40)}
        for skill, count in skill_counts.most_common(6)
    ]

    # Recent 4 analyses sorted by created_at
    recent_docs = sorted(analyses, key=lambda d: d.to_dict().get("created_at", ""), reverse=True)[:4]
    recent = []
    for doc in recent_docs:
        d = doc.to_dict()
        recent.append({
            "id":            doc.id,
            "filename":      d.get("filename", ""),
            "overall_score": d.get("overall_score", 0),
            "tfidf_score":   d.get("tfidf_score", 0),
            "analyzed_at":   d.get("created_at", ""),
            "job_title":     d.get("job_title", ""),
            "company":       d.get("company", ""),
        })

    return {
        "total_resumes":   total_resumes,
        "analyzed_today":  0,
        "avg_score":       avg_score,
        "top_skills":      top_skills,
        "recent_analyses": recent,
    }

@router.get("/stats")
async def get_stats(current_user: dict = Depends(get_current_user)):
    return await asyncio.to_thread(_get_stats_sync, current_user["user_id"])