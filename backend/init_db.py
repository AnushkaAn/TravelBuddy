# init_db.py
from database import Base, engine, SessionLocal
from models import User  # This imports all models via __init__.py
from passlib.context import CryptContext

# This must come after all model imports
Base.metadata.create_all(bind=engine)
print("✅ Database tables created.")

# --- Create Admin ---
db = SessionLocal()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
admin_email = "admin@travelbuddy.com"

existing_admin = db.query(User).filter(User.email == admin_email).first()

if not existing_admin:
    admin_user = User(
        username="admin",
        email=admin_email,
        hashed_password=pwd_context.hash("admin123"),
        is_admin=True
    )
    db.add(admin_user)
    db.commit()
    print("✅ Admin user created.")
else:
    print("⚠️ Admin already exists.")