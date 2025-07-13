# main.py
from fastapi import FastAPI
from routers import auth, trip, recommend, admin, review
from database import Base, engine
from models import user, Trip  # Import all models here
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This must come after all model imports
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(admin.admin_router)
app.include_router(recommend.recommend_router)
app.include_router(trip.trip_router)
app.include_router(review.review_router)