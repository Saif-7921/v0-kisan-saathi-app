"use client"

import {
  ArrowLeft,
  Send,
  Download,
  Share2,
  Printer,
  MapPin,
  Shield,
  CloudSun,
  Thermometer,
  Droplets,
  IndianRupee,
  QrCode,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { farmerProfile } from "@/lib/mock-data"
import type { DiseaseResult } from "@/lib/mock-data"

interface ReportScreenProps {
  result: DiseaseResult
  onBack: () => void
  onFileClaim?: () => void
}

export function ReportScreen(props: ReportScreenProps) {
  const result = props.result
  const onBack = props.onBack
  const onFileClaimHandler = props.onFileClaim
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
              <div><span className="text-muted-foreground">GPS:</span> <span className="font-medium text-foreground">{"17.3850\u00b0 N, 78.4867\u00b0 E"}</span></div>
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
                <span className="mt-1 text-sm font-bold text-foreground">{"28\u00b0C"}</span>
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
              <span className="font-bold text-foreground">{"\u20B9"}{minClaim.toLocaleString("en-IN")} {"\u2013"} {"\u20B9"}{estimatedLoss.toLocaleString("en-IN")}</span>
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
                <p className="font-medium text-foreground">{"17.3850\u00b0 N, 78.4867\u00b0 E"}</p>
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
        <Button size="lg" className="min-h-12 gap-2 bg-primary text-sm text-primary-foreground" onClick={() => { if (onFileClaimHandler) onFileClaimHandler() }}>
          <Send className="size-4" />
          {t("Submit Claim", "दावा जमा करें", "క్లెయిమ్ సమర్పించు")}
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
