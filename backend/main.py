import os
import secrets
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="JWT FastAPI Demo")

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY must be set")
if len(SECRET_KEY) < 32:
    raise RuntimeError("JWT_SECRET_KEY must be at least 32 characters long")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 3600

VALID_USERNAME = os.getenv("ADMIN_USERNAME")
VALID_PASSWORD = os.getenv("ADMIN_PASSWORD")
if not VALID_USERNAME or not VALID_PASSWORD:
    raise RuntimeError("ADMIN_USERNAME and ADMIN_PASSWORD must be set")


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
    username_ok = secrets.compare_digest(data.username, VALID_USERNAME)
    password_ok = secrets.compare_digest(data.password, VALID_PASSWORD)
    if not username_ok or not password_ok:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return TokenResponse(
        access_token=_create_token(data.username, ACCESS_TOKEN_EXPIRE_SECONDS, "access"),
        refresh_token=_create_token(data.username, REFRESH_TOKEN_EXPIRE_SECONDS, "refresh"),
    )


@app.post("/token/refresh", response_model=TokenResponse)
def refresh_token(data: RefreshRequest) -> TokenResponse:
    try:
        payload = jwt.decode(data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError as exc:
        raise HTTPException(status_code=401, detail="Refresh token expired") from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=401, detail="Invalid refresh token") from exc

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    subject = payload.get("sub")
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    if not secrets.compare_digest(subject, VALID_USERNAME):
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    return TokenResponse(
        access_token=_create_token(subject, ACCESS_TOKEN_EXPIRE_SECONDS, "access"),
        refresh_token=_create_token(subject, REFRESH_TOKEN_EXPIRE_SECONDS, "refresh"),
    )
