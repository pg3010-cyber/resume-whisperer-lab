from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URI

client: AsyncIOMotorClient = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["resume_whisperer"]
    print("✅ Connected to MongoDB")

async def close_db():
    global client
    if client:
        client.close()
        print("🔴 MongoDB connection closed")

def get_db():
    return db