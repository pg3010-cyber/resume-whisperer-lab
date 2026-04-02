from fastapi import APIRouter, Depends
from database import get_db
from utils.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
async def get_stats(current_user: dict = Depends(get_current_user)):
    db = get_db()
    user_id = current_user["user_id"]
    total_resumes = await db["resumes"].count_documents({"user_id": user_id})
    total_analyses = await db["analyses"].count_documents({"user_id": user_id})
    analyses = db["analyses"].find({"user_id": user_id})
    scores = []
    async for doc in analyses:
        if "tfidf_score" in doc:
            scores.append(doc["tfidf_score"])
    avg_score = round((sum(scores) / len(scores)) * 100, 1) if scores else 0
    return {
        "total_resumes": total_resumes,
        "total_analyses": total_analyses,
        "avg_match_score": avg_score,
    }