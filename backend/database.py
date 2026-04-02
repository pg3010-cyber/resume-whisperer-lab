import firebase_admin
from firebase_admin import credentials, firestore
from config import FIREBASE_CREDENTIALS

db = None

def connect_db():
    global db
    if not firebase_admin._apps:
        cred = credentials.Certificate(FIREBASE_CREDENTIALS)
        firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("✅ Connected to Firebase Firestore")

def get_db():
    return db