# JWT FastAPI Demo

Este proyecto contiene una aplicación **FastAPI** dentro de la carpeta `/backend` que implementa autenticación con JWT.

## Requisitos

- Python 3.12+
- [Poetry](https://python-poetry.org/)
- Docker y Docker Compose (opcional)

## Estructura

- `backend/main.py`: API con endpoints JWT
- `backend/pyproject.toml`: dependencias con Poetry
- `backend/Dockerfile`: imagen de la API
- `docker-compose.yml`: despliegue local con Docker

## Endpoints

### 1) Obtener token

**POST** `/token`

Body JSON:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "expires_in": 300
}
```

> El `access_token` expira en **300 segundos**.

### 2) Refrescar token

**POST** `/token/refresh`

Body JSON:

```json
{
  "refresh_token": "..."
}
```

Devuelve un nuevo `access_token` (300s) y un nuevo `refresh_token`.

## Ejecución con Poetry

```bash
cd backend
poetry install
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Swagger UI: http://localhost:8000/docs

## Ejecución con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Servicio disponible en: http://localhost:8000
