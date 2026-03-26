"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Menu, X, Bell } from "lucide-react"
import { LanguageProvider } from "@/lib/language-context"
import { ToastProvider } from "@/lib/toast-context"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { OfflineBanner } from "@/components/offline-banner"
import { HomeDashboard } from "@/components/home-dashboard"
import { CropLossClaim } from "@/components/crop-loss-claim"
import { EquipmentMarketplace } from "@/components/equipment-marketplace"
import { ClaimsDashboard } from "@/components/claims-dashboard"
import { ProfilePage } from "@/components/profile-page"
import { DiseaseDetection } from "@/components/disease-detection"
import { ToastDisplay } from "@/components/toast-display"
import { SmartFarmMonitoring } from "@/components/smart-farm-monitoring"
import { GovernmentSchemes } from "@/components/government-schemes"
import { FarmerFinance } from "@/components/farmer-finance"
import { ExpenseTracker } from "@/components/expense-tracker"
import { CropMarketplace } from "@/components/crop-marketplace"
import { SmartAlerts } from "@/components/smart-alerts"
import { SmartChatbot } from "@/components/smart-chatbot"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Cpu,
  Building2,
  Wallet,
  Receipt,
  ShoppingBag,
  Bell as BellIcon,
  ChevronRight,
} from "lucide-react"
import { smartAlerts } from "@/lib/mock-data"

type ExtendedView = "smartFarm" | "schemes" | "finance" | "expenses" | "marketplace" | "alerts" | null

export default function KisanSaathiApp() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [showDisease, setShowDisease] = useState(false)
  const [extendedView, setExtendedView] = useState<ExtendedView>(null)
  const [showChatbot, setShowChatbot] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const unreadAlerts = smartAlerts.filter((a) => !a.read).length

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg font-bold text-primary-foreground">K</span>
          </div>
          <p className="text-sm text-muted-foreground">Loading KisanSaathi...</p>
        </div>
      </div>
    )
  }

  const handleBack = () => {
    setExtendedView(null)
  }

  const menuItems = [
    { id: "smartFarm" as const, icon: Cpu, label: "Smart Farm", labelHi: "स्मार्ट फार्म" },
    { id: "schemes" as const, icon: Building2, label: "Govt Schemes", labelHi: "सरकारी योजनाएं" },
    { id: "finance" as const, icon: Wallet, label: "Finance", labelHi: "वित्त" },
    { id: "expenses" as const, icon: Receipt, label: "Expenses", labelHi: "खर्च" },
    { id: "marketplace" as const, icon: ShoppingBag, label: "Marketplace", labelHi: "बाजार" },
    { id: "alerts" as const, icon: BellIcon, label: "Alerts", labelHi: "अलर्ट" },
  ]

  const renderContent = () => {
    // Extended views take priority
    if (extendedView) {
      switch (extendedView) {
        case "smartFarm":
          return <SmartFarmMonitoring onBack={handleBack} />
        case "schemes":
          return <GovernmentSchemes onBack={handleBack} />
        case "finance":
          return <FarmerFinance onBack={handleBack} />
        case "expenses":
          return <ExpenseTracker onBack={handleBack} />
        case "marketplace":
          return <CropMarketplace onBack={handleBack} />
        case "alerts":
          return <SmartAlerts onBack={handleBack} />
      }
    }

    // Disease detection overlay
    if (showDisease) {
      return <DiseaseDetection onBack={() => setShowDisease(false)} onFileClaim={() => { setShowDisease(false); setActiveTab("claim") }} />
    }

    // Main tabs
    switch (activeTab) {
      case "home":
        return (
          <HomeDashboard 
            onNavigate={setActiveTab} 
            onDetectDisease={() => setShowDisease(true)} 
            onExtendedView={setExtendedView}
          />
        )
      case "claim":
        return <CropLossClaim />
      case "equipment":
        return <EquipmentMarketplace />
      case "dashboard":
        return <ClaimsDashboard />
      case "profile":
        return <ProfilePage />
    }
  }

  return (
    <LanguageProvider>
      <ToastProvider>
        <div className="min-h-screen w-full bg-background">
          <OfflineBanner />
          
          {/* App Header Bar */}
          <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border bg-card px-4 py-3 md:px-8 lg:px-12">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">K</span>
              </div>
              <div>
                <h1 className="text-sm font-bold leading-none text-foreground">
                  KisanSaathi
                </h1>
                <p className="text-[10px] leading-none text-muted-foreground">
                  {"किसान साथी"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Alert indicator */}
              <button
                onClick={() => setExtendedView("alerts")}
                className="relative flex size-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80"
              >
                <Bell className="size-4 text-muted-foreground" />
                {unreadAlerts > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-card">
                    {unreadAlerts}
                  </span>
                )}
              </button>

              {/* Menu button */}
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <button className="flex size-8 items-center justify-center rounded-full bg-primary/15 transition-colors hover:bg-primary/25">
                    <Menu className="size-4 text-primary" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>More Features</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setExtendedView(item.id)
                          setMenuOpen(false)
                        }}
                        className="flex items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-muted"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <item.icon className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.labelHi}</p>
                          </div>
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {/* Main Content */}
          <main className="w-full px-4 pb-24 pt-4 md:px-8 lg:px-12">
            {renderContent()}
          </main>

          {/* Bottom Navigation */}
          <BottomNav 
            activeTab={activeTab} 
            onTabChange={(tab) => { 
              setShowDisease(false)
              setExtendedView(null)
              setActiveTab(tab) 
            }} 
          />

          {/* Floating Chatbot Button */}
          <button
            onClick={() => setShowChatbot(true)}
            className="fixed bottom-20 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Open chat assistant"
          >
            <MessageSquare className="size-6 text-primary-foreground" />
          </button>

          {/* Smart Chatbot */}
          <SmartChatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />

          <ToastDisplay />
        </div>
      </ToastProvider>
    </LanguageProvider>
  )
}
