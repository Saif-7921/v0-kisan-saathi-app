"use client"

import { useState, useEffect } from "react"
import { Upload, ImageIcon, Brain, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

interface ClaimStep3Props {
  claimData: {
    aiScore: number
    damagePct: number
    severity: string
    images: string[]
  }
  updateClaimData: (data: Partial<{
    aiScore: number
    damagePct: number
    severity: string
    images: string[]
  }>) => void
}

export function ClaimStep3AIAnalysis({ claimData, updateClaimData }: ClaimStep3Props) {
  const { t } = useLanguage()
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(claimData.aiScore > 0)
  const [uploadedCount, setUploadedCount] = useState(claimData.images.length)

  const simulateUpload = () => {
    setUploadedCount((c) => Math.min(c + 3, 6))
    setAnalyzing(true)
    setProgress(0)
  }

  useEffect(() => {
    if (!analyzing) return
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return p + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [analyzing])

  useEffect(() => {
    if (analysisComplete && claimData.aiScore === 0) {
      updateClaimData({
        aiScore: 87,
        damagePct: 60,
        severity: "High",
        images: ["img1", "img2", "img3", "img4", "img5", "img6"],
      })
    }
  }, [analysisComplete, claimData.aiScore, updateClaimData])

  const severityColor = {
    Low: "bg-accent/20 text-accent-foreground",
    Medium: "bg-secondary/30 text-secondary-foreground",
    High: "bg-destructive/15 text-destructive",
    Critical: "bg-destructive text-card",
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Area */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 p-6">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/15">
            <Upload className="size-6 text-primary" />
          </div>
          <p className="text-center text-sm font-semibold">
            {t("Upload Crop Photos", "फसल की फोटो अपलोड करें", "పంట ఫోటోలు అప్‌లోడ్")}
          </p>
          <p className="text-center text-xs text-muted-foreground">
            {t("Camera or Gallery - up to 10 photos", "कैमरा या गैलरी - 10 फोटो तक", "కెమెరా లేదా గ్యాలరీ - 10 ఫోటోల వరకు")}
          </p>
          <button
            onClick={simulateUpload}
            className="min-h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Select Photos", "फोटो चुनें", "ఫోటోలు ఎంచుకోండి")}
          </button>
          {uploadedCount > 0 && (
            <div className="flex gap-2">
              {Array.from({ length: uploadedCount }).map((_, i) => (
                <div
                  key={i}
                  className="flex size-12 items-center justify-center rounded-lg bg-muted"
                >
                  <ImageIcon className="size-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analyzing Progress */}
      {analyzing && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-3 p-4">
            <div className="flex items-center gap-2">
              <Brain className="size-5 animate-pulse text-primary" />
              <span className="text-sm font-bold text-primary">
                {t("AI Analyzing...", "AI विश्लेषण...", "AI విశ్లేషణ...")}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{progress}% complete</p>
          </CardContent>
        </Card>
      )}

      {/* AI Results */}
      {analysisComplete && (
        <Card className="border-primary/30">
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <Brain className="size-5 text-primary" />
              <span className="font-serif text-base font-bold">
                {t("AI Analysis Results", "AI विश्लेषण परिणाम", "AI విశ్లేషణ ఫలితాలు")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Damage Type */}
              <div className="rounded-lg bg-muted p-3">
                <p className="text-[10px] text-muted-foreground">
                  {t("Damage Detected", "नुकसान प्रकार", "నష్టం రకం")}
                </p>
                <p className="text-sm font-bold">Flood</p>
                <p className="text-[10px] text-primary">94% confidence</p>
              </div>

              {/* Crop Affected */}
              <div className="rounded-lg bg-muted p-3">
                <p className="text-[10px] text-muted-foreground">
                  {t("Crop Affected", "प्रभावित फसल", "ప్రభావిత పంట")}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">60%</span>
                  <div className="relative size-10">
                    <svg className="size-10 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        className="stroke-muted"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        className="stroke-destructive"
                        strokeWidth="3"
                        strokeDasharray="60, 100"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Severity */}
              <div className="rounded-lg bg-muted p-3">
                <p className="text-[10px] text-muted-foreground">
                  {t("Severity Level", "गंभीरता स्तर", "తీవ్రత స్థాయి")}
                </p>
                <Badge className={cn("mt-1", severityColor["High"])}>
                  High
                </Badge>
              </div>

              {/* AI Score */}
              <div className="rounded-lg bg-muted p-3">
                <p className="text-[10px] text-muted-foreground">
                  {t("AI Verification Score", "AI सत्यापन स्कोर", "AI ధృవీకరణ స్��ోర్")}
                </p>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="size-4 text-primary" />
                  <span className="text-lg font-bold">87/100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
