from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User, Trip
from routers.auth import get_current_user

admin_router = APIRouter(prefix="/admin", tags=["Admin"])

def require_admin(user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user

@admin_router.get("/users")
def get_all_users(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    return db.query(User).all()

@admin_router.get("/trips")
def get_all_trips(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    return db.query(Trip).all()
