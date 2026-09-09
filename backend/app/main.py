from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .exceptions.external_service import ExternalServiceError

from .routers.health import router as router_health
from .routers.cities import router as router_cities
from .routers.weather import router as router_weather
from .routers.favorites import router as router_favorites
from .routers.utils import router as router_utils


from .middleware.request_logger import middleware_info

from app.database.mongo import ping_mongo

app = FastAPI()


@app.exception_handler(ExternalServiceError)
async def external_service_error_handler(request: Request, exc: ExternalServiceError):
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content={"detail": str(exc)}
    )


app.middleware("http")(middleware_info)

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await ping_mongo()
    print("MongoDB connected")


app.include_router(router_health)
app.include_router(router_cities)
app.include_router(router_weather)
app.include_router(router_favorites)
app.include_router(router_utils)
