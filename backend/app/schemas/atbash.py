from app.schemas.base import ClimaBaseModel
from typing import Literal
from pydantic import Field


class AtbashRequest(ClimaBaseModel):
    text: str = Field(min_length=1, max_length=500)
    language: Literal["he", "en"]


class AtbashResponse(ClimaBaseModel):
    original: str
    transformed: str
