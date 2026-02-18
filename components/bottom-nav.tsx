"use client"

import { Home, Wheat, Tractor, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

const navItems = [
  { id: "home" as const, icon: Home, label: "Home", labelHi: "होम", labelTe: "హోమ్" },
  { id: "claim" as const, icon: Wheat, label: "Claim", labelHi: "दावा", labelTe: "క్లెయిమ్" },
  { id: "equipment" as const, icon: Tractor, label: "Equipment", labelHi: "उपकरण", labelTe: "పరికరాలు" },
  { id: "dashboard" as const, icon: BarChart3, label: "Dashboard", labelHi: "डैशबोर्ड", labelTe: "డ్యాష్‌బోర్డ్" },
  { id: "profile" as const, icon: User, label: "Profile", labelHi: "प्रोफ़ाइल", labelTe: "ప్రొఫైల్" },
]

export type TabId = (typeof navItems)[number]["id"]

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useLanguage()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-border bg-card"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex w-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={cn("size-5", isActive && "stroke-[2.5]")} />
              <span className={cn("font-medium", isActive && "font-bold")}>
                {t(item.label, item.labelHi, item.labelTe)}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
