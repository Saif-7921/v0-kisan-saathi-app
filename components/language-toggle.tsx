"use client"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const langs = [
  { code: "en" as const, label: "EN" },
  { code: "hi" as const, label: "हिंदी" },
  { code: "te" as const, label: "తెలుగు" },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            language === l.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-card"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
