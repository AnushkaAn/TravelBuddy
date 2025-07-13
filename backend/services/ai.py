# services/ai.py
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
def analyze_budget(budget: int, estimated_total: float) -> bool:
    return estimated_total <= budget

def recommend_places_from_history(trip_history: list[str]) -> str:
    prompt = f"""
    I am a travel recommendation assistant. Based on the user's past trips:
    {', '.join(trip_history)}
    
    Suggest 3 new unique destinations with a short reason why.
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
