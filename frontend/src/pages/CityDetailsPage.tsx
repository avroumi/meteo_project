import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import { useFetch } from "../hook/useFetch";
import { useLanguage } from "../hook/useLanguage";

import type {
  City,
  CurrentWeather,
  ForecastResponse,
  Favorite,
} from "../types/api";

import { translations } from "../translations/translations";
import WeatherCondition from "../components/WeatherCondition";

const CityDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const { language } = useLanguage();
  const t = translations[language];

  const explorerName = localStorage.getItem("explorerName");
  const city = location.state?.city as City | undefined;

  const currentWeatherUrl = city
    ? `http://127.0.0.1:8000/api/weather/current?lat=${city.latitude}&lon=${city.longitude}`
    : null;

  const forecastUrl = city
    ? `http://127.0.0.1:8000/api/weather/forecast?lat=${city.latitude}&lon=${city.longitude}`
    : null;

  const favoritesUrl = explorerName
    ? `http://127.0.0.1:8000/api/favorites?explorerName=${encodeURIComponent(
        explorerName,
      )}`
    : null;

  const {
    data: currentWeather,
    loading: currentLoading,
    error: currentError,
  } = useFetch<CurrentWeather>(currentWeatherUrl);

  const {
    data: forecast,
    loading: forecastLoading,
    error: forecastError,
  } = useFetch<ForecastResponse>(forecastUrl);

  const { data: favorites, refetch: refetchFavorites } =
    useFetch<Favorite[]>(favoritesUrl);

  const existingFavorite = favorites?.find(
    (favorite) =>
      favorite.latitude === city?.latitude &&
      favorite.longitude === city?.longitude,
  );

  const handleFavorite = async () => {
    if (!city || !explorerName) return;

    try {
      if (existingFavorite) {
        await axios.delete(
          `http://127.0.0.1:8000/api/favorites/${existingFavorite.id}`,
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/favorites", {
          explorerName,
          cityName: city.name,
          country: city.country,
          latitude: city.latitude,
          longitude: city.longitude,
        });
      }

      await refetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  if (!city) {
    return <p className="empty-message">{t.cityNotFound}</p>;
  }

  if (currentLoading || forecastLoading) {
    return <p className="loading-message">{t.loading}</p>;
  }

  if (currentError || forecastError) {
    return <p className="error-message">{currentError || forecastError}</p>;
  }

  return (
    <section className="city-details">
      <header className="city-details-header">
        <h1>{city.name}</h1>

        <p>
          {city.country}
          {city.admin1 && ` - ${city.admin1}`}
        </p>

        <p>
          {t.latitude}: {city.latitude}
        </p>

        <p>
          {t.longitude}: {city.longitude}
        </p>

        <small>ID: {id}</small>
      </header>

      <section>
        <h2>{t.currentWeather}</h2>

        {currentWeather && (
          <article>
            <WeatherCondition code={currentWeather.weatherCode} />

            <div className="current-weather">
              <div className="weather-stat">
                <p>{t.temperature}</p>
                <strong>{currentWeather.temperature}°C</strong>
              </div>

              <div className="weather-stat">
                <p>{t.feelsLike}</p>
                <strong>{currentWeather.apparentTemperature}°C</strong>
              </div>

              <div className="weather-stat">
                <p>{t.wind}</p>
                <strong>{currentWeather.windSpeed} km/h</strong>
              </div>
            </div>

            <button onClick={handleFavorite}>
              {existingFavorite ? t.deleteFavorite : t.addFavorite}
            </button>
          </article>
        )}
      </section>

      <section>
        <h2>{t.forecast}</h2>

        <div className="forecast-grid">
          {forecast?.days.map((day) => (
            <article className="forecast-card" key={day.date}>
              <h3>{day.date}</h3>

              <WeatherCondition code={day.weatherCode} />

              <p>
                {t.min}: {day.minTemperature}°C
              </p>

              <p>
                {t.max}: {day.maxTemperature}°C
              </p>

              <p>
                {t.precipitation}: {day.precipitation} mm
              </p>

              <p>
                {t.rainProbability}: {day.precipitationProbability}%
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default CityDetailsPage;
