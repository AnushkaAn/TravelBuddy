from fastapi import FastAPI
from routers import auth, trip, recommend, admin, review
from database import Base, engine
from models import user, Trip
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ✅ Add your deployed Vercel domain here
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://travel-buddy-mocha.vercel.app",  # ← your actual Vercel deployment URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(admin.admin_router)
app.include_router(recommend.recommend_router)
app.include_router(trip.trip_router)
app.include_router(review.review_router)
