"use client"

import { Button } from "@/components/ui/button"
import { Send, Download, Share2, Printer } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useToastContext } from "@/lib/toast-context"

interface ReportActionsProps {
  onSubmitClaim?: () => void
  reportId?: string
}

export function ReportActions({ onSubmitClaim, reportId = "KS-2024-XXXXXX" }: ReportActionsProps) {
  const { t } = useLanguage()
  const { showToast } = useToastContext()

  const handlePDF = () => {
    window.print()
    showToast("Print dialog opened for PDF download")
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`My KisanSaathi Claim Report ${reportId}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="sticky bottom-20 grid grid-cols-2 gap-2 bg-background/95 py-3 backdrop-blur-sm print:hidden md:grid-cols-4">
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
        {t("Submit Claim", "\u0926\u093E\u0935\u093E \u091C\u092E\u093E \u0915\u0930\u0947\u0902", "\u0C15\u0C4D\u0C32\u0C46\u0C2F\u0C3F\u0C2E\u0C4D \u0C38\u0C2E\u0C30\u0C4D\u0C2A\u0C3F\u0C02\u0C1A\u0C41")}
      </Button>
      <Button size="lg" variant="outline" className="min-h-12 gap-2 text-sm" onClick={handlePDF}>
        <Download className="size-4" />
        {t("PDF", "PDF", "PDF")}
      </Button>
      <Button size="lg" variant="outline" className="min-h-12 gap-2 text-sm" onClick={handleWhatsApp}>
        <Share2 className="size-4" />
        {t("WhatsApp", "WhatsApp", "WhatsApp")}
      </Button>
      <Button size="lg" variant="outline" className="min-h-12 gap-2 text-sm" onClick={handlePrint}>
        <Printer className="size-4" />
        {t("Print", "\u092A\u094D\u0930\u093F\u0902\u091F", "\u0C2A\u0C4D\u0C30\u0C3F\u0C02\u0C1F\u0C4D")}
      </Button>
    </div>
  )
}
