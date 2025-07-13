from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.review import Review
from schemas.review import ReviewCreate
from routers.auth import get_current_user
from database import get_db

review_router = APIRouter(prefix="/trip", tags=["Reviews"])

@review_router.post("/review/{trip_id}")
def submit_review(
    trip_id: int,
    review: ReviewCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_review = Review(
        content=review.content,
        rating=review.rating,
        trip_id=trip_id,
        user_id=user.id
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return {"msg": "Review submitted", "review_id": new_review.id}
