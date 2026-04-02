import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:8080")
JWT_SECRET = os.getenv("JWT_SECRET", "mysecretkey123")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "1440"))