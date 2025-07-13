from pydantic import BaseModel


class ReviewCreate(BaseModel):
    rating: int
    content: str  # Renamed from 'comment' to match your database field


class ReviewResponse(BaseModel):
    id: int
    trip_id: int
    user_id: int
    rating: int
    content: str  # Renamed from 'comment'

    class Config:
        from_attributes = True  # Replaces 'orm_mode = True' in Pydantic V2
