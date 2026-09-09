from app.database.mongo import favorites_collection
from app.schemas.favorites import FavoriteCreate, FavoriteResponse
from bson import ObjectId


async def create_favorite(favorite: FavoriteCreate) -> FavoriteResponse:
    document = favorite.model_dump()
    result = await favorites_collection.insert_one(document)
    inserted_id = result.inserted_id
    return {**document, "id": str(inserted_id)}


async def get_favorites_by_explorer(explorer_name: str):
    cursor = favorites_collection.find({"explorer_name": explorer_name})
    documents = await cursor.to_list(length=None)

    clean_result = []
    for doc in documents:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        clean_result.append(doc)

    return clean_result


async def delete_favorite(favorite_id: str):
    if not ObjectId.is_valid(favorite_id):
        return False

    result = await favorites_collection.delete_one({"_id": ObjectId(favorite_id)})
    return result.deleted_count > 0
