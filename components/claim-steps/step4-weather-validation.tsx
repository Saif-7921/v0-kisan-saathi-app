"use client"

import { useEffect, useState } from "react"
import { CloudRain, ShieldCheck, Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { weatherData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ClaimStep4Props {
  claimData: { weatherVerified: boolean }
  updateClaimData: (data: Partial<{ weatherVerified: boolean }>) => void
}

export function ClaimStep4WeatherValidation({ updateClaimData }: ClaimStep4Props) {
  const { t } = useLanguage()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true)
      updateClaimData({ weatherVerified: true })
    }, 1500)
    return () => clearTimeout(timer)
  }, [updateClaimData])

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <CloudRain className="size-5 text-accent" />
            <span className="font-serif text-base font-bold">
              {t("Rainfall - Last 7 Days", "वर्षा - पिछले 7 दिन", "వర్షపాతం - గత 7 రోజులు")}
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weatherData.weeklyRainfall}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }} />
                <YAxis className="text-xs" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" fill="var(--color-accent)" radius={[4, 4, 0, 0]} name="Rainfall (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Thermometer className="size-5 text-secondary" />
            <span className="font-serif text-base font-bold">
              {t("Temperature Trend", "तापमान रुझान", "ఉష్ణోగ్రత ధోరణి")}
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weatherData.weeklyTemp}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }} />
                <YAxis className="text-xs" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-secondary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-secondary)', r: 4 }}
                  name="Temp (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Verification Badge */}
      <Card className={verified ? "border-primary/30 bg-primary/5" : "border-border"}>
        <CardContent className="flex items-center gap-3 p-4">
          <div className={`flex size-10 items-center justify-center rounded-full ${verified ? "bg-primary/20" : "bg-muted animate-pulse"}`}>
            <ShieldCheck className={`size-5 ${verified ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            {verified ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-primary">
                    {t("Weather Data Verified", "मौसम डेटा सत्यापित", "వాతావరణ డేటా ధృవీకరించబడింది")}
                  </p>
                  <Badge className="bg-primary/15 text-primary">Confirmed</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Heavy Rainfall Confirmed on Jan 15, 2025 - OpenWeatherMap
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("Verifying weather data...", "मौसम डेटा सत्यापित हो रहा है...", "వాతావరణ డేటా ధృవీకరిస్తోంది...")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
