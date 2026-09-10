import { useState } from "react";
import axios from "axios";

import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

import type { AtbashResponse } from "../types/api";

const AtbasTool = () => {
  const [text, setText] = useState("");
  const [atbashLanguage, setAtbashLanguage] = useState<"en" | "he">("en");
  const [result, setResult] = useState("");

  const { language } = useLanguage();
  const t = translations[language];

  const handleTransform = async () => {
    if (!text.trim()) return;

    try {
      const response = await axios.post<AtbashResponse>(
        "http://127.0.0.1:8000/api/utils/atbash",
        {
          text,
          language: atbashLanguage,
        },
      );

      setResult(response.data.transformed);
    } catch {
      console.log("Atbash transformation failed");
    }
  };

  return (
    <section className="atbash-tool">
      <h2>{t.atbash}</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.enterText}
      />

      <select
        value={atbashLanguage}
        onChange={(e) => setAtbashLanguage(e.target.value as "en" | "he")}
      >
        <option value="en">{t.english}</option>
        <option value="he">{t.hebrew}</option>
      </select>

      <button onClick={handleTransform}>{t.transform}</button>

      {result && (
        <div className="atbash-result">
          <h3>{t.result}</h3>
          <p>{result}</p>
        </div>
      )}
    </section>
  );
};

export default AtbasTool;
