import os
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="JWT FastAPI Demo")

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 3600

VALID_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
VALID_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")


class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


def _create_token(subject: str, expires_seconds: int, token_type: str) -> str:
    now = datetime.now(tz=timezone.utc)
    payload = {
        "sub": subject,
        "type": token_type,
        "iat": now,
        "exp": now + timedelta(seconds=expires_seconds),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@app.post("/token", response_model=TokenResponse)
def create_token(data: LoginRequest) -> TokenResponse:
    if data.username != VALID_USERNAME or data.password != VALID_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return TokenResponse(
        access_token=_create_token(data.username, ACCESS_TOKEN_EXPIRE_SECONDS, "access"),
        refresh_token=_create_token(data.username, REFRESH_TOKEN_EXPIRE_SECONDS, "refresh"),
    )


@app.post("/token/refresh", response_model=TokenResponse)
def refresh_token(data: RefreshRequest) -> TokenResponse:
    try:
        payload = jwt.decode(data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid refresh token") from exc

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    subject = payload.get("sub")
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    return TokenResponse(
        access_token=_create_token(subject, ACCESS_TOKEN_EXPIRE_SECONDS, "access"),
        refresh_token=_create_token(subject, REFRESH_TOKEN_EXPIRE_SECONDS, "refresh"),
    )
