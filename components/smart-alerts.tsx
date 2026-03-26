"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  Cloud,
  IndianRupee,
  FileText,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/language-context"
import { smartAlerts } from "@/lib/mock-data"

interface SmartAlertsProps {
  onBack: () => void
}

const alertTypeIcons = {
  weather: Cloud,
  price: IndianRupee,
  scheme: FileText,
  irrigation: Droplets,
}

const alertTypeColors = {
  weather: "bg-accent/15 text-accent-foreground",
  price: "bg-secondary/15 text-secondary-foreground",
  scheme: "bg-primary/15 text-primary",
  irrigation: "bg-sky-blue/15 text-sky-blue",
}

export function SmartAlerts({ onBack }: SmartAlertsProps) {
  const { t, language } = useLanguage()
  const [alerts, setAlerts] = useState(smartAlerts)
  const [preferences, setPreferences] = useState({
    weather: true,
    price: true,
    scheme: true,
    irrigation: true,
  })

  const unreadCount = alerts.filter((a) => !a.read).length

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)))
  }

  const markAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id))
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffHours < 1) return t("Just now", "अभी", "ఇప్పుడే")
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex size-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="font-serif text-xl font-bold">
              {t("Smart Alerts", "स्मार्ट अलर्ट", "స్మార్ట్ అలర్ట్‌లు")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("Stay informed about your farm", "अपने खेत के बारे में जानकारी रखें", "మీ పొలం గురించి తెలుసుకోండి")}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button size="sm" variant="outline" onClick={markAllRead}>
            {t("Mark all read", "सभी पढ़े", "అన్నీ చదివినట్లు")}
          </Button>
        )}
      </div>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="relative">
              <Bell className="size-5 text-primary" />
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-card">
                {unreadCount}
              </span>
            </div>
            <span className="text-sm font-medium">
              {t(
                `You have ${unreadCount} unread alerts`,
                `आपके पास ${unreadCount} अपठित अलर्ट हैं`,
                `మీకు ${unreadCount} చదవని హెచ్చరికలు ఉన్నాయి`
              )}
            </span>
          </CardContent>
        </Card>
      )}

      {/* Alert Preferences */}
      <Card>
        <CardContent className="p-4">
          <h3 className="mb-3 font-bold">{t("Alert Preferences", "अलर्ट प्राथमिकताएं", "హెచ్చరిక ప్రాధాన్యతలు")}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <Cloud className="size-4 text-accent-foreground" />
                <span className="text-sm">{t("Weather", "मौसम", "వాతావరణం")}</span>
              </div>
              <Switch
                checked={preferences.weather}
                onCheckedChange={(checked) => setPreferences({ ...preferences, weather: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <IndianRupee className="size-4 text-secondary-foreground" />
                <span className="text-sm">{t("Prices", "कीमत", "ధరలు")}</span>
              </div>
              <Switch
                checked={preferences.price}
                onCheckedChange={(checked) => setPreferences({ ...preferences, price: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                <span className="text-sm">{t("Schemes", "योजनाएं", "పథకాలు")}</span>
              </div>
              <Switch
                checked={preferences.scheme}
                onCheckedChange={(checked) => setPreferences({ ...preferences, scheme: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <Droplets className="size-4 text-accent" />
                <span className="text-sm">{t("Irrigation", "सिंचाई", "నీటిపారుదల")}</span>
              </div>
              <Switch
                checked={preferences.irrigation}
                onCheckedChange={(checked) => setPreferences({ ...preferences, irrigation: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div>
        <h3 className="mb-3 font-bold">{t("Recent Alerts", "हाल के अलर्ट", "ఇటీవలి హెచ్చరికలు")}</h3>
        <div className="flex flex-col gap-2">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="mb-2 size-10 text-muted-foreground" />
                <p className="font-medium">{t("No alerts", "कोई अलर्ट नहीं", "హెచ్చరికలు లేవు")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("You're all caught up!", "आप अप टू डेट हैं!", "మీరు అప్ టు డేట్!")}
                </p>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => {
              const Icon = alertTypeIcons[alert.type as keyof typeof alertTypeIcons] || Bell
              const colorClass = alertTypeColors[alert.type as keyof typeof alertTypeColors] || "bg-muted"

              return (
                <Card
                  key={alert.id}
                  className={`transition-colors ${!alert.read ? "border-l-4 border-l-primary bg-primary/5" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${colorClass}`}>
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h4 className="font-bold">
                            {language === "hi" ? alert.titleHi : alert.title}
                          </h4>
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                alert.severity === "high"
                                  ? "destructive"
                                  : alert.severity === "medium"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="text-[10px]"
                            >
                              {alert.severity === "high"
                                ? t("High", "उच्च", "అధిక")
                                : alert.severity === "medium"
                                ? t("Medium", "मध्यम", "మధ్యస్థ")
                                : t("Low", "कम", "తక్కువ")}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {formatTime(alert.timestamp)}
                            </span>
                          </div>
                          {!alert.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-auto px-2 py-1 text-xs"
                              onClick={() => markAsRead(alert.id)}
                            >
                              <CheckCircle2 className="mr-1 size-3" />
                              {t("Mark read", "पढ़ा", "చదివినట్లు")}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
