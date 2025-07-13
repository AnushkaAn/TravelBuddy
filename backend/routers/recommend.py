import cohere
from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from routers.auth import get_current_user
from database import get_db
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

co = cohere.Client(os.getenv("COHERE_API_KEY"))

recommend_router = APIRouter(prefix="/recommend", tags=["AI Recommender"])

class RecommendRequest(BaseModel):
    prompt: str  # 🆕 Custom prompt input

@recommend_router.post("/")
def get_recommendations(
    req: RecommendRequest,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        response = co.generate(
            model='command',
            prompt=req.prompt,
            max_tokens=300,
            temperature=0.8,
        )
        return {"itinerary": response.generations[0].text.strip()}
    except Exception as e:
        print("\U0001F525 Cohere API error:", e)
        raise HTTPException(status_code=500, detail="Recommendation generation failed")