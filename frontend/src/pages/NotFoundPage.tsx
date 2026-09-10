import { useNavigate } from "react-router-dom";

import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section>
      <h1>404</h1>

      <h2>{t.notFoundTitle}</h2>

      <p>{t.notFoundText}</p>

      <button onClick={() => navigate("/app/dashboard")}>
        {t.backDashboard}
      </button>
    </section>
  );
};

export default NotFoundPage;
