from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class TripCreate(BaseModel):
    source: str
    destination: str
    date: str  # You can keep from_date and to_date too if you're using both
    budget: float

class TripQuery(BaseModel):
    source: str
    destination: str
    date: str
    budget: float

class TripResponse(BaseModel):
    flights: list
    hotels: list
    buses: Optional[list] = []
    cafes_nearby: List[str]
    places_to_visit: List[str]
    estimated_total: float
    is_within_budget: bool
