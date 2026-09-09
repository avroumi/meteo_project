from .base import ClimaBaseModel
from pydantic import Field


class FavoriteCreate(ClimaBaseModel):
    explorer_name: str = Field(min_length=2)
    city_name: str
    country: str
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)


class FavoriteResponse(ClimaBaseModel):
    id: str
    explorer_name: str = Field(min_length=2)
    city_name: str
    country: str
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
