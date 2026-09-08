from .base import ClimaBaseModel

class CitySearchResult(CLimaBaseModel):
    id: int
    name: str
    country: str
    country_code: str 
    admin1: str | None = None
    latitude: float
    longitude: float
    timezone: str