import { useEffect, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

const WelcomePage = () => {
  const [explorerName, setExplorerName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleEnter = () => {
    if (explorerName.trim().length >= 2) {
      localStorage.setItem("explorerName", explorerName.trim());
      navigate("/app/dashboard");
    }
  };

  const savedExplorerName = localStorage.getItem("explorerName");

  if (savedExplorerName) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>{t.welcomeTitle}</h1>

        <p>{t.welcomeText}</p>

        <input
          type="text"
          ref={inputRef}
          value={explorerName}
          onChange={(e) => setExplorerName(e.target.value)}
          placeholder={t.explorerPlaceholder}
        />

        <button onClick={handleEnter}>{t.startExploring}</button>
      </div>
    </div>
  );
};

export default WelcomePage;
