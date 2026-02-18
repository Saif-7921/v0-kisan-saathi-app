"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "hi" | "te"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, hi?: string, te?: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (en) => en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (en: string, hi?: string, te?: string) => {
    if (language === "hi" && hi) return hi
    if (language === "te" && te) return te
    return en
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
