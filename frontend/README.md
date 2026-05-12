# Frontend — Compliance Platform

Aplicación web construida con **React** y **Vite** que implementa autenticación
mediante los servicios JWT del backend FastAPI.

## Características

- **Página de login** con formulario de usuario y contraseña.
- **Página de bienvenida** protegida: sólo accesible tras iniciar sesión.
- Tokens JWT almacenados en `sessionStorage` (se eliminan al cerrar la pestaña).
- Redirección automática a `/login` si la sesión no está activa.
- Diseño basado en el sistema de diseño definido en `DESIGN.md` (colores, tipografía Inter, glassmorphism).

## Requisitos

- Node.js 18+
- npm 9+
- Backend corriendo en `http://localhost:8000` (ver instrucciones en `README.md` raíz)

## Instalación

```bash
cd frontend
npm install
```

## Desarrollo

1. Iniciar el backend (desde la raíz del proyecto):

   ```bash
   export JWT_SECRET_KEY="$(openssl rand -hex 32)"
   export ADMIN_USERNAME='admin'
   export ADMIN_PASSWORD='admin123'
   cd backend
   poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. Iniciar el frontend (en otra terminal):

   ```bash
   cd frontend
   npm run dev
   ```

3. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## Construcción para producción

```bash
cd frontend
npm run build
```

Los archivos estáticos quedarán en `frontend/dist/`.

## Ejecución con Docker Compose

Desde la raíz del proyecto (incluye backend + frontend en modo preview):

```bash
export JWT_SECRET_KEY="$(openssl rand -hex 32)"
export ADMIN_USERNAME='admin'
export ADMIN_PASSWORD='admin123'
docker compose up --build
```

Servicios disponibles:
- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:5173](http://localhost:5173)

## Uso

| Ruta | Descripción |
|---|---|
| `/login` | Pantalla de inicio de sesión |
| `/welcome` | Pantalla de bienvenida (protegida) |

### Credenciales por defecto

Dependen de las variables de entorno del backend:

| Campo | Valor por defecto |
|---|---|
| Usuario | `admin` |
| Contraseña | `admin123` |

### Flujo de autenticación

1. El usuario ingresa sus credenciales en `/login`.
2. El frontend llama a `POST /token` en el backend.
3. Si las credenciales son válidas, el backend devuelve `access_token` y `refresh_token`.
4. Los tokens se almacenan en `sessionStorage`.
5. El usuario es redirigido a `/welcome`.
6. Al cerrar sesión, los tokens se eliminan y se redirige a `/login`.

## Estructura del proyecto

```
frontend/
├── index.html              # Plantilla HTML (carga fuente Inter)
├── vite.config.js          # Configuración Vite (proxy /token → :8000)
├── package.json
└── src/
    ├── main.jsx            # Punto de entrada React
    ├── App.jsx             # Router y rutas
    ├── index.css           # Variables de diseño globales
    ├── context/
    │   └── AuthContext.jsx # Estado de autenticación (sessionStorage)
    ├── services/
    │   └── auth.js         # Llamadas a la API del backend
    ├── components/
    │   └── ProtectedRoute.jsx  # HOC para rutas protegidas
    └── pages/
        ├── LoginPage.jsx   # Pantalla de inicio de sesión
        └── WelcomePage.jsx # Pantalla de bienvenida
```

## Variables de entorno (frontend)

| Variable | Descripción | Por defecto |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `""` (usa proxy de Vite) |

Para apuntar a un backend en otra URL, crear un archivo `.env.local`:

```bash
VITE_API_URL=http://mi-backend.example.com
```
