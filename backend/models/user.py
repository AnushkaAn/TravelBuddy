# models/user.py
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)

    trips = relationship("Trip", back_populates="user")
    reviews = relationship("Review", back_populates="user", cascade="all, delete")

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String)
    destination = Column(String)
    date = Column(String)
    budget = Column(Integer)
    total = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="trips")
    reviews = relationship("Review", back_populates="trip", cascade="all, delete")