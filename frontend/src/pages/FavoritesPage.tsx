import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useFetch } from "../hook/useFetch";
import { useLanguage } from "../hook/useLanguage";

import { translations } from "../translations/translations";

import type { Favorite } from "../types/api";

const FavoritesPage = () => {
  const explorerName = localStorage.getItem("explorerName");
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language];

  const url = explorerName
    ? `http://127.0.0.1:8000/api/favorites?explorerName=${encodeURIComponent(
        explorerName,
      )}`
    : null;

  const { data, loading, error, refetch } = useFetch<Favorite[]>(url);

  const handleDelete = async (favoriteId: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/favorites/${favoriteId}`);

      await refetch();
    } catch {
      console.log("Delete failed");
    }
  };

  const handleViewMore = (favorite: Favorite) => {
    navigate(`/app/city/${favorite.id}`, {
      state: {
        city: {
          id: favorite.id,
          name: favorite.cityName,
          country: favorite.country,
          latitude: favorite.latitude,
          longitude: favorite.longitude,
        },
      },
    });
  };

  return (
    <section>
      <h1>{t.favorites}</h1>

      {loading && <p className="loading-message">{t.loading}</p>}

      {error && <p className="error-message">{error}</p>}

      {data && data.length === 0 && (
        <p className="empty-message">{t.noFavorites}</p>
      )}

      <div className="favorites-grid">
        {data?.map((favorite) => (
          <article className="favorite-card" key={favorite.id}>
            <div>
              <h3>{favorite.cityName}</h3>

              <p>
                {t.country}: {favorite.country}
              </p>

              <p>
                {t.latitude}: {favorite.latitude}
              </p>

              <p>
                {t.longitude}: {favorite.longitude}
              </p>
            </div>

            <button onClick={() => handleViewMore(favorite)}>
              {t.viewMore}
            </button>

            <button onClick={() => handleDelete(favorite.id)}>
              {t.delete}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FavoritesPage;
