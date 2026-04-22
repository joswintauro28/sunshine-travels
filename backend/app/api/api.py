from fastapi import APIRouter, Depends
from app.api.endpoints import auth, users
from sqlalchemy.orm import Session
from database import get_db
import models
from app import schemas

from app.api import deps

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])

@api_router.get("/test-token", response_model=schemas.User)
def test_token(current_user: models.User = Depends(deps.get_current_user)):
    """
    Test access token
    """
    return schemas.User(
        email=current_user.email,
        full_name=current_user.name,
        id=current_user.id,
        is_superuser=False # Default to false for now, unless we check role
    )
