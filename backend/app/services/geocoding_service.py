from httpx import AsyncClient, TimeoutException, HTTPStatusError, RequestError
from app.exceptions.external_service import ExternalServiceError

URL = "https://geocoding-api.open-meteo.com/v1/search"


async def search_cities(query: str):
    try:
        async with AsyncClient() as client:
            response = await client.get(
                URL, params={"name": query, "count": 10, "language": "en"}
            )

        response.raise_for_status()
    except TimeoutException as exc:
        raise ExternalServiceError("Weather service timeout") from exc

    except HTTPStatusError as exc:
        raise ExternalServiceError("Weather service returned an error") from exc

    except RequestError as exc:
        raise ExternalServiceError("Weather service is unavailable") from exc

    data = response.json()
    results = data.get("results", [])

    clean_cities = []

    for city in results:
        clean = {
            "id": city["id"],
            "name": city["name"],
            "country": city["country"],
            "country_code": city["country_code"],
            "admin1": city.get("admin1"),
            "latitude": city["latitude"],
            "longitude": city["longitude"],
            "timezone": city["timezone"],
        }

        clean_cities.append(clean)

    return clean_cities
