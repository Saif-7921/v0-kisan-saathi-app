"use client"

import { Waves, Sun, Bug, Wind, Flame, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { VoiceInputButton } from "@/components/voice-input-button"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { useState } from "react"

const damageOptions = [
  { id: "flood", label: "Flood", labelHi: "बाढ़", labelTe: "వరద", Icon: Waves, color: "text-accent" },
  { id: "drought", label: "Drought", labelHi: "सूखा", labelTe: "కరువు", Icon: Sun, color: "text-secondary" },
  { id: "pest", label: "Pest Attack", labelHi: "कीट हमला", labelTe: "తెగులు", Icon: Bug, color: "text-destructive" },
  { id: "storm", label: "Storm", labelHi: "तूफ़ान", labelTe: "తుఫాను", Icon: Wind, color: "text-muted-foreground" },
  { id: "fire", label: "Fire", labelHi: "आग", labelTe: "అగ్ని", Icon: Flame, color: "text-destructive" },
  { id: "other", label: "Other", labelHi: "अन्य", labelTe: "ఇతరం", Icon: HelpCircle, color: "text-muted-foreground" },
]

interface ClaimStep2Props {
  claimData: { damageType: string; damageDate: string; description: string }
  updateClaimData: (data: Partial<{ damageType: string; damageDate: string; description: string }>) => void
}

export function ClaimStep2ReportLoss({ claimData, updateClaimData }: ClaimStep2Props) {
  const { t } = useLanguage()
  const [desc, setDesc] = useState(claimData.description)

  return (
    <div className="flex flex-col gap-4">
      {/* Damage Type Selector */}
      <div>
        <Label className="mb-2 block font-serif text-base font-bold">
          {t("Select Damage Type", "नुकसान प्रकार चुनें", "నష్టం రకం ఎంచుకోండి")}
        </Label>
        <div className="grid grid-cols-3 gap-2.5">
          {damageOptions.map((opt) => {
            const selected = claimData.damageType === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => updateClaimData({ damageType: opt.id })}
                className={cn(
                  "flex min-h-[90px] flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all active:scale-[0.97]",
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <opt.Icon className={cn("size-7", selected ? "text-primary" : opt.color)} />
                <span className={cn("text-xs font-semibold", selected ? "text-primary" : "text-foreground")}>
                  {t(opt.label, opt.labelHi, opt.labelTe)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Date of Damage */}
      <div>
        <Label className="text-xs text-muted-foreground">
          {t("Date of Damage", "नुकसान की तारीख", "నష్టం తేదీ")}
        </Label>
        <Input
          type="date"
          value={claimData.damageDate}
          onChange={(e) => updateClaimData({ damageDate: e.target.value })}
          className="mt-1 min-h-12 text-base"
        />
      </div>

      {/* Description with Voice */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <Label className="text-xs text-muted-foreground">
            {t("Describe the Damage", "नुकसान का वर्णन", "నష్టం వివరణ")}
          </Label>
          <Textarea
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value)
              updateClaimData({ description: e.target.value })
            }}
            placeholder={t(
              "Describe what happened to your crop...",
              "अपनी फसल को क्या हुआ बताएं...",
              "మీ పంటకు ఏమి జరిగిందో వివరించండి..."
            )}
            className="min-h-24 text-base"
          />
          <div className="flex items-center justify-center border-t border-border pt-3">
            <VoiceInputButton
              onTranscript={(text) => {
                setDesc(text)
                updateClaimData({ description: text })
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
