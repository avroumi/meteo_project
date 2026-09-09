import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB")

client = AsyncMongoClient(MONGODB_URI)

database = client[MONGODB_DB]

favorites_collection = database["favorites"]


async def ping_mongo():
    await client.admin.command("ping")
