import { useState } from "react";

import { useCitySearch } from "../hook/useCitySearch";
import { useFetch } from "../hook/useFetch";
import { useLanguage } from "../hook/useLanguage";

import CitySelector from "../components/CitySelector";
import WeatherCondition from "../components/WeatherCondition";

import { translations } from "../translations/translations";

import type { City, CompareResponse } from "../types/api";

const Compare = () => {
  const [city1, setCity1] = useState<City | null>(null);
  const [city2, setCity2] = useState<City | null>(null);

  const { language } = useLanguage();
  const t = translations[language];

  const searchCity1 = useCitySearch();
  const searchCity2 = useCitySearch();

  const compareUrl =
    city1 && city2
      ? `http://127.0.0.1:8000/api/weather/compare?city1=${encodeURIComponent(
          city1.name,
        )}&lat1=${city1.latitude}&lon1=${city1.longitude}&city2=${encodeURIComponent(
          city2.name,
        )}&lat2=${city2.latitude}&lon2=${city2.longitude}`
      : null;

  const { data, loading, error } = useFetch<CompareResponse>(compareUrl);

  return (
    <section className="compare-page">
      <h1>{t.compareCities}</h1>

      <div className="compare-selectors">
        <CitySelector
          title={t.firstCity}
          search={searchCity1}
          selectedCity={city1}
          onSelect={setCity1}
        />

        <CitySelector
          title={t.secondCity}
          search={searchCity2}
          selectedCity={city2}
          onSelect={setCity2}
        />
      </div>

      {loading && <p className="loading-message">{t.loadingComparison}</p>}

      {error && <p className="error-message">{error}</p>}

      {data && (
        <div className="compare-results">
          <article>
            <h2>{data.compare1.city}</h2>

            <WeatherCondition code={data.compare1.weather.weatherCode} />

            <p>
              {t.temperature}: {data.compare1.weather.temperature}°C
            </p>

            <p>
              {t.feelsLike}: {data.compare1.weather.apparentTemperature}°C
            </p>

            <p>
              {t.wind}: {data.compare1.weather.windSpeed} km/h
            </p>
          </article>

          <article>
            <h2>{data.compare2.city}</h2>

            <WeatherCondition code={data.compare2.weather.weatherCode} />

            <p>
              {t.temperature}: {data.compare2.weather.temperature}°C
            </p>

            <p>
              {t.feelsLike}: {data.compare2.weather.apparentTemperature}°C
            </p>

            <p>
              {t.wind}: {data.compare2.weather.windSpeed} km/h
            </p>
          </article>
        </div>
      )}
    </section>
  );
};

export default Compare;
