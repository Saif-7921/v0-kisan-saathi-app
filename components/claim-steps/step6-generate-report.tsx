"use client"

import { useState } from "react"
import {
  FileText,
  MapPin,
  Brain,
  ShieldCheck,
  Download,
  Share2,
  Send,
  CheckCircle2,
  Copy,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClaimStatusPipeline } from "@/components/claim-status-pipeline"
import { useLanguage } from "@/lib/language-context"
import { farmerProfile } from "@/lib/mock-data"

interface ClaimStep6Props {
  claimData: {
    aiScore: number
    damagePct: number
    severity: string
    estimatedLoss: number
    weatherVerified: boolean
    damageType: string
  }
}

export function ClaimStep6GenerateReport({ claimData }: ClaimStep6Props) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const claimRef = "CLM-2025-" + String(Math.floor(Math.random() * 9000) + 1000)

  return (
    <div className="flex flex-col gap-4">
      {/* Report Preview */}
      <Card className="border-primary/30">
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            <span className="font-serif text-base font-bold">
              {t("Claim Report Preview", "दावा रिपोर्ट प्रीव्यू", "క్లెయిమ్ రిపోర్ట్ ప్రీవ్యూ")}
            </span>
          </div>

          {/* Farmer Details */}
          <div className="rounded-lg bg-muted p-3">
            <p className="text-[10px] font-medium text-muted-foreground uppercase">
              {t("Farmer Details", "किसान विवरण", "రైతు వివరాలు")}
            </p>
            <p className="mt-1 text-sm font-bold">{farmerProfile.name}</p>
            <p className="text-xs text-muted-foreground">
              {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}
            </p>
            <p className="text-xs text-muted-foreground">
              Policy: {farmerProfile.insurancePolicyNumber}
            </p>
          </div>

          {/* GPS & Map */}
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <MapPin className="size-4 text-primary" />
            <div>
              <p className="text-[10px] font-medium text-muted-foreground">GPS COORDINATES</p>
              <p className="text-xs font-semibold">{"18.6725° N, 79.3942° E"}</p>
            </div>
          </div>

          {/* Damage Summary */}
          <div className="rounded-lg bg-destructive/10 p-3">
            <p className="text-[10px] font-medium text-muted-foreground uppercase">
              {t("Damage Summary", "नुकसान सारांश", "నష్టం సారాంశం")}
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              <Badge className="bg-destructive/15 text-destructive">
                {claimData.damageType || "Flood"}
              </Badge>
              <Badge className="bg-destructive/15 text-destructive">
                {claimData.severity || "High"} Severity
              </Badge>
              <Badge className="bg-destructive/15 text-destructive">
                {claimData.damagePct || 60}% Affected
              </Badge>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-primary/10 p-3">
              <Brain className="size-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">AI Score</p>
                <p className="text-sm font-bold text-primary">{claimData.aiScore || 87}/100</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-primary/10 p-3">
              <ShieldCheck className="size-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">Weather</p>
                <p className="text-sm font-bold text-primary">Verified</p>
              </div>
            </div>
          </div>

          {/* Loss Amount */}
          <div className="rounded-xl bg-secondary/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              {t("Estimated Loss", "अनुमानित नुकसान", "అంచనా నష్టం")}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {"₹"}{(claimData.estimatedLoss || 171600).toLocaleString("en-IN")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!submitted ? (
        <div className="flex flex-col gap-2">
          <Button
            size="lg"
            className="min-h-14 bg-primary text-base text-primary-foreground hover:bg-primary/90"
            onClick={() => setSubmitted(true)}
          >
            <Send className="mr-2 size-4" />
            {t("Submit Claim Digitally", "दावा डिजिटल रूप से जमा करें", "క్లెయిమ్ డిజిటల్‌గా సమర్పించండి")}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="lg" className="min-h-12 flex-1 text-sm">
              <Download className="mr-2 size-4" />
              {t("PDF Report", "PDF रिपोर्ट", "PDF నివేదిక")}
            </Button>
            <Button variant="outline" size="lg" className="min-h-12 flex-1 text-sm">
              <Share2 className="mr-2 size-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      ) : (
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex flex-col items-center gap-3 p-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle2 className="size-7 text-primary" />
            </div>
            <p className="font-serif text-lg font-bold text-primary">
              {t("Claim Submitted!", "दावा जमा हो गया!", "క్లెయిమ్ సమర్పించబడింది!")}
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
              <span className="text-xs text-muted-foreground">Reference:</span>
              <span className="text-sm font-bold">{claimRef}</span>
              <button className="text-primary" aria-label="Copy reference number">
                <Copy className="size-3.5" />
              </button>
            </div>

            <div className="mt-2 w-full">
              <p className="mb-2 text-center text-xs text-muted-foreground">
                {t("Claim Status", "दावा स्थिति", "క్లెయిమ్ స్థితి")}
              </p>
              <ClaimStatusPipeline currentStep={1} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
