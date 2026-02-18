"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StepProgressBar } from "@/components/step-progress-bar"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { ClaimStep1Registration } from "@/components/claim-steps/step1-registration"
import { ClaimStep2ReportLoss } from "@/components/claim-steps/step2-report-loss"
import { ClaimStep3AIAnalysis } from "@/components/claim-steps/step3-ai-analysis"
import { ClaimStep4WeatherValidation } from "@/components/claim-steps/step4-weather-validation"
import { ClaimStep5LossCalculator } from "@/components/claim-steps/step5-loss-calculator"
import { ClaimStep6GenerateReport } from "@/components/claim-steps/step6-generate-report"

const stepNames = [
  "Register",
  "Report",
  "AI Analysis",
  "Weather",
  "Calculator",
  "Submit",
]

export function CropLossClaim() {
  const [currentStep, setCurrentStep] = useState(0)
  const [claimData, setClaimData] = useState({
    damageType: "",
    damageDate: "",
    description: "",
    images: [] as string[],
    aiScore: 0,
    damagePct: 0,
    severity: "",
    weatherVerified: false,
    estimatedLoss: 0,
  })
  const { t } = useLanguage()

  const updateClaimData = useCallback((data: Partial<typeof claimData>) => {
    setClaimData((prev) => ({ ...prev, ...data }))
  }, [])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ClaimStep1Registration />
      case 1:
        return (
          <ClaimStep2ReportLoss
            claimData={claimData}
            updateClaimData={updateClaimData}
          />
        )
      case 2:
        return (
          <ClaimStep3AIAnalysis
            claimData={claimData}
            updateClaimData={updateClaimData}
          />
        )
      case 3:
        return (
          <ClaimStep4WeatherValidation
            claimData={claimData}
            updateClaimData={updateClaimData}
          />
        )
      case 4:
        return (
          <ClaimStep5LossCalculator
            claimData={claimData}
            updateClaimData={updateClaimData}
          />
        )
      case 5:
        return <ClaimStep6GenerateReport claimData={claimData} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">
          {t("Crop Loss Claim", "फसल नुकसान दावा", "పంట నష్టం క్లెయిమ్")}
        </h1>
        <LanguageToggle />
      </div>

      {/* Step Progress */}
      <StepProgressBar steps={stepNames} currentStep={currentStep} />

      {/* Step Content */}
      <div className="min-h-[400px]">{renderStep()}</div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentStep > 0 && (
          <Button
            variant="outline"
            size="lg"
            className="min-h-14 flex-1 text-base"
            onClick={() => setCurrentStep((s) => s - 1)}
          >
            <ArrowLeft className="mr-2 size-4" />
            {t("Back", "पीछे", "వెనక్కి")}
          </Button>
        )}
        {currentStep < 5 && (
          <Button
            size="lg"
            className="min-h-14 flex-1 bg-primary text-base text-primary-foreground hover:bg-primary/90"
            onClick={() => setCurrentStep((s) => s + 1)}
          >
            {t("Next", "आगे", "తదుపరి")}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
