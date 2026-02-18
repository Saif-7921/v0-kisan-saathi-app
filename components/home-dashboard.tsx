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
        <div className="grid grid-cols-2 gap-4">
          {/* Report Crop Loss */}
          <button
            onClick={() => onNavigate("claim")}
            className="flex min-h-[100px] flex-col items-start justify-center gap-2 rounded-xl bg-destructive/10 p-5 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/20">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <span className="text-sm font-bold text-destructive">
              {t("Report Crop Loss", "फसल नुकसान रिपोर्ट", "పంట నష్టం నివేదిక")}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {t("File insurance claim", "बीमा दावा दर्ज करें", "బీమా క్లెయిమ్ దాఖలు")}
            </span>
          </button>

          {/* Rent Equipment */}
          <button
            onClick={() => onNavigate("equipment")}
            className="flex min-h-[100px] flex-col items-start justify-center gap-2 rounded-xl bg-primary/10 p-5 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
              <Tractor className="size-5 text-primary" />
            </div>
            <span className="text-sm font-bold text-primary">
              {t("Rent Equipment", "उपकरण किराये", "పరికరం అద్దె")}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {t("Find nearby machinery", "नजदीकी मशीनरी खोजें", "సమీపంలోని యంత్రాలు")}
            </span>
          </button>

          {/* List My Equipment */}
          <button
            onClick={() => onNavigate("equipment")}
            className="flex min-h-[100px] flex-col items-start justify-center gap-2 rounded-xl bg-accent/15 p-5 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent/20">
              <FileText className="size-5 text-accent-foreground" />
            </div>
            <span className="text-sm font-bold text-accent-foreground">
              {t("List My Equipment", "उपकरण सूचीबद्ध करें", "పరికరం జాబితా")}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {t("Earn by renting out", "किराये पर देकर कमाएं", "అద్దెకు ఇచ్చి సంపాదించండి")}
            </span>
          </button>

          {/* Track My Claim */}
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex min-h-[100px] flex-col items-start justify-center gap-2 rounded-xl bg-secondary/30 p-5 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/40">
              <BarChart3 className="size-5 text-secondary-foreground" />
            </div>
            <span className="text-sm font-bold text-secondary-foreground">
              {t("Track My Claim", "दावा ट्रैक करें", "క్లెయిమ్ ట్రాక్")}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {t("View claim status", "दावा स्थिति देखें", "క్లెయిమ్ స్థితి చూడండి")}
            </span>
          </button>

          {/* Detect Crop Disease - Full width premium card */}
          <button
            onClick={onDetectDisease}
            className="relative col-span-2 min-h-[120px] overflow-hidden rounded-xl border-2 border-[rgba(245,166,35,0.4)] text-left transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg, #1a472a 0%, #2d6a4f 50%, #40916c 100%)" }}
          >
            {/* Animated particle dots */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-[10%] top-[20%] size-1.5 animate-pulse rounded-full bg-[rgba(255,255,255,0.2)]" />
              <div className="absolute left-[30%] top-[60%] size-1 animate-pulse rounded-full bg-[rgba(255,255,255,0.15)]" style={{ animationDelay: "0.5s" }} />
              <div className="absolute left-[50%] top-[30%] size-1.5 animate-pulse rounded-full bg-[rgba(255,255,255,0.2)]" style={{ animationDelay: "1s" }} />
              <div className="absolute left-[70%] top-[70%] size-1 animate-pulse rounded-full bg-[rgba(255,255,255,0.1)]" style={{ animationDelay: "1.5s" }} />
              <div className="absolute left-[85%] top-[15%] size-1.5 animate-pulse rounded-full bg-[rgba(255,255,255,0.15)]" style={{ animationDelay: "0.7s" }} />
            </div>
            <div className="relative flex items-center gap-4 p-5">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-base font-bold text-[#ffffff]">
                    {t("Detect Crop Disease", "फसल रोग पहचानें", "పంట వ్యాధి గుర్తించండి")}
                  </span>
                  <span className="text-xs text-[rgba(255,255,255,0.7)]">AI Powered</span>
                </div>
                <p className="mb-3 text-xs text-[rgba(255,255,255,0.7)]">
                  {t(
                    "Upload crop photo \u2192 Get instant AI diagnosis + Insurance Report",
                    "फसल फोटो अपलोड करें \u2192 तत्काल AI निदान + बीमा रिपोर्ट पाएं",
                    "పంట ఫోటో అప్లోడ్ \u2192 తక్షణ AI నిర్ధారణ + బీమా నివేదిక"
                  )}
                </p>
                <span
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-[#1a472a]"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  {t("Try Now", "अभी आजमाएं", "ఇప్పుడు ప్రయత్నించండి")} {"\u2192"}
                </span>
              </div>
              {/* Pulsing microscope icon */}
              <div className="relative flex size-16 shrink-0 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-[rgba(64,145,108,0.3)]" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-1 animate-pulse rounded-full bg-[rgba(64,145,108,0.2)]" style={{ animationDuration: "1.5s" }} />
                <Microscope className="relative size-8 text-[#F5A623]" />
              </div>
            </div>
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
