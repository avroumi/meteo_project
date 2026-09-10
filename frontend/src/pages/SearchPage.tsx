import { useState } from "react";

import { useFetch } from "../hook/useFetch";
import { useLanguage } from "../hook/useLanguage";

import type { City } from "../types/api";

import CardCity from "../components/CardCity";
import { translations } from "../translations/translations";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const { language } = useLanguage();
  const t = translations[language];

  const url =
    query.length >= 3
      ? `http://127.0.0.1:8000/api/cities/search?query=${encodeURIComponent(
          query,
        )}`
      : null;

  const { data, loading, error } = useFetch<City[]>(url);

  const handleSearch = () => {
    if (search.trim().length >= 3) {
      setQuery(search.trim());
    }
  };

  return (
    <section className="search-page">
      <h1>{t.searchCity}</h1>

      <div className="search-controls">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.searchCity}
        />

        <button onClick={handleSearch}>{t.search}</button>
      </div>

      {loading && <p className="loading-message">{t.loading}</p>}

      {error && <p className="error-message">{error}</p>}

      {data && data.length === 0 && (
        <p className="empty-message">{t.cityNotFound}</p>
      )}

      <div className="search-results">
        {data?.map((city) => (
          <CardCity city={city} key={city.id} />
        ))}
      </div>
    </section>
  );
};

export default SearchPage;
