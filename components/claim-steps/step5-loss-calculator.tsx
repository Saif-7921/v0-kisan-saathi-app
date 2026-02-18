"use client"

import { useState, useEffect, useRef } from "react"
import { IndianRupee, TrendingDown, Wheat } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { farmerProfile } from "@/lib/mock-data"

interface ClaimStep5Props {
  claimData: { estimatedLoss: number; damagePct: number }
  updateClaimData: (data: Partial<{ estimatedLoss: number }>) => void
}

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count.toLocaleString("en-IN")}</span>
}

export function ClaimStep5LossCalculator({ claimData, updateClaimData }: ClaimStep5Props) {
  const { t } = useLanguage()
  const [marketPrice, setMarketPrice] = useState(2200)
  const damagePct = claimData.damagePct || 60

  const expectedYield = farmerProfile.landArea * 25 // 25 quintals per acre for rice
  const actualYield = expectedYield * ((100 - damagePct) / 100)
  const expectedIncome = expectedYield * marketPrice
  const actualIncome = actualYield * marketPrice
  const loss = expectedIncome - actualIncome
  const compensationLow = Math.round(loss * 0.85)
  const compensationHigh = loss

  const prevLossRef = useRef(loss)
  useEffect(() => {
    if (prevLossRef.current !== loss) {
      prevLossRef.current = loss
      updateClaimData({ estimatedLoss: loss })
    }
  }, [loss, updateClaimData])

  return (
    <div className="flex flex-col gap-4">
      {/* Input Fields */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wheat className="size-5 text-primary" />
            <span className="font-serif text-base font-bold">
              {t("Crop Details", "फसल विवरण", "పంట వివరాలు")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Crop Type", "फसल", "పంట")}
              </Label>
              <Input
                value={farmerProfile.cropType}
                disabled
                className="mt-1 min-h-12 text-base"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Land Area (acres)", "क्षेत्र (एकड़)", "విస్తీర్ణం (ఎకరాలు)")}
              </Label>
              <Input
                value={farmerProfile.landArea}
                disabled
                className="mt-1 min-h-12 text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Season</Label>
              <Input value="Kharif 2025" disabled className="mt-1 min-h-12 text-base" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Market Price/quintal", "बाजार मूल्य", "మార్కెట్ ధర")}
              </Label>
              <Input
                type="number"
                value={marketPrice}
                onChange={(e) => setMarketPrice(Number(e.target.value))}
                className="mt-1 min-h-12 text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculated Output */}
      <Card className="border-secondary/30">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-[10px] text-muted-foreground">
                {t("Expected Yield", "अपेक्षित उपज", "ఆశించిన దిగుబడి")}
              </p>
              <p className="text-lg font-bold">{expectedYield} qtl</p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-[10px] text-muted-foreground">
                {t("Actual Yield (est.)", "वास्तविक उपज", "వాస్తవ దిగుబడి")}
              </p>
              <p className="text-lg font-bold text-destructive">{actualYield.toFixed(1)} qtl</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-[10px] text-muted-foreground">
                {t("Expected Income", "अपेक्षित आय", "ఆశించిన ఆదాయం")}
              </p>
              <p className="text-sm font-bold">
                {"₹"}{expectedIncome.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-[10px] text-muted-foreground">
                {t("Actual Income (est.)", "वास्तविक आय", "వాస్తవ ఆదాయం")}
              </p>
              <p className="text-sm font-bold text-destructive">
                {"₹"}{actualIncome.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Estimated Loss - Highlighted */}
          <div className="flex items-center gap-3 rounded-xl bg-destructive/10 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-destructive/20">
              <TrendingDown className="size-5 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("Estimated Loss", "अनुमानित नुकसान", "అంచనా నష్టం")}
              </p>
              <p className="text-2xl font-bold text-destructive">
                {"₹"}<AnimatedCounter target={loss} />
              </p>
            </div>
          </div>

          {/* Compensation Range */}
          <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
              <IndianRupee className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t("Estimated Compensation", "अनुमानित मुआवजा", "అంచనా పరిహారం")}
              </p>
              <p className="text-lg font-bold text-primary">
                {"₹"}{compensationLow.toLocaleString("en-IN")} – {"₹"}{compensationHigh.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
