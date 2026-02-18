"use client"

import {
  AlertTriangle,
  Cloud,
  Droplets,
  MapPin,
  Thermometer,
  Tractor,
  Wind,
  Wheat,
  BarChart3,
  FileText,
  ChevronRight,
  Users,
  Clock,
  IndianRupee,
  Microscope,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import {
  farmerProfile,
  weatherData,
  alerts,
  communityFeed,
  transparencyStats,
} from "@/lib/mock-data"
import type { TabId } from "@/components/bottom-nav"

interface HomeDashboardProps {
  onNavigate: (tab: TabId) => void
  onDetectDisease?: () => void
}

export function HomeDashboard({ onNavigate, onDetectDisease }: HomeDashboardProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-foreground" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            {t("Hello Farmers \uD83C\uDF3E", "नमस्ते किसान \uD83C\uDF3E", "హలో రైతులు \uD83C\uDF3E")}
          </h1>
          <p className="font-light text-muted-foreground" style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
            {t("Your smart farming companion", "आपका स्मार्ट खेती साथी", "మీ స్మార్ట్ వ్యవసాయ సహచరుడు")}
          </p>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            <span>
              {farmerProfile.village}, {farmerProfile.district}
            </span>
          </div>
        </div>
        <LanguageToggle />
      </div>

      {/* Weather Widget */}
      <Card className="border-0 bg-primary text-primary-foreground">
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-1 text-xs font-medium opacity-80">
            <Cloud className="size-3.5" />
            <span>{t("Today's Weather", "आज का मौसम", "ఈరోజు వాతావరణం")}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">
                {weatherData.current.temp}°C
              </span>
              <span className="text-sm opacity-80">
                {weatherData.current.condition}
              </span>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex flex-col items-center gap-0.5">
                <Droplets className="size-4 opacity-80" />
                <span className="font-semibold">{weatherData.current.humidity}%</span>
                <span className="opacity-70">{t("Humid", "नमी", "తేమ")}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Thermometer className="size-4 opacity-80" />
                <span className="font-semibold">{weatherData.current.rainfall}mm</span>
                <span className="opacity-70">{t("Rain", "बारिश", "వర్షం")}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <Wind className="size-4 opacity-80" />
                <span className="font-semibold">{weatherData.current.windSpeed}km/h</span>
                <span className="opacity-70">{t("Wind", "हवा", "గాలి")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 font-serif text-lg font-bold">
          {t("Quick Actions", "त्वरित कार्य", "త్వరిత చర్యలు")}
        </h2>
        {/* Disease Detection - prominent card */}
        <button
          onClick={onDetectDisease}
          className="flex w-full items-center gap-4 rounded-xl bg-primary/10 p-4 text-left ring-2 ring-primary/30 transition-transform active:scale-[0.98]"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
            <Microscope className="size-6 text-primary" />
          </div>
          <div className="flex-1">
            <span className="text-base font-bold text-primary">
              {t("Detect Crop Disease", "फसल रोग पहचानें", "పంట వ్యాధి గుర్తించండి")}
            </span>
            <p className="text-xs text-muted-foreground">
              {t("AI-powered instant diagnosis & claim", "AI तत्काल निदान और दावा", "AI తక్షణ నిర్ధారణ & క్లెయిమ్")}
            </p>
          </div>
          <ChevronRight className="size-5 text-primary" />
        </button>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <button
            onClick={() => onNavigate("claim")}
            className="flex min-h-[80px] flex-col items-start justify-center gap-1.5 rounded-xl bg-destructive/10 p-4 text-left transition-transform active:scale-[0.98]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/20">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <span className="text-sm font-bold text-destructive">
              {t("Report Crop Loss", "फसल नुकसान रिपोर्ट", "పంట నష్టం నివేదిక")}
            </span>
          </button>

          <button
            onClick={() => onNavigate("equipment")}
            className="flex min-h-[80px] flex-col items-start justify-center gap-1.5 rounded-xl bg-primary/10 p-4 text-left transition-transform active:scale-[0.98]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
              <Tractor className="size-5 text-primary" />
            </div>
            <span className="text-sm font-bold text-primary">
              {t("Rent Equipment", "उपकरण किराये", "పరికరం అద్దె")}
            </span>
          </button>

          <button
            onClick={() => onNavigate("equipment")}
            className="flex min-h-[80px] flex-col items-start justify-center gap-1.5 rounded-xl bg-accent/15 p-4 text-left transition-transform active:scale-[0.98]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-accent/20">
              <FileText className="size-5 text-accent-foreground" />
            </div>
            <span className="text-sm font-bold text-accent-foreground">
              {t("List My Equipment", "उपकरण सूचीबद्ध करें", "పరికరం జాబితా")}
            </span>
          </button>

          <button
            onClick={() => onNavigate("dashboard")}
            className="flex min-h-[80px] flex-col items-start justify-center gap-1.5 rounded-xl bg-secondary/30 p-4 text-left transition-transform active:scale-[0.98]"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary/40">
              <BarChart3 className="size-5 text-secondary-foreground" />
            </div>
            <span className="text-sm font-bold text-secondary-foreground">
              {t("Track My Claim", "दावा ट्रैक करें", "క్లెయిమ్ ట్రాక్")}
            </span>
          </button>
        </div>
      </div>

      {/* Transparency Stats */}
      <Card className="border-secondary/30 bg-secondary/10">
        <CardContent className="p-4">
          <h3 className="mb-3 font-serif text-sm font-bold">
            {t("Platform Transparency", "प्लेटफ़ॉर्म पारदर्शिता", "ప్లాట్‌ఫారమ్ పారదర్శకత")}
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
                <FileText className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {transparencyStats.claimsProcessed.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {t("Claims Processed", "दावे संसाधित", "క్లెయిమ్‌లు")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-secondary/30">
                <Clock className="size-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {transparencyStats.avgClaimTime} {t("days", "दिन", "రోజులు")}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {t("Avg. Claim Time", "औसत समय", "సగటు సమయం")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15">
                <IndianRupee className="size-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {"₹"}2.3 Cr
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {t("Total Payout", "कुल भुगतान", "మొత్తం చెల్లింపు")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
                <Users className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {transparencyStats.farmersServed}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {t("Farmers Served", "किसान सेवित", "రైతులు")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div>
        <h2 className="mb-3 font-serif text-lg font-bold">
          {t("Recent Alerts", "हालिया चेतावनियां", "ఇటీవలి హెచ్చరికలు")}
        </h2>
        <div className="flex flex-col gap-2">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.severity === "high"
                  ? "border-l-destructive"
                  : alert.severity === "medium"
                  ? "border-l-secondary"
                  : "border-l-accent"
              }`}
            >
              <CardContent className="flex items-start gap-3 p-3">
                <AlertTriangle
                  className={`mt-0.5 size-4 shrink-0 ${
                    alert.severity === "high"
                      ? "text-destructive"
                      : alert.severity === "medium"
                      ? "text-secondary"
                      : "text-accent"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {alert.description}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {alert.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Feed */}
      <div>
        <h2 className="mb-3 font-serif text-lg font-bold">
          {t("Community Updates", "समुदाय अपडेट", "కమ్యూనిటీ అప్‌డేట్లు")}
        </h2>
        <div className="flex flex-col gap-2">
          {communityFeed.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full ${
                      item.type === "equipment"
                        ? "bg-primary/15"
                        : "bg-secondary/30"
                    }`}
                  >
                    {item.type === "equipment" ? (
                      <Tractor className="size-4 text-primary" />
                    ) : (
                      <Wheat className="size-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{item.message}</p>
                    <p className="text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
