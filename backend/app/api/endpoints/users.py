from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from database import get_db
from app.core import security

from app import schemas

router = APIRouter()

@router.post("/open", response_model=schemas.User)
def create_user_open(
    *,
    db: Session = Depends(get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    
    new_user = models.User(
        email=user_in.email,
        password=security.get_password_hash(user_in.password),
        name=user_in.name,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
