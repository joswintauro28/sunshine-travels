from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
import models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/login/access-token")

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> models.User:
    # In our simplified auth, the token is the user's email
    user = db.query(models.User).filter(models.User.email == token).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user
