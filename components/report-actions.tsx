"use client"

import { Button } from "@/components/ui/button"
import { Send, Download, Share2, Printer } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface ReportActionsProps {
  onSubmitClaim?: () => void
}

export function ReportActions({ onSubmitClaim }: ReportActionsProps) {
  const { t } = useLanguage()

  return (
    <div className="sticky bottom-20 grid grid-cols-2 gap-2 bg-background/95 py-3 backdrop-blur-sm md:grid-cols-4">
      <Button
        size="lg"
        className="min-h-12 gap-2 bg-primary text-sm text-primary-foreground"
        onClick={() => {
          if (onSubmitClaim) {
            onSubmitClaim()
          }
        }}
      >
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
        {t("Print", "ప్రింట్", "ప్రింట్")}
      </Button>
    </div>
  )
}
