from app.schemas.atbash import AtbashRequest, AtbashResponse
from app.services.atbash_service import transform_atbash

from fastapi import APIRouter

router = APIRouter(tags=["Utils"])


@router.post("/api/utils/atbash", response_model=AtbashResponse)
def atbash_transform_router(request: AtbashRequest):
    return transform_atbash(request.text, request.language)
