from httpx import AsyncClient, TimeoutException, HTTPStatusError, RequestError

from app.exceptions.external_service import ExternalServiceError
from asyncio import gather

URL = "https://api.open-meteo.com/v1/forecast"


async def get_current_weather(lat: float, lon: float):
    try:
        async with AsyncClient() as client:
            response = await client.get(
                URL,
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "current": (
                        "temperature_2m,"
                        "apparent_temperature,"
                        "weather_code,"
                        "wind_speed_10m"
                    ),
                },
            )

            response.raise_for_status()

    except TimeoutException as exc:
        raise ExternalServiceError("Weather service timeout") from exc

    except HTTPStatusError as exc:
        raise ExternalServiceError("Weather service returned an error") from exc

    except RequestError as exc:
        raise ExternalServiceError("Weather service is unavailable") from exc

    data = response.json()
    current = data.get("current")

    return {
        "temperature": current["temperature_2m"],
        "apparent_temperature": current["apparent_temperature"],
        "weather_code": current["weather_code"],
        "wind_speed": current["wind_speed_10m"],
    }


async def get_forecast(lat, lon):
    try:
        async with AsyncClient() as client:
            response = await client.get(
                URL,
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "daily": (
                        "weather_code,"
                        "temperature_2m_max,"
                        "temperature_2m_min,"
                        "precipitation_sum,"
                        "precipitation_probability_max"
                    ),
                    "forecast_days": 7,
                    "timezone": "auto",
                },
            )

            response.raise_for_status()

    except TimeoutException as exc:
        raise ExternalServiceError("Weather service timeout") from exc

    except HTTPStatusError as exc:
        raise ExternalServiceError("Weather service returned an error") from exc

    except RequestError as exc:
        raise ExternalServiceError("Weather service is unavailable") from exc

    data = response.json()
    daily = data.get("daily")
    days = []

    for i in range(len(daily["time"])):
        day = {
            "date": daily["time"][i],
            "weather_code": daily["weather_code"][i],
            "min_temperature": daily["temperature_2m_min"][i],
            "max_temperature": daily["temperature_2m_max"][i],
            "precipitation": daily["precipitation_sum"][i],
            "precipitation_probability": daily["precipitation_probability_max"][i],
        }

        days.append(day)

    return {"days": days}


async def compare_cities(city1, lat1, lon1, city2, lat2, lon2):

    result1, result2 = await gather(
        get_current_weather(lat1, lon1), (get_current_weather(lat2, lon2))
    )

    final_result = {
        "compare1": {"city": city1, "weather": result1},
        "compare2": {"city": city2, "weather": result2},
    }
    return final_result
