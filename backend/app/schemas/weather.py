from .base import ClimaBaseModel
from pydantic import Field


class CurrentWeatherResponse(ClimaBaseModel):
    temperature: float
    apparent_temperature: float
    weather_code: int
    wind_speed: float


class CoordinatesQuery(ClimaBaseModel):
    lat: float = Field(ge=-90, le=90)
    lon: float = Field(ge=-180, le=180)


class ForecastDay(ClimaBaseModel):
    date: str
    weather_code: int
    min_temperature: float
    max_temperature: float
    precipitation: float
    precipitation_probability: int


class ForecastResponse(ClimaBaseModel):
    days: list[ForecastDay]


class CompareQuery(ClimaBaseModel):
    city1: str
    lat1: float = Field(ge=-90, le=90)
    lon1: float = Field(ge=-180, le=180)
    city2: str
    lat2: float = Field(ge=-90, le=90)
    lon2: float = Field(ge=-180, le=180)


class CompareCity(ClimaBaseModel):
    city: str
    weather: CurrentWeatherResponse


class CompareResponse(ClimaBaseModel):
    compare1: CompareCity
    compare2: CompareCity
