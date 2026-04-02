from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import FRONTEND_URL
from database import connect_db, close_db
from routes.auth      import router as auth_router
from routes.resume    import router as resume_router
from routes.jobs      import router as jobs_router
from routes.dashboard import router as dashboard_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title="Resume Whisperer API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:8080",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(jobs_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {"message": "Resume Whisperer NLP API is running"}
