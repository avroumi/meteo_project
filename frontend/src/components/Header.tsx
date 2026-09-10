import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

import logo from "../assets/climaboard-logo.png";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const explorerName = localStorage.getItem("explorerName");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("explorerName");
    navigate("/");
  };

  return (
    <header className="header">
      <img src={logo} alt="ClimaBoard logo" />

      <nav>
        <Link to="/app/dashboard">{t.dashboard}</Link>
        <Link to="/app/search">{t.search}</Link>
        <Link to="/app/favorites">{t.favorites}</Link>
        <Link to="/app/compare">{t.compare}</Link>
      </nav>

      <p>
        {t.welcomeBack} {explorerName}
      </p>

      <button onClick={logout}>{t.logout}</button>

      <button onClick={toggleLanguage}>
        {language === "en" ? "HE" : "EN"}
      </button>
    </header>
  );
};

export default Header;
