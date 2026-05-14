"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Language } from "./translations";

type T = (typeof translations)[Language];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("sofia-lang") as Language | null;
    if (stored && (stored === "en" || stored === "es")) {
      setLangState(stored);
    }
  }, []);

  function setLang(l: Language) {
    setLangState(l);
    localStorage.setItem("sofia-lang", l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as T }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
