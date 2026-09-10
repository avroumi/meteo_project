import { useNavigate } from "react-router-dom";

import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

import type { City } from "../types/api";

interface CityProps {
  city: City;
}

const CardCity = ({ city }: CityProps) => {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <article
      className="city-card"
      onClick={() =>
        navigate(`/app/city/${city.id}`, {
          state: { city },
        })
      }
    >
      <h3>{city.name}</h3>

      <p>
        {t.country}: {city.country}
      </p>

      <p>
        {t.countryCode}: {city.countryCode}
      </p>

      {city.admin1 && (
        <p>
          {t.region}: {city.admin1}
        </p>
      )}

      <p>
        {t.latitude}: {city.latitude}
      </p>

      <p>
        {t.longitude}: {city.longitude}
      </p>

      <p>
        {t.timezone}: {city.timezone}
      </p>
    </article>
  );
};

export default CardCity;
