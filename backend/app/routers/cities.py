from fastapi import APIRouter,Query
from app.schemas.city import CitySearchResult
from app.services.geocoding_service import search_cities 

router = APIRouter(tags=["Cities"])

@router.get("/api/cities/search", response_model=list[CitySearchResult])
async def search_city_by_query(query: str = Query(min_length=3, max_length=80)):
    return await search_cities(query)

