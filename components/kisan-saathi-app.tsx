"use client"

import { useState, useEffect } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { BottomNav, type TabId } from "@/components/bottom-nav"
import { OfflineBanner } from "@/components/offline-banner"
import { HomeDashboard } from "@/components/home-dashboard"
import { CropLossClaim } from "@/components/crop-loss-claim"
import { EquipmentMarketplace } from "@/components/equipment-marketplace"
import { ClaimsDashboard } from "@/components/claims-dashboard"
import { ProfilePage } from "@/components/profile-page"
import { DiseaseDetection } from "@/components/disease-detection"

export default function KisanSaathiApp() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [showDisease, setShowDisease] = useState(false)

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

  const renderTab = () => {
    if (showDisease) {
      return <DiseaseDetection onBack={() => setShowDisease(false)} onFileClaim={() => { setShowDisease(false); setActiveTab("claim") }} />
    }
    switch (activeTab) {
      case "home":
        return <HomeDashboard onNavigate={setActiveTab} onDetectDisease={() => setShowDisease(true)} />
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
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/15">
              <span className="text-xs font-bold text-primary">F</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-4 pb-24 pt-4 md:px-8 lg:px-12">{renderTab()}</main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </LanguageProvider>
  )
}
