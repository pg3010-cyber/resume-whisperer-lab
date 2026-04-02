from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from datetime import datetime
from database import get_db
from utils.auth import hash_password, verify_password, create_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(data: SignupRequest):
    db = get_db()
    existing = await db["users"].find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "created_at": datetime.utcnow()
    }
    result = await db["users"].insert_one(user)
    token = create_token({"sub": str(result.inserted_id), "email": data.email})
    return {"token": token, "user": {"name": data.name, "email": data.email}}

@router.post("/login")
async def login(data: LoginRequest):
    db = get_db()
    user = await db["users"].find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token({"sub": str(user["_id"]), "email": data.email})
    return {"token": token, "user": {"name": user["name"], "email": data.email}}

@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    return current_user