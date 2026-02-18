"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Camera,
  Upload,
  Volume2,
  ArrowLeft,
  ChevronRight,
  Microscope,
  ShoppingBag,
  RefreshCw,
  FileText,
  Share2,
  Download,
  Printer,
  Send,
  MapPin,
  Shield,
  CloudSun,
  Thermometer,
  Droplets,
  IndianRupee,
  QrCode,
  Leaf,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { diseaseDatabase, farmerProfile } from "@/lib/mock-data"
import type { DiseaseResult } from "@/lib/mock-data"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts"

type Screen = "upload" | "processing" | "results" | "report"

interface DiseaseDetectionProps {
  onBack: () => void
}

export function DiseaseDetection({ onBack }: DiseaseDetectionProps) {
  const [screen, setScreen] = useState<Screen>("upload")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [result, setResult] = useState<DiseaseResult | null>(null)
  const { t } = useLanguage()

  const handleImageSelected = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl)
    setScreen("processing")
    const randomDisease =
      diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)]
    setTimeout(() => {
      setResult(randomDisease)
      setScreen("results")
    }, 3500)
  }, [])

  const handleScanAnother = useCallback(() => {
    setScreen("upload")
    setSelectedImage(null)
    setResult(null)
  }, [])

  return (
    <div className="flex w-full flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="font-serif text-xl font-bold" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
            {t("Crop Disease Detection", "फसल रोग पहचान", "పంట వ్యాధి గుర్తింపు")}
          </h1>
        </div>
        <LanguageToggle />
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        {(["Upload", "Analyzing", "Results"] as const).map((step, i) => {
          const stepIndex =
            screen === "upload" ? 0 : screen === "processing" ? 1 : 2
          const isActive = i <= stepIndex
          return (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  isActive ? "bg-primary" : "bg-muted"
                }`}
              />
              <span
                className={`text-[10px] ${
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>

      {/* Screens */}
      {screen === "upload" && (
        <UploadScreen onImageSelected={handleImageSelected} />
      )}
      {screen === "processing" && selectedImage && (
        <ProcessingScreen imageUrl={selectedImage} />
      )}
      {screen === "results" && result && (
        <ResultsScreen
          result={result}
          imageUrl={selectedImage}
          onGenerateReport={() => setScreen("report")}
          onScanAnother={handleScanAnother}
        />
      )}
      {screen === "report" && result && (
        <ReportScreen result={result} onBack={() => setScreen("results")} />
      )}
    </div>
  )
}

/* ================ SCREEN 1: Upload ================ */
function UploadScreen({
  onImageSelected,
}: {
  onImageSelected: (url: string) => void
}) {
  const { t } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        onImageSelected(url)
      }
    },
    [onImageSelected]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-6 transition-all ${
          isDragging
            ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(45,106,79,0.25)]"
            : "border-muted-foreground/30 bg-muted/30"
        }`}
        style={{ minHeight: "clamp(200px, 40vh, 400px)" }}
      >
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/15">
          <Camera className="size-10 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-serif text-lg font-bold text-foreground">
            {t(
              "Upload or capture your crop photo",
              "अपनी फसल की फोटो अपलोड करें",
              "మీ పంట ఫోటో అప్‌లోడ్ చేయండి"
            )}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Supports JPG, PNG \u2014 Max 10MB",
              "JPG, PNG \u2014 अधिकतम 10MB",
              "JPG, PNG \u2014 గరిష్టంగా 10MB"
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-3">
          <Button
            size="lg"
            className="min-h-14 flex-1 gap-2 bg-primary text-base text-primary-foreground"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera className="size-5" />
            {t("Take Photo", "फोटो लें", "ఫోటో తీయండి")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-14 flex-1 gap-2 text-base"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="size-5" />
            {t("Upload", "अपलोड", "అప్‌లోడ్")}
          </Button>
        </div>

        {/* Hidden Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>

      {/* Voice Instruction */}
      <Button
        variant="outline"
        className="min-h-12 gap-2 text-sm"
        onClick={() => {
          if ("speechSynthesis" in window) {
            const msg = new SpeechSynthesisUtterance(
              "Take a clear photo of the affected crop area. Make sure the diseased part is clearly visible. Hold the camera about one foot away from the plant."
            )
            window.speechSynthesis.speak(msg)
          }
        }}
      >
        <Volume2 className="size-4 text-primary" />
        {t(
          "Tap to hear instructions",
          "निर्देश सुनने के लिए टैप करें",
          "సూచనలు వినడానికి నొక్కండి"
        )}
      </Button>

      {/* Example Guide Strip */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {t("Photo Examples:", "फोटो उदाहरण:", "ఫోటో ఉదాహరణలు:")}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: t("Healthy", "स्वस्थ", "ఆరోగ్యకరం"),
              color: "bg-primary/15 border-primary/30",
              icon: "text-primary",
            },
            {
              label: t("Diseased", "रोगग्रस्त", "వ్యాధిగ్రస్తం"),
              color: "bg-secondary/20 border-secondary/40",
              icon: "text-secondary-foreground",
            },
            {
              label: t("Damaged", "क्षतिग्रस्त", "దెబ్బతిన్నది"),
              color: "bg-destructive/10 border-destructive/30",
              icon: "text-destructive",
            },
          ].map((ex) => (
            <div
              key={ex.label}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 ${ex.color}`}
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-card/60">
                <Leaf className={`size-6 ${ex.icon}`} />
              </div>
              <span className="text-[10px] font-medium text-foreground">
                {ex.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================ SCREEN 2: Processing ================ */
function ProcessingScreen({ imageUrl }: { imageUrl: string }) {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  const messages = [
    t("Scanning crop image...", "फसल छवि स्कैन कर रहे हैं...", "పంట చిత్రాన్ని స్కాన్ చేస్తోంది..."),
    t("Detecting disease patterns...", "रोग पैटर्न पहचान रहे हैं...", "వ్యాధి నమూనాలను గుర్తిస్తోంది..."),
    t("Cross-referencing crop database...", "फसल डेटाबेस से मिलान...", "పంట డేటాబేస్‌తో సరిపోల్చుతోంది..."),
    t("Calculating damage severity...", "क्षति गंभीरता गणना...", "నష్టం తీవ్రతను లెక్కిస్తోంది..."),
    t("Generating report...", "रिपोर्ट बना रहे हैं...", "నివేదిక రూపొందిస్తోంది..."),
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100
        return p + 1
      })
    }, 33)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, 700)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Image with Scanner Effect */}
      <div className="relative w-full overflow-hidden rounded-2xl">
        <img
          src={imageUrl}
          alt="Uploaded crop"
          className="aspect-video w-full object-cover"
          crossOrigin="anonymous"
        />
        {/* Scanning Line */}
        <div
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            animation: "scanLine 2s ease-in-out infinite",
            top: `${(progress % 100)}%`,
          }}
        />
        {/* Pulsing Border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary"
          style={{ animation: "pulseRing 1.5s ease-in-out infinite" }}
        />
      </div>

      {/* Circular Progress */}
      <div className="relative flex size-28 items-center justify-center">
        <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
            className="transition-all duration-100"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground">{Math.min(progress, 100)}%</span>
          <span className="text-[10px] text-muted-foreground">~3 sec</span>
        </div>
      </div>

      {/* Animated Message */}
      <p
        className="text-center font-medium text-foreground"
        style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)" }}
      >
        {messages[messageIndex]}
      </p>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 98%; }
          100% { top: 0%; }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.4; box-shadow: 0 0 0 0 rgba(45,106,79,0.4); }
          50% { opacity: 1; box-shadow: 0 0 0 8px rgba(45,106,79,0); }
        }
      `}</style>
    </div>
  )
}

/* ================ SCREEN 3: Results ================ */
function ResultsScreen({
  result,
  imageUrl,
  onGenerateReport,
  onScanAnother,
}: {
  result: DiseaseResult
  imageUrl: string | null
  onGenerateReport: () => void
  onScanAnother: () => void
}) {
  const { t } = useLanguage()
  const [animatedConfidence, setAnimatedConfidence] = useState(0)
  const [animatedCrop, setAnimatedCrop] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedConfidence(result.confidence)
      setAnimatedCrop(result.cropAffectedPct)
    }, 200)
    return () => clearTimeout(timer)
  }, [result.confidence, result.cropAffectedPct])

  const severityColor =
    result.severity === "Severe"
      ? "bg-destructive/15 text-destructive"
      : result.severity === "Moderate"
      ? "bg-secondary/30 text-secondary-foreground"
      : "bg-primary/15 text-primary"

  const severityGlow =
    result.severity === "Severe"
      ? "shadow-[0_0_12px_rgba(220,38,38,0.3)]"
      : result.severity === "Moderate"
      ? "shadow-[0_0_12px_rgba(245,166,35,0.3)]"
      : "shadow-[0_0_12px_rgba(45,106,79,0.3)]"

  const cropData = [
    {
      name: "affected",
      value: animatedCrop,
      fill: result.severity === "Severe" ? "var(--color-destructive)" : result.severity === "Moderate" ? "var(--color-secondary)" : "var(--color-primary)",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* TOP: Disease Identified */}
      <Card className="animate-in slide-in-from-bottom-4 overflow-hidden border-primary/20 duration-500">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {imageUrl && (
              <div className="size-20 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt="Crop"
                  className="size-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-1.5">
              <h2 className="font-serif text-lg font-bold text-foreground" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
                {result.name}
              </h2>
              <p className="text-xs italic text-muted-foreground">
                {result.scientificName}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`${severityColor} ${severityGlow} text-xs`}>
                  {result.severity === "Severe" ? "\uD83D\uDD34" : result.severity === "Moderate" ? "\uD83D\uDFE1" : "\uD83D\uDFE2"} {result.severity}
                </Badge>
                <Badge className="bg-muted text-xs text-muted-foreground">
                  {result.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Confidence & Crop Affected */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Confidence Gauge */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative size-24">
                <svg className="-rotate-90 size-24" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="var(--color-muted)" strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="var(--color-primary)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - animatedConfidence / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{animatedConfidence}%</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {t("Confidence", "विश्वसनीयता", "నమ్మకం")}
              </span>
            </div>

            {/* Crop Affected Ring */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative size-24">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="60%"
                    outerRadius="100%"
                    data={cropData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={6}
                      background={{ fill: "var(--color-muted)" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{animatedCrop}%</span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {t("Crop Affected", "फसल प्रभावित", "పంట ప్రభావితం")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MIDDLE: Disease Details Accordion */}
      <Accordion type="single" collapsible className="flex flex-col gap-2">
        <AccordionItem value="what" className="animate-in slide-in-from-bottom-4 rounded-xl border bg-card px-4 duration-500" style={{ animationDelay: "100ms" }}>
          <AccordionTrigger className="text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Microscope className="size-4 text-primary" />
              {t("What is this disease?", "यह कौनसी बीमारी है?", "ఈ వ్యాధి ఏమిటి?")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{result.description}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="why" className="animate-in slide-in-from-bottom-4 rounded-xl border bg-card px-4 duration-500" style={{ animationDelay: "200ms" }}>
          <AccordionTrigger className="text-sm font-semibold">
            <span className="flex items-center gap-2">
              <CloudSun className="size-4 text-secondary-foreground" />
              {t("Why did this happen?", "ऐसा क्यों हुआ?", "ఇది ఎందుకు జరిగింది?")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{result.causes}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="weather" className="animate-in slide-in-from-bottom-4 rounded-xl border bg-card px-4 duration-500" style={{ animationDelay: "300ms" }}>
          <AccordionTrigger className="text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Thermometer className="size-4 text-accent-foreground" />
              {t("Weather conditions", "मौसम की स्थिति", "వాతావరణ పరిస్థితులు")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{result.weatherCause}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="parts" className="animate-in slide-in-from-bottom-4 rounded-xl border bg-card px-4 duration-500" style={{ animationDelay: "400ms" }}>
          <AccordionTrigger className="text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Leaf className="size-4 text-primary" />
              {t("Affected parts of plant", "पौधे के प्रभावित भाग", "మొక్క ప్రభావిత భాగాలు")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {/* Simple Plant Diagram */}
            <div className="flex items-center justify-center gap-6 py-2">
              <svg viewBox="0 0 120 200" className="h-32 w-auto">
                {/* Roots */}
                <g opacity={result.affectedParts.includes("roots") ? 1 : 0.3}>
                  <path d="M60 170 Q50 190 35 195" stroke={result.affectedParts.includes("roots") ? "var(--color-destructive)" : "var(--color-muted-foreground)"} strokeWidth="2" fill="none" />
                  <path d="M60 170 Q70 190 85 195" stroke={result.affectedParts.includes("roots") ? "var(--color-destructive)" : "var(--color-muted-foreground)"} strokeWidth="2" fill="none" />
                  <path d="M60 170 Q60 190 60 198" stroke={result.affectedParts.includes("roots") ? "var(--color-destructive)" : "var(--color-muted-foreground)"} strokeWidth="2" fill="none" />
                </g>
                {/* Stem */}
                <line
                  x1="60" y1="80" x2="60" y2="170"
                  stroke={result.affectedParts.includes("stems") || result.affectedParts.includes("nodes") ? "var(--color-destructive)" : "var(--color-primary)"}
                  strokeWidth="4" strokeLinecap="round"
                />
                {/* Leaves */}
                <g opacity={result.affectedParts.includes("leaves") ? 1 : 0.3}>
                  <ellipse cx="35" cy="60" rx="25" ry="12" fill={result.affectedParts.includes("leaves") ? "var(--color-destructive)" : "var(--color-primary)"} opacity="0.6" transform="rotate(-30 35 60)" />
                  <ellipse cx="85" cy="50" rx="25" ry="12" fill={result.affectedParts.includes("leaves") ? "var(--color-destructive)" : "var(--color-primary)"} opacity="0.6" transform="rotate(30 85 50)" />
                  <ellipse cx="40" cy="95" rx="22" ry="10" fill={result.affectedParts.includes("leaves") ? "var(--color-destructive)" : "var(--color-primary)"} opacity="0.5" transform="rotate(-20 40 95)" />
                  <ellipse cx="80" cy="105" rx="22" ry="10" fill={result.affectedParts.includes("leaves") ? "var(--color-destructive)" : "var(--color-primary)"} opacity="0.5" transform="rotate(20 80 105)" />
                </g>
              </svg>
              <div className="flex flex-col gap-1.5">
                {["leaves", "stems", "nodes", "roots"].map((part) => (
                  <div key={part} className="flex items-center gap-2">
                    <div
                      className={`size-3 rounded-full ${
                        result.affectedParts.includes(part)
                          ? "bg-destructive"
                          : "bg-muted"
                      }`}
                    />
                    <span className={`text-xs capitalize ${result.affectedParts.includes(part) ? "font-semibold text-destructive" : "text-muted-foreground"}`}>
                      {part}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="treatment" className="animate-in slide-in-from-bottom-4 rounded-xl border bg-card px-4 duration-500" style={{ animationDelay: "500ms" }}>
          <AccordionTrigger className="text-sm font-semibold">
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-primary" />
              {t("Recommended Treatment", "अनुशंसित उपचार", "సిఫార్సు చేసిన చికిత్స")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {result.treatment.map((med, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.dosage}</p>
                    <p className="mt-0.5 text-xs font-semibold text-primary">{"\u20B9"}{med.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="recovery" className="animate-in slide-in-from-bottom-4 rounded-xl border bg-card px-4 duration-500" style={{ animationDelay: "600ms" }}>
          <AccordionTrigger className="text-sm font-semibold">
            <span className="flex items-center gap-2">
              <RefreshCw className="size-4 text-accent-foreground" />
              {t("Recovery Timeline", "रिकवरी समयसीमा", "రికవరీ టైమ్‌లైన్")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{result.recoveryTimeline}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* BOTTOM: Action Buttons */}
      <div className="sticky bottom-20 flex flex-col gap-2 bg-background/95 py-3 backdrop-blur-sm">
        <Button
          size="lg"
          className="min-h-14 w-full gap-2 bg-primary text-base text-primary-foreground"
          onClick={onGenerateReport}
        >
          <FileText className="size-5" />
          {t("Generate Insurance Claim Report", "बीमा दावा रिपोर्ट बनाएं", "బీమా క్లెయిమ్ రిపోర్ట్ రూపొందించండి")}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 gap-2 text-sm"
          >
            <ShoppingBag className="size-4" />
            {t("Buy Supplies", "आपूर्ति खरीदें", "సరఫరాలు కొనండి")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 gap-2 text-sm"
            onClick={onScanAnother}
          >
            <RefreshCw className="size-4" />
            {t("Scan Another", "फिर स्कैन करें", "మళ్ళీ స్కాన్")}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ================ SCREEN 4: Insurance Report ================ */
function ReportScreen({
  result,
  onBack,
}: {
  result: DiseaseResult
  onBack: () => void
}) {
  const { t } = useLanguage()
  const reportId = `KS-2024-${Math.floor(100000 + Math.random() * 900000)}`
  const now = new Date()

  const expectedIncome = result.expectedYield * result.marketPrice
  const actualIncome = result.estimatedActualYield * result.marketPrice
  const estimatedLoss = expectedIncome - actualIncome
  const minClaim = Math.round(estimatedLoss * 0.8)

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("Back to results", "परिणामों पर वापस", "ఫలితాలకు తిరిగి")}
      </button>

      {/* Report */}
      <Card className="overflow-hidden border-primary/20">
        <CardContent className="relative flex flex-col gap-5 p-5 md:p-8" style={{ fontFamily: "var(--font-libre), serif" }}>
          {/* Subtle Watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <span className="text-[120px] font-bold text-foreground" style={{ transform: "rotate(-30deg)" }}>KisanSaathi</span>
          </div>

          {/* Report Header */}
          <div className="flex flex-col items-center gap-2 border-b border-border pb-4 text-center">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">K</span>
              </div>
              <span className="text-lg font-bold text-foreground">KisanSaathi</span>
            </div>
            <h2 className="text-base font-bold text-foreground">
              {t("Official Crop Loss & Disease Report", "आधिकारिक फसल हानि और रोग रिपोर्ट", "అధికారిక పంట నష్టం & వ్యాధి నివేదిక")}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span>{t("Report ID", "रिपोर्ट आईडी", "రిపోర్ట్ ID")}: {reportId}</span>
              <span>{now.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</span>
              <span>{now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <div className="mt-1 flex size-14 items-center justify-center rounded-lg border border-border bg-muted">
              <QrCode className="size-8 text-muted-foreground" />
            </div>
          </div>

          {/* Section 1: Farmer Details */}
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              {t("1. Farmer Details", "1. किसान विवरण", "1. రైతు వివరాలు")}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{farmerProfile.name}</span></div>
              <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{farmerProfile.phone}</span></div>
              <div><span className="text-muted-foreground">Village:</span> <span className="font-medium text-foreground">{farmerProfile.village}</span></div>
              <div><span className="text-muted-foreground">District:</span> <span className="font-medium text-foreground">{farmerProfile.district}, {farmerProfile.state}</span></div>
              <div><span className="text-muted-foreground">Land Area:</span> <span className="font-medium text-foreground">{farmerProfile.landArea} acres</span></div>
              <div><span className="text-muted-foreground">GPS:</span> <span className="font-medium text-foreground">17.3850° N, 78.4867° E</span></div>
              <div className="col-span-2"><span className="text-muted-foreground">Policy No:</span> <span className="font-medium text-foreground">{farmerProfile.insurancePolicyNumber}</span></div>
            </div>
          </div>

          {/* Section 2: AI Disease Analysis */}
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              {t("2. AI Disease Analysis", "2. AI रोग विश्लेषण", "2. AI వ్యాధి విశ్లేషణ")}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div><span className="text-muted-foreground">Disease:</span> <span className="font-semibold text-foreground">{result.name}</span></div>
              <div><span className="text-muted-foreground">Confidence:</span> <span className="font-semibold text-foreground">{result.confidence}%</span></div>
              <div><span className="text-muted-foreground">Severity:</span> <span className="font-semibold text-foreground">{result.severity}</span></div>
              <div><span className="text-muted-foreground">Crop Affected:</span> <span className="font-semibold text-foreground">{result.cropAffectedPct}%</span></div>
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
              <Shield className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                {t("Verified by KisanSaathi AI Engine v2.1", "KisanSaathi AI इंजन v2.1 द्वारा सत्यापित", "KisanSaathi AI ఇంజిన్ v2.1 ద్వారా ధృవీకరించబడింది")}
              </span>
            </div>
          </div>

          {/* Section 3: Weather Cross-Validation */}
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              {t("3. Weather Cross-Validation", "3. मौसम क्रॉस-सत्यापन", "3. వాతావరణ క్రాస్-ధృవీకరణ")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center rounded-lg bg-muted p-2">
                <Droplets className="size-4 text-accent-foreground" />
                <span className="mt-1 text-sm font-bold text-foreground">87mm</span>
                <span className="text-[10px] text-muted-foreground">Rainfall (3d)</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted p-2">
                <CloudSun className="size-4 text-secondary-foreground" />
                <span className="mt-1 text-sm font-bold text-foreground">89%</span>
                <span className="text-[10px] text-muted-foreground">Humidity</span>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-muted p-2">
                <Thermometer className="size-4 text-destructive" />
                <span className="mt-1 text-sm font-bold text-foreground">28°C</span>
                <span className="text-[10px] text-muted-foreground">Temperature</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
              <Shield className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                {t("Weather conditions consistent with disease outbreak", "मौसम की स्थिति रोग प्रकोप के अनुरूप", "వాతావరణ పరిస్థితులు వ్యాధి వ్యాప్తికి అనుగుణంగా")}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              Source: India Meteorological Department + OpenWeatherMap
            </p>
          </div>

          {/* Section 4: Financial Loss */}
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              {t("4. Financial Loss Estimation", "4. वित्तीय हानि अनुमान", "4. ఆర్థిక నష్టం అంచనా")}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div><span className="text-muted-foreground">Expected Yield:</span> <span className="font-medium text-foreground">{result.expectedYield} quintals</span></div>
              <div><span className="text-muted-foreground">Est. Actual Yield:</span> <span className="font-medium text-foreground">{result.estimatedActualYield} quintals</span></div>
              <div><span className="text-muted-foreground">Market Price:</span> <span className="font-medium text-foreground">{"\u20B9"}{result.marketPrice.toLocaleString("en-IN")}/quintal</span></div>
              <div><span className="text-muted-foreground">Expected Income:</span> <span className="font-medium text-foreground">{"\u20B9"}{expectedIncome.toLocaleString("en-IN")}</span></div>
              <div><span className="text-muted-foreground">Est. Actual Income:</span> <span className="font-medium text-foreground">{"\u20B9"}{actualIncome.toLocaleString("en-IN")}</span></div>
            </div>
            <div className="mt-3 rounded-xl border-2 border-destructive/30 bg-destructive/10 p-3 text-center">
              <p className="text-xs text-muted-foreground">{t("Estimated Loss", "अनुमानित हानि", "అంచనా నష్టం")}</p>
              <p className="text-2xl font-bold text-destructive">{"\u20B9"}{estimatedLoss.toLocaleString("en-IN")}</p>
            </div>
            <div className="mt-2 rounded-lg bg-muted p-2 text-center text-xs text-muted-foreground">
              {t("Recommended Claim Amount", "अनुशंसित दावा राशि", "సిఫార్సు క్లెయిమ్ మొత్తం")}:{" "}
              <span className="font-bold text-foreground">{"\u20B9"}{minClaim.toLocaleString("en-IN")} – {"\u20B9"}{estimatedLoss.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Section 5: Geo-tag */}
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              {t("5. Geo-tag & Location Proof", "5. जियो-टैग और स्थान प्रमाण", "5. జియో-ట్యాగ్ & లొకేషన్ ప్రూఫ్")}
            </h3>
            <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
              <MapPin className="size-5 text-primary" />
              <div className="text-xs">
                <p className="font-medium text-foreground">17.3850° N, 78.4867° E</p>
                <p className="text-muted-foreground">
                  {now.toLocaleString("en-IN")} | Device ID: ****a3f7
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Declaration */}
          <div className="border-t border-border pt-4">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
              {t("6. Declaration", "6. घोषणा", "6. ప్రకటన")}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(
                "This report has been auto-generated by KisanSaathi AI system. All data has been cross-verified with satellite weather data and AI crop analysis. This report is valid for insurance claim submission.",
                "यह रिपोर्ट KisanSaathi AI प्रणाली द्वारा स्वचालित रूप से तैयार की गई है। सभी डेटा को उपग्रह मौसम डेटा और AI फसल विश्लेषण के साथ क्रॉस-सत्यापित किया गया है।",
                "ఈ నివేదిక KisanSaathi AI వ్యవస్థ ద్వారా స్వయంచాలకంగా రూపొందించబడింది. మొత్తం డేటా ఉపగ్రహ వాతావరణ డేటా మరియు AI పంట విశ్లేషణతో క్రాస్-వెరిఫై చేయబడింది."
              )}
            </p>
            <div className="mt-3 flex items-center gap-2 border-t border-dashed border-border pt-3">
              <div className="h-8 w-32 rounded border border-muted-foreground/30 bg-muted/50" />
              <span className="text-[10px] text-muted-foreground">{t("Digital Signature", "डिजिटल हस्ताक्षर", "డిజిటల్ సంతకం")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons - Sticky */}
      <div className="sticky bottom-20 grid grid-cols-2 gap-2 bg-background/95 py-3 backdrop-blur-sm md:grid-cols-4">
        <Button size="lg" className="min-h-12 gap-2 bg-primary text-sm text-primary-foreground">
          <Send className="size-4" />
          {t("Submit", "जमा करें", "సమర్పించు")}
        </Button>
        <Button size="lg" variant="outline" className="min-h-12 gap-2 text-sm">
          <Download className="size-4" />
          {t("PDF", "PDF", "PDF")}
        </Button>
        <Button size="lg" variant="outline" className="min-h-12 gap-2 text-sm">
          <Share2 className="size-4" />
          {t("WhatsApp", "WhatsApp", "WhatsApp")}
        </Button>
        <Button size="lg" variant="outline" className="min-h-12 gap-2 text-sm">
          <Printer className="size-4" />
          {t("Print", "प्रिंट", "ప్రింట్")}
        </Button>
      </div>
    </div>
  )
}
