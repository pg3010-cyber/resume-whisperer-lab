from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime
import asyncio
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

def _signup_sync(name, email, password):
    db = get_db()
    # Check if email already exists
    existing = db.collection("users").where("email", "==", email).limit(1).get()
    if list(existing):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_ref = db.collection("users").document()
    user_ref.set({
        "name": name,
        "email": email,
        "password": hash_password(password),
        "created_at": datetime.utcnow().isoformat()
    })
    return user_ref.id

def _login_sync(email, password):
    db = get_db()
    docs = db.collection("users").where("email", "==", email).limit(1).get()
    docs = list(docs)
    if not docs:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    user = docs[0].to_dict()
    user["id"] = docs[0].id
    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user

@router.post("/signup")
async def signup(data: SignupRequest):
    user_id = await asyncio.to_thread(_signup_sync, data.name, data.email, data.password)
    token = create_token({"sub": user_id, "email": data.email})
    return {"token": token, "user": {"id": user_id, "name": data.name, "email": data.email}}

@router.post("/login")
async def login(data: LoginRequest):
    user = await asyncio.to_thread(_login_sync, data.email, data.password)
    token = create_token({"sub": user["id"], "email": data.email})
    return {"token": token, "user": {"id": user["id"], "name": user["name"], "email": data.email}}

@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    return current_user