import { createContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "he";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const savedLanguage = localStorage.getItem("language") as Language | null;
  const [language, setLanguage] = useState<Language>(savedLanguage ?? "en");

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "en" ? "he" : "en";

      localStorage.setItem("language", newLanguage);

      return newLanguage;
    });
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
