import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="footer">
      <p>ClimaBoard</p>

      <p>
        {t.weatherDataBy}{" "}
        <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
          Open-Meteo
        </a>
      </p>
    </footer>
  );
};

export default Footer;
