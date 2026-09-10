import { useCitySearch } from "../hook/useCitySearch";
import { useLanguage } from "../hook/useLanguage";

import { translations } from "../translations/translations";

import type { City } from "../types/api";

interface CitySelectorProps {
  title: string;
  search: ReturnType<typeof useCitySearch>;
  selectedCity: City | null;
  onSelect: (city: City | null) => void;
}

const CitySelector = ({
  title,
  search,
  selectedCity,
  onSelect,
}: CitySelectorProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="city-selector">
      <h2>{title}</h2>

      <input
        value={search.search}
        onChange={(e) => search.setSearch(e.target.value)}
        placeholder={t.searchCity}
      />

      <button onClick={search.handleSearch}>{t.search}</button>

      {search.loading && <p className="loading-message">{t.loading}</p>}

      {search.error && <p className="error-message">{search.error}</p>}

      {selectedCity ? (
        <div className="city-selector-results">
          <h3>{selectedCity.name}</h3>
          <p>{selectedCity.country}</p>

          <button onClick={() => onSelect(null)}>{t.changeCity}</button>
        </div>
      ) : (
        <div className="city-selector-results">
          {search.cities?.map((city) => (
            <button key={city.id} onClick={() => onSelect(city)}>
              {city.name} - {city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySelector;
