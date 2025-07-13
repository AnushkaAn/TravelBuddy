from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 👇 Use your own DB URL here (change later to PostgreSQL if needed)
SQLALCHEMY_DATABASE_URL = "sqlite:///./travelbuddy.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ✅ THIS FUNCTION was missing — add it
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
