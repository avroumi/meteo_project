import { Link } from "react-router-dom";

import { useFetch } from "../hook/useFetch";
import { useLanguage } from "../hook/useLanguage";

import WeatherCondition from "../components/WeatherCondition";
import AtbasTool from "../components/AtbasTool";

import { translations } from "../translations/translations";

import type { Favorite, CurrentWeather } from "../types/api";

const DashboardPage = () => {
  const explorerName = localStorage.getItem("explorerName");

  const { language } = useLanguage();
  const t = translations[language];

  const favoriteUrl = explorerName
    ? `http://127.0.0.1:8000/api/favorites?explorerName=${encodeURIComponent(
        explorerName,
      )}`
    : null;

  const weatherUrl =
    "http://127.0.0.1:8000/api/weather/current?lat=31.7683&lon=35.2137";

  const { data: favorites, loading, error } = useFetch<Favorite[]>(favoriteUrl);

  const {
    data: weather,
    loading: weatherLoading,
    error: weatherError,
  } = useFetch<CurrentWeather>(weatherUrl);

  return (
    <section className="dashboard">
      <div className="dashboard-hero">
        <h1>
          {t.hello} {explorerName}
        </h1>

        <p>{t.yourDashboard}</p>
      </div>

      {loading && <p className="loading-message">{t.loading}</p>}

      {error && <p className="error-message">{error}</p>}

      <p>
        {t.favorites}: {favorites?.length ?? 0}
      </p>

      <div className="dashboard-links">
        <Link to="/app/search">{t.searchCity}</Link>

        <Link to="/app/compare">{t.compareCities}</Link>

        <Link to="/app/favorites">{t.favorites}</Link>
      </div>

      <h2>{t.jerusalemWeather}</h2>

      {weatherLoading && <p className="loading-message">{t.loading}</p>}

      {weatherError && <p className="error-message">{weatherError}</p>}

      {weather && (
        <article>
          <WeatherCondition code={weather.weatherCode} />

          <p>
            {t.temperature}: {weather.temperature}°C
          </p>

          <p>
            {t.feelsLike}: {weather.apparentTemperature}°C
          </p>

          <p>
            {t.wind}: {weather.windSpeed} km/h
          </p>
        </article>
      )}

      <h2>{t.recentFavorites}</h2>

      <div className="favorites-grid">
        {favorites?.slice(0, 3).map((favorite) => (
          <article className="favorite-card" key={favorite.id}>
            <h3>{favorite.cityName}</h3>
            <p>{favorite.country}</p>
          </article>
        ))}
      </div>

      <AtbasTool />
    </section>
  );
};

export default DashboardPage;
