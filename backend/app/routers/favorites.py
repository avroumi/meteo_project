from fastapi import APIRouter, HTTPException, Query
from app.schemas.favorites import FavoriteResponse, FavoriteCreate
from app.repo.favorite_repository import (
    create_favorite,
    delete_favorite,
    get_favorites_by_explorer,
)

router = APIRouter(tags=["Favorites"])


@router.post("/api/favorites", response_model=FavoriteResponse)
async def create_favorite_router(favorite: FavoriteCreate):
    return await create_favorite(favorite)


@router.delete("/api/favorites/{favorite_id}")
async def delete_favorite_router(favorite_id: str):
    success = await delete_favorite(favorite_id)
    if not success:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return {"message": "deleted"}


@router.get("/api/favorites", response_model=list[FavoriteResponse])
async def get_favorites_by_explorer_router(
    explorer_name: str = Query(alias="explorerName", min_length=2)
):
    return await get_favorites_by_explorer(explorer_name)
