from fastapi import APIRouter, Query
from app.schemas.weather import (
    CurrentWeatherResponse,
    CoordinatesQuery,
    ForecastResponse,
    CompareResponse,
    CompareQuery,
)
from typing import Annotated
from app.services.weather_service import (
    get_current_weather,
    get_forecast,
    compare_cities,
)

router = APIRouter(tags=["Weather"])


@router.get("/api/weather/current", response_model=CurrentWeatherResponse)
async def get_meteo(coordinates: Annotated[CoordinatesQuery, Query()]):
    return await get_current_weather(coordinates.lat, coordinates.lon)


@router.get("/api/weather/forecast", response_model=ForecastResponse)
async def get_meteo(coordinates: Annotated[CoordinatesQuery, Query()]):
    return await get_forecast(coordinates.lat, coordinates.lon)


@router.get("/api/weather/compare", response_model=CompareResponse)
async def compare_weather(compare: Annotated[CompareQuery, Query()]):
    return await compare_cities(
        compare.city1,
        compare.lat1,
        compare.lon1,
        compare.city2,
        compare.lat2,
        compare.lon2,
    )
