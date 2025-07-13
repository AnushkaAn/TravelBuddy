# ✅ [services/amadeus.py] - with dummy hotel/cafe/places added and AI budget logic kept
import requests
import os
from dotenv import load_dotenv
from services.ai import analyze_budget  # Make sure this exists

load_dotenv()

AMADEUS_CLIENT_ID = os.getenv("AMADEUS_CLIENT_ID")
AMADEUS_CLIENT_SECRET = os.getenv("AMADEUS_CLIENT_SECRET")

def get_amadeus_token():
    url = "https://test.api.amadeus.com/v1/security/oauth2/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": AMADEUS_CLIENT_ID,
        "client_secret": AMADEUS_CLIENT_SECRET
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    try:
        response = requests.post(url, data=payload, headers=headers, timeout=10)
        response.raise_for_status()
        print("🔐 Token fetched successfully.")
        return response.json()["access_token"]
    except requests.exceptions.RequestException as e:
        print("❌ Failed to get Amadeus token:", e)
        return None

def get_flight_offers(origin: str, destination: str, date: str):
    token = get_amadeus_token()
    if not token:
        return {"data": []}  # Fallback to prevent crash

    url = f"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={origin}&destinationLocationCode={destination}&departureDate={date}&adults=1"
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        print("🛫 Flights fetched.")
        return response.json()
    except requests.exceptions.RequestException as e:
        print("❌ Failed to get flights:", e)
        return {"data": []}

def get_hotel_offers(city_code: str, check_in: str, check_out: str):
    return [
        {
            "name": "The Taj Mahal Palace",
            "price_per_night": 120,
            "rating": 4.7,
            "image": "/images/hotel1.jpg"
        },
        {
            "name": "Trident Hotel",
            "price_per_night": 90,
            "rating": 4.3,
            "image": "/images/hotel2.jpg"
        }
    ]

def get_bus_options(source: str, destination: str, date: str):
     return [
        {
            "operator": "RedBus",
            "departure_time": "08:00 AM",
            "arrival_time": "02:00 PM",
            "price": 15,
            "image": "/images/bus1.jpg"
        },
        {
            "operator": "ZingBus",
            "departure_time": "05:00 PM",
            "arrival_time": "10:00 PM",
            "price": 12,
            "image": "/images/bus2.jpg"
        }
    ]

def get_cafes_nearby(destination: str):
    return [
        {
            "name": "Starbucks Gateway",
            "rating": 4.5,
            "image": "/images/cafe1.jpg"
        },
        {
            "name": "Leopold Cafe",
            "rating": 4.2,
            "image": "/images/cafe2.jpg"
        }
    ]

def get_places_to_visit(destination: str):
    return [
        {
            "name": "Gateway of India",
            "description": "Historic monument overlooking the Arabian Sea.",
            "image": "/images/place1.jpg"
        },
        {
            "name": "Marine Drive",
            "description": "Scenic coastal road known as the Queen's Necklace.",
            "image": "/images/place2.jpg"
        }
    ]
