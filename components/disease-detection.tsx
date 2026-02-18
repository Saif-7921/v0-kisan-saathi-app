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
  Leaf,
  CloudSun,
  Thermometer,
  X,
  ShoppingCart,
  Plus,
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
import { useToastContext } from "@/lib/toast-context"
import { ReportScreen } from "@/components/report-screen"
import { diseaseDatabase } from "@/lib/mock-data"
import type { DiseaseResult } from "@/lib/mock-data"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts"

type Screen = "upload" | "processing" | "results" | "report"

interface DiseaseDetectionProps {
  onBack: () => void
  onFileClaim?: () => void
}

export function DiseaseDetection({ onBack, onFileClaim }: DiseaseDetectionProps) {
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
            {t("Crop Disease Detection", "\u092B\u0938\u0932 \u0930\u094B\u0917 \u092A\u0939\u091A\u093E\u0928", "\u0C2A\u0C02\u0C1F \u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C3F \u0C17\u0C41\u0C30\u0C4D\u0C24\u0C3F\u0C02\u0C2A\u0C41")}
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
        <ReportScreen result={result} onBack={() => setScreen("results")} onFileClaim={onFileClaim} />
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
              "\u0905\u092A\u0928\u0940 \u092B\u0938\u0932 \u0915\u0940 \u092B\u094B\u091F\u094B \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
              "\u0C2E\u0C40 \u0C2A\u0C02\u0C1F \u0C2B\u0C4B\u0C1F\u0C4B \u0C05\u0C2A\u0C4D\u200C\u0C32\u0C4B\u0C21\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F"
            )}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t(
              "Supports JPG, PNG \u2014 Max 10MB",
              "JPG, PNG \u2014 \u0905\u0927\u093F\u0915\u0924\u092E 10MB",
              "JPG, PNG \u2014 \u0C17\u0C30\u0C3F\u0C37\u0C4D\u0C1F\u0C02\u0C17\u0C3E 10MB"
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
            {t("Take Photo", "\u092B\u094B\u091F\u094B \u0932\u0947\u0902", "\u0C2B\u0C4B\u0C1F\u0C4B \u0C24\u0C40\u0C2F\u0C02\u0C21\u0C3F")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-14 flex-1 gap-2 text-base"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="size-5" />
            {t("Upload", "\u0905\u092A\u0932\u094B\u0921", "\u0C05\u0C2A\u0C4D\u200C\u0C32\u0C4B\u0C21\u0C4D")}
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
          "\u0928\u093F\u0930\u094D\u0926\u0947\u0936 \u0938\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091F\u0948\u092A \u0915\u0930\u0947\u0902",
          "\u0C38\u0C42\u0C1A\u0C28\u0C32\u0C41 \u0C35\u0C3F\u0C28\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F"
        )}
      </Button>

      {/* Example Guide Strip */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {t("Photo Examples:", "\u092B\u094B\u091F\u094B \u0909\u0926\u093E\u0939\u0930\u0923:", "\u0C2B\u0C4B\u0C1F\u0C4B \u0C09\u0C26\u0C3E\u0C39\u0C30\u0C23\u0C32\u0C41:")}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: t("Healthy", "\u0938\u094D\u0935\u0938\u094D\u0925", "\u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C15\u0C30\u0C02"),
              color: "bg-primary/15 border-primary/30",
              icon: "text-primary",
            },
            {
              label: t("Diseased", "\u0930\u094B\u0917\u0917\u094D\u0930\u0938\u094D\u0924", "\u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C3F\u0C17\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C02"),
              color: "bg-secondary/20 border-secondary/40",
              icon: "text-secondary-foreground",
            },
            {
              label: t("Damaged", "\u0915\u094D\u0937\u0924\u093F\u0917\u094D\u0930\u0938\u094D\u0924", "\u0C26\u0C46\u0C2C\u0C4D\u0C2C\u0C24\u0C3F\u0C28\u0C4D\u0C28\u0C26\u0C3F"),
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
    t("Scanning crop image...", "\u092B\u0938\u0932 \u091B\u0935\u093F \u0938\u094D\u0915\u0948\u0928 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902...", "\u0C2A\u0C02\u0C1F \u0C1A\u0C3F\u0C24\u0C4D\u0C30\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C38\u0C4D\u0C15\u0C3E\u0C28\u0C4D \u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F..."),
    t("Detecting disease patterns...", "\u0930\u094B\u0917 \u092A\u0948\u091F\u0930\u094D\u0928 \u092A\u0939\u091A\u093E\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902...", "\u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C3F \u0C28\u0C2E\u0C42\u0C28\u0C3E\u0C32\u0C28\u0C41 \u0C17\u0C41\u0C30\u0C4D\u0C24\u0C3F\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F..."),
    t("Cross-referencing crop database...", "\u092B\u0938\u0932 \u0921\u0947\u091F\u093E\u092C\u0947\u0938 \u0938\u0947 \u092E\u093F\u0932\u093E\u0928...", "\u0C2A\u0C02\u0C1F \u0C21\u0C47\u0C1F\u0C3E\u0C2C\u0C47\u0C38\u0C4D\u200C\u0C24\u0C4B \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C4D\u0C1A\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F..."),
    t("Calculating damage severity...", "\u0915\u094D\u0937\u0924\u093F \u0917\u0902\u092D\u0940\u0930\u0924\u093E \u0917\u0923\u0928\u093E...", "\u0C28\u0C37\u0C4D\u0C1F\u0C02 \u0C24\u0C40\u0C35\u0C4D\u0C30\u0C24\u0C28\u0C41 \u0C32\u0C46\u0C15\u0C4D\u0C15\u0C3F\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F..."),
    t("Generating report...", "\u0930\u093F\u092A\u094B\u0930\u094D\u091F \u092C\u0928\u093E \u0930\u0939\u0947 \u0939\u0948\u0902...", "\u0C28\u0C3F\u0C35\u0C47\u0C26\u0C3F\u0C15 \u0C30\u0C42\u0C2A\u0C4A\u0C02\u0C26\u0C3F\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F..."),
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
        <div
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            animation: "scanLine 2s ease-in-out infinite",
            top: `${(progress % 100)}%`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary"
          style={{ animation: "pulseRing 1.5s ease-in-out infinite" }}
        />
      </div>

      {/* Circular Progress */}
      <div className="relative flex size-28 items-center justify-center">
        <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke="var(--color-muted)" strokeWidth="6"
          />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke="var(--color-primary)" strokeWidth="6"
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
  const { showToast } = useToastContext()
  const [animatedConfidence, setAnimatedConfidence] = useState(0)
  const [animatedCrop, setAnimatedCrop] = useState(0)
  const [showSuppliesModal, setShowSuppliesModal] = useState(false)

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
            <div className="flex flex-col items-center gap-1">
              <div className="relative size-24">
                <svg className="-rotate-90 size-24" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-muted)" strokeWidth="8" />
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
                {t("Confidence", "\u0935\u093F\u0936\u094D\u0935\u0938\u0928\u0940\u092F\u0924\u093E", "\u0C28\u0C2E\u0C4D\u0C2E\u0C15\u0C02")}
              </span>
            </div>

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
                {t("Crop Affected", "\u092B\u0938\u0932 \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924", "\u0C2A\u0C02\u0C1F \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C3F\u0C24\u0C02")}
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
              {t("What is this disease?", "\u092F\u0939 \u0915\u094C\u0928\u0938\u0940 \u092C\u0940\u092E\u093E\u0930\u0940 \u0939\u0948?", "\u0C08 \u0C35\u0C4D\u0C2F\u0C3E\u0C27\u0C3F \u0C0F\u0C2E\u0C3F\u0C1F\u0C3F?")}
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
              {t("Why did this happen?", "\u0910\u0938\u093E \u0915\u094D\u092F\u094B\u0902 \u0939\u0941\u0906?", "\u0C07\u0C26\u0C3F \u0C0E\u0C02\u0C26\u0C41\u0C15\u0C41 \u0C1C\u0C30\u0C3F\u0C17\u0C3F\u0C02\u0C26\u0C3F?")}
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
              {t("Weather conditions", "\u092E\u094C\u0938\u092E \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F", "\u0C35\u0C3E\u0C24\u0C3E\u0C35\u0C30\u0C23 \u0C2A\u0C30\u0C3F\u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C41\u0C32\u0C41")}
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
              {t("Affected parts of plant", "\u092A\u094C\u0927\u0947 \u0915\u0947 \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u092D\u093E\u0917", "\u0C2E\u0C4A\u0C15\u0C4D\u0C15 \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C3F\u0C24 \u0C2D\u0C3E\u0C17\u0C3E\u0C32\u0C41")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center justify-center gap-6 py-2">
              <svg viewBox="0 0 120 200" className="h-32 w-auto">
                <g opacity={result.affectedParts.includes("roots") ? 1 : 0.3}>
                  <path d="M60 170 Q50 190 35 195" stroke={result.affectedParts.includes("roots") ? "var(--color-destructive)" : "var(--color-muted-foreground)"} strokeWidth="2" fill="none" />
                  <path d="M60 170 Q70 190 85 195" stroke={result.affectedParts.includes("roots") ? "var(--color-destructive)" : "var(--color-muted-foreground)"} strokeWidth="2" fill="none" />
                  <path d="M60 170 Q60 190 60 198" stroke={result.affectedParts.includes("roots") ? "var(--color-destructive)" : "var(--color-muted-foreground)"} strokeWidth="2" fill="none" />
                </g>
                <line
                  x1="60" y1="80" x2="60" y2="170"
                  stroke={result.affectedParts.includes("stems") || result.affectedParts.includes("nodes") ? "var(--color-destructive)" : "var(--color-primary)"}
                  strokeWidth="4" strokeLinecap="round"
                />
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
              {t("Recommended Treatment", "\u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0909\u092A\u091A\u093E\u0930", "\u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41 \u0C1A\u0C47\u0C38\u0C3F\u0C28 \u0C1A\u0C3F\u0C15\u0C3F\u0C24\u0C4D\u0C38")}
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
              {t("Recovery Timeline", "\u0930\u093F\u0915\u0935\u0930\u0940 \u0938\u092E\u092F\u0938\u0940\u092E\u093E", "\u0C30\u0C3F\u0C15\u0C35\u0C30\u0C40 \u0C1F\u0C48\u0C2E\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D")}
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
          {t("Generate Insurance Claim Report", "\u092C\u0940\u092E\u093E \u0926\u093E\u0935\u093E \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u092C\u0928\u093E\u090F\u0902", "\u0C2C\u0C40\u0C2E\u0C3E \u0C15\u0C4D\u0C32\u0C46\u0C2F\u0C3F\u0C2E\u0C4D \u0C30\u0C3F\u0C2A\u0C4B\u0C30\u0C4D\u0C1F\u0C4D \u0C30\u0C42\u0C2A\u0C4A\u0C02\u0C26\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F")}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 gap-2 text-sm"
            onClick={() => setShowSuppliesModal(true)}
          >
            <ShoppingBag className="size-4" />
            {t("Buy Supplies", "\u0906\u092A\u0942\u0930\u094D\u0924\u093F \u0916\u0930\u0940\u0926\u0947\u0902", "\u0C38\u0C30\u0C2B\u0C30\u0C3E\u0C32\u0C41 \u0C15\u0C4A\u0C28\u0C02\u0C21\u0C3F")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 gap-2 text-sm"
            onClick={onScanAnother}
          >
            <RefreshCw className="size-4" />
            {t("Scan Another", "\u092B\u093F\u0930 \u0938\u094D\u0915\u0948\u0928 \u0915\u0930\u0947\u0902", "\u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C38\u0C4D\u0C15\u0C3E\u0C28\u0C4D")}
          </Button>
        </div>
      </div>

      {/* Buy Treatment Supplies Modal */}
      {showSuppliesModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowSuppliesModal(false) }}
        >
          <div className="max-h-[80vh] w-full max-w-sm animate-in zoom-in-95 overflow-y-auto rounded-2xl bg-card p-5 shadow-xl duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {t("Treatment Supplies", "\u0909\u092A\u091A\u093E\u0930 \u0938\u093E\u092E\u0917\u094D\u0930\u0940", "\u0C1A\u0C3F\u0C15\u0C3F\u0C24\u0C4D\u0C38 \u0C38\u0C30\u0C2B\u0C30\u0C3E\u0C32\u0C41")}
              </h3>
              <button onClick={() => setShowSuppliesModal(false)} className="rounded-lg p-1 hover:bg-muted">
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              {t("Recommended for", "\u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924", "\u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41")} {result.name}
            </p>
            <div className="flex flex-col gap-3">
              {result.treatment.map((med, i) => (
                <Card key={i}>
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <ShoppingBag className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{med.name}</p>
                      <p className="text-[10px] text-muted-foreground">{med.dosage}</p>
                      <p className="text-sm font-bold text-primary">{"\u20B9"}{med.cost}</p>
                    </div>
                    <Button
                      size="sm"
                      className="gap-1 bg-primary text-primary-foreground"
                      onClick={() => {
                        showToast(`${med.name} added to cart!`)
                      }}
                    >
                      <Plus className="size-3" />
                      {t("Add", "\u091C\u094B\u0921\u093C\u0947\u0902", "\u0C1A\u0C47\u0C30\u0C4D\u0C1A\u0C41")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {/* Additional Products */}
              {[
                { name: "Organic Neem Cake (5kg)", price: 320, desc: "Natural soil amendment" },
                { name: "Bio-Potash Fertilizer (1L)", price: 280, desc: "Improves crop immunity" },
                { name: "Garden Spray Pump (2L)", price: 450, desc: "Manual pressure sprayer" },
              ].map((item, i) => (
                <Card key={`extra-${i}`}>
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                      <ShoppingCart className="size-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                      <p className="text-sm font-bold text-primary">{"\u20B9"}{item.price}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        showToast(`${item.name} added to cart!`)
                      }}
                    >
                      <Plus className="size-3" />
                      {t("Add", "\u091C\u094B\u0921\u093C\u0947\u0902", "\u0C1A\u0C47\u0C30\u0C4D\u0C1A\u0C41")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
