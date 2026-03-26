"use client"

import { useState, useEffect } from "react"
import {
  Droplets,
  Thermometer,
  Wind,
  AlertTriangle,
  RefreshCw,
  Leaf,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/language-context"
import { iotSensorData, aiPredictions } from "@/lib/mock-data"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SmartFarmMonitoringProps {
  onBack: () => void
}

export function SmartFarmMonitoring({ onBack }: SmartFarmMonitoringProps) {
  const { t } = useLanguage()
  const [sensorData, setSensorData] = useState(iotSensorData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("Just now")

  const needsIrrigation = sensorData.soilMoisture.current < sensorData.soilMoisture.threshold

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      // Simulate new sensor readings with slight variations
      setSensorData({
        ...sensorData,
        soilMoisture: {
          ...sensorData.soilMoisture,
          current: Math.max(20, Math.min(80, sensorData.soilMoisture.current + (Math.random() * 10 - 5))),
        },
        temperature: {
          ...sensorData.temperature,
          current: Math.max(20, Math.min(45, sensorData.temperature.current + (Math.random() * 4 - 2))),
        },
        humidity: {
          ...sensorData.humidity,
          current: Math.max(30, Math.min(95, sensorData.humidity.current + (Math.random() * 8 - 4))),
        },
      })
      setLastUpdated("Just now")
      setIsRefreshing(false)
    }, 1500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor((Date.now() % 600000) / 60000)
      setLastUpdated(minutes === 0 ? "Just now" : `${minutes} min ago`)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

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
              {t("Smart Farm Monitoring", "स्मार्ट फार्म मॉनिटरिंग", "స్మార్ట్ ఫార్మ్ మానిటరింగ్")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("Real-time IoT sensor data", "रियल-टाइम IoT सेंसर डेटा", "రియల్-టైమ్ IoT సెన్సార్ డేటా")}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {t("Refresh", "रिफ्रेश", "రిఫ్రెష్")}
        </Button>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="size-2 rounded-full bg-primary animate-pulse" />
        <span>{t("Last updated:", "अंतिम अपडेट:", "చివరి అప్‌డేట్:")} {lastUpdated}</span>
      </div>

      {/* Irrigation Alert */}
      {needsIrrigation && (
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/20">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-destructive">
                {t("Irrigation Needed!", "सिंचाई की जरूरत!", "నీటిపారుదల అవసరం!")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(
                  `Soil moisture is ${Math.round(sensorData.soilMoisture.current)}%, below threshold of ${sensorData.soilMoisture.threshold}%`,
                  `मिट्टी की नमी ${Math.round(sensorData.soilMoisture.current)}% है, ${sensorData.soilMoisture.threshold}% सीमा से नीचे`,
                  `మట్టి తేమ ${Math.round(sensorData.soilMoisture.current)}%, ${sensorData.soilMoisture.threshold}% థ్రెషోల్డ్ కంటే తక్కువ`
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Soil Moisture */}
        <Card className={needsIrrigation ? "border-destructive/30" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex size-10 items-center justify-center rounded-lg ${needsIrrigation ? "bg-destructive/20" : "bg-primary/15"}`}>
                  <Droplets className={`size-5 ${needsIrrigation ? "text-destructive" : "text-primary"}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("Soil Moisture", "मिट्टी की नमी", "నేల తేమ")}
                  </p>
                  <p className="text-2xl font-bold">{Math.round(sensorData.soilMoisture.current)}%</p>
                </div>
              </div>
              <Badge variant={needsIrrigation ? "destructive" : "secondary"} className="text-[10px]">
                {needsIrrigation ? t("Low", "कम", "తక్కువ") : t("OK", "ठीक", "సరే")}
              </Badge>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                <span>{t("Threshold:", "सीमा:", "థ్రెషోల్డ్:")} {sensorData.soilMoisture.threshold}%</span>
              </div>
              <Progress 
                value={sensorData.soilMoisture.current} 
                className={`h-2 ${needsIrrigation ? "[&>div]:bg-destructive" : ""}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/20">
                  <Thermometer className="size-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("Temperature", "तापमान", "ఉష్ణోగ్రత")}
                  </p>
                  <p className="text-2xl font-bold">{Math.round(sensorData.temperature.current)}°C</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {sensorData.temperature.current > 35 ? t("High", "उच्च", "ఎక్కువ") : t("Normal", "सामान्य", "సాధారణ")}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>{t("Min:", "न्यून:", "కనిష్ట:")} {sensorData.temperature.min}°C</span>
              <span>|</span>
              <span>{t("Max:", "अधि:", "గరిష్ట:")} {sensorData.temperature.max}°C</span>
            </div>
          </CardContent>
        </Card>

        {/* Humidity */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/20">
                  <Wind className="size-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("Humidity", "आर्द्रता", "తేమ")}
                  </p>
                  <p className="text-2xl font-bold">{Math.round(sensorData.humidity.current)}%</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {sensorData.humidity.current > 80 ? t("High", "उच्च", "ఎక్కువ") : t("Normal", "सामान्य", "సాధారణ")}
              </Badge>
            </div>
            <div className="mt-3">
              <Progress value={sensorData.humidity.current} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">
            {t("Sensor History (Today)", "सेंसर इतिहास (आज)", "సెన్సార్ హిస్టరీ (ఈరోజు)")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="h-48">
            <ChartContainer
              config={{
                moisture: { label: "Soil Moisture", color: "var(--color-primary)" },
                temperature: { label: "Temperature", color: "var(--color-secondary)" },
                humidity: { label: "Humidity", color: "var(--color-accent)" },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sensorData.soilMoisture.history.map((item, idx) => ({
                    time: item.time,
                    moisture: item.value,
                    temperature: sensorData.temperature.history[idx]?.value,
                    humidity: sensorData.humidity.history[idx]?.value,
                  }))}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    stroke="var(--color-primary)"
                    fill="var(--color-primary)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="humidity"
                    stroke="var(--color-accent)"
                    fill="var(--color-accent)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions Section */}
      <div>
        <h2 className="mb-3 font-serif text-lg font-bold">
          {t("AI Predictions", "AI भविष्यवाणी", "AI అంచనాలు")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Yield Prediction */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <Leaf className="size-5 text-primary" />
                <h3 className="font-bold">{t("Yield Prediction", "उपज भविष्यवाणी", "దిగుబడి అంచనా")}</h3>
              </div>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{aiPredictions.yieldPrediction.predictedYield}</span>
                <span className="text-muted-foreground">/ {aiPredictions.yieldPrediction.expectedYield} quintals</span>
              </div>
              <div className="mb-3 flex items-center gap-1 text-xs">
                <TrendingDown className="size-3 text-destructive" />
                <span className="text-destructive">
                  -{aiPredictions.yieldPrediction.expectedYield - aiPredictions.yieldPrediction.predictedYield} quintals expected
                </span>
              </div>
              <div className="space-y-2">
                {aiPredictions.yieldPrediction.factors.map((factor, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{factor.name}</span>
                    <span className={factor.impact > 0 ? "text-primary" : "text-destructive"}>
                      {factor.impact > 0 ? "+" : ""}{factor.impact}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disease Risk */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-secondary" />
                  <h3 className="font-bold">{t("Disease Risk", "रोग जोखिम", "వ్యాధి ప్రమాదం")}</h3>
                </div>
                <Badge variant={aiPredictions.diseaseRisk.overall === "High" ? "destructive" : "secondary"}>
                  {aiPredictions.diseaseRisk.overall}
                </Badge>
              </div>
              <div className="space-y-3">
                {aiPredictions.diseaseRisk.risks.map((risk, idx) => (
                  <div key={idx}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>{risk.disease}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">{risk.probability}%</span>
                        {risk.trend === "increasing" ? (
                          <TrendingUp className="size-3 text-destructive" />
                        ) : risk.trend === "decreasing" ? (
                          <TrendingDown className="size-3 text-primary" />
                        ) : null}
                      </div>
                    </div>
                    <Progress 
                      value={risk.probability} 
                      className={`h-1.5 ${risk.probability > 40 ? "[&>div]:bg-destructive" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weather Impact */}
      <Card className="bg-primary/5">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <Thermometer className="size-5 text-primary" />
            <h3 className="font-bold">{t("Weather Impact Analysis", "मौसम प्रभाव विश्लेषण", "వాతావరణ ప్రభావ విశ్లేషణ")}</h3>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-card p-3 text-center">
              <p className="text-lg font-bold">{aiPredictions.weatherImpact.rainfall.expected}mm</p>
              <p className="text-[10px] text-muted-foreground">{t("Expected Rain", "अपेक्षित बारिश", "ఆశించిన వర్షం")}</p>
            </div>
            <div className="rounded-lg bg-card p-3 text-center">
              <p className="text-lg font-bold">{aiPredictions.weatherImpact.temperature.avg}°C</p>
              <p className="text-[10px] text-muted-foreground">{t("Avg Temp", "औसत तापमान", "సగటు ఉష్ణోగ్రత")}</p>
            </div>
            <div className="rounded-lg bg-card p-3 text-center">
              <p className="text-lg font-bold">{aiPredictions.weatherImpact.humidity.avg}%</p>
              <p className="text-[10px] text-muted-foreground">{t("Avg Humidity", "औसत आर्द्रता", "సగటు తేమ")}</p>
            </div>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
            <p className="text-sm font-medium text-primary">
              {t("Recommendation:", "सिफारिश:", "సిఫార్సు:")}
            </p>
            <p className="text-sm text-foreground">
              {aiPredictions.weatherImpact.recommendation}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
