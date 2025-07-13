from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session
# models/user.py
from sqlalchemy.orm import relationship
from schemas.trip import TripQuery
from services.amadeus import (
    get_flight_offers,
    get_hotel_offers,
    get_bus_options,
    get_cafes_nearby,
    get_places_to_visit,
)
from services.ai import analyze_budget
from models.user import Trip
from models.review import Review
from routers.auth import get_current_user
from database import get_db

trip_router = APIRouter(prefix="/trip", tags=["Trip Planner"])

@trip_router.post("/search")
def search_trip(
    query: TripQuery = Body(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    flights = get_flight_offers(query.source, query.destination, query.date)
    hotels = get_hotel_offers(query.destination, query.date, query.date)
    buses = get_bus_options(query.source, query.destination, query.date)
    cafes_nearby = get_cafes_nearby(query.destination)
    places_to_visit = get_places_to_visit(query.destination)

    flight_price = float(flights["data"][0]["price"]["grandTotal"]) if flights["data"] else 0
    hotel_price = hotels[0]["price_per_night"] if hotels else 0
    bus_price = buses[0]["price"] if buses else 0

    estimated_total = flight_price + hotel_price + bus_price
    is_within_budget = analyze_budget(query.budget, estimated_total)

    new_trip = Trip(
        user_id=current_user.id,
        source=query.source,
        destination=query.destination,
        date=query.date,
        budget=query.budget,
        total=estimated_total
    )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)

    return {
        "flights": flights,
        "hotels": hotels,
        "buses": buses,
        "cafes_nearby": cafes_nearby,
        "places_to_visit": places_to_visit,
        "budget_breakdown": {
            "flight_price": flight_price,
            "hotel_price": hotel_price,
            "bus_price": bus_price,
            "total_estimate": estimated_total,
            "is_within_budget": is_within_budget
        }
    }

@trip_router.get("/my-trips")
def get_my_trips(db: Session = Depends(get_db), user=Depends(get_current_user)):
    trips = db.query(Trip).filter(Trip.user_id == user.id).all()
    return trips

# ✅ Add a review to a trip
@trip_router.post("/review/{trip_id}")
def add_review(
    trip_id: int,
    review: dict = Body(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found or not yours")

    new_review = Review(
        trip_id=trip_id,
        user_id=user.id,
        rating=review.get("rating"),
        comment=review.get("comment")
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return {"message": "Review added", "review": {
        "rating": new_review.rating,
        "comment": new_review.comment
    }}

# ✅ Get all reviews for a trip
@trip_router.get("/reviews/{trip_id}")
def get_reviews_for_trip(trip_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.trip_id == trip_id).all()
    return reviews


@trip_router.post("/add")
def add_trip(
    trip: TripQuery = Body(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_trip = Trip(
        source=trip.source,
        destination=trip.destination,
        date=trip.date,
        budget=trip.budget,
        total=0,
        user_id=user.id
    )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip


