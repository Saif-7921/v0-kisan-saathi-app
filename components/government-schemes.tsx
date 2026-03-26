"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Building2,
  CreditCard,
  Shield,
  IndianRupee,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Filter,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "@/lib/language-context"
import { governmentSchemes, type GovernmentScheme } from "@/lib/mock-data"

interface GovernmentSchemesProps {
  onBack: () => void
}

const categoryIcons = {
  loan: CreditCard,
  subsidy: IndianRupee,
  insurance: Shield,
}

const categoryLabels = {
  loan: { en: "Loan", hi: "ऋण", te: "రుణం" },
  subsidy: { en: "Subsidy", hi: "सब्सिडी", te: "సబ్సిడీ" },
  insurance: { en: "Insurance", hi: "बीमा", te: "బీమా" },
}

const states = ["All India", "Telangana", "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu"]

export function GovernmentSchemes({ onBack }: GovernmentSchemesProps) {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)

  const filteredSchemes = governmentSchemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.titleHi.includes(searchQuery)
    const matchesState = selectedState === "all" || scheme.state === selectedState || scheme.state === "All India"
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory
    return matchesSearch && matchesState && matchesCategory
  })

  const getCategoryLabel = (category: "loan" | "subsidy" | "insurance") => {
    const labels = categoryLabels[category]
    if (language === "hi") return labels.hi
    if (language === "te") return labels.te
    return labels.en
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex size-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div>
          <h1 className="font-serif text-xl font-bold">
            {t("Government Schemes", "सरकारी योजनाएं", "ప్రభుత్వ పథకాలు")}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t("Find schemes for farmers", "किसानों के लिए योजनाएं खोजें", "రైతుల కోసం పథకాలు కనుగొనండి")}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 bg-primary/10">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-primary">{governmentSchemes.length}</p>
            <p className="text-[10px] text-muted-foreground">{t("Total Schemes", "कुल योजनाएं", "మొత్తం పథకాలు")}</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-secondary/10">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-secondary-foreground">
              {governmentSchemes.filter((s) => s.category === "subsidy").length}
            </p>
            <p className="text-[10px] text-muted-foreground">{t("Subsidies", "सब्सिडी", "సబ్సిడీలు")}</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-accent/10">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-accent-foreground">
              {governmentSchemes.filter((s) => s.category === "loan").length}
            </p>
            <p className="text-[10px] text-muted-foreground">{t("Loans", "ऋण", "రుణాలు")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("Search schemes...", "योजनाएं खोजें...", "పథకాలు వెతకండి...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="flex-1">
              <Building2 className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder={t("State", "राज्य", "రాష్ట్రం")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All States", "सभी राज्य", "అన్ని రాష్ట్రాలు")}</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1">
              <Filter className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder={t("Category", "श्रेणी", "వర్గం")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Types", "सभी प्रकार", "అన్ని రకాలు")}</SelectItem>
              <SelectItem value="loan">{t("Loans", "ऋण", "రుణాలు")}</SelectItem>
              <SelectItem value="subsidy">{t("Subsidies", "सब्सिडी", "సబ్సిడీలు")}</SelectItem>
              <SelectItem value="insurance">{t("Insurance", "बीमा", "బీమా")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Schemes List */}
      <div className="flex flex-col gap-3">
        {filteredSchemes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Building2 className="mb-2 size-10 text-muted-foreground" />
              <p className="font-medium">{t("No schemes found", "कोई योजना नहीं मिली", "పథకాలు కనుగొనబడలేదు")}</p>
              <p className="text-sm text-muted-foreground">
                {t("Try adjusting your filters", "फ़िल्टर बदलकर देखें", "ఫిల్టర్‌లను మార్చి చూడండి")}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredSchemes.map((scheme) => {
            const Icon = categoryIcons[scheme.category]
            const isExpanded = expandedScheme === scheme.id

            return (
              <Card key={scheme.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                    className="flex w-full items-start gap-3 p-4 text-left"
                  >
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                        scheme.category === "loan"
                          ? "bg-primary/15"
                          : scheme.category === "subsidy"
                          ? "bg-secondary/20"
                          : "bg-accent/20"
                      }`}
                    >
                      <Icon
                        className={`size-6 ${
                          scheme.category === "loan"
                            ? "text-primary"
                            : scheme.category === "subsidy"
                            ? "text-secondary-foreground"
                            : "text-accent-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <h3 className="font-bold leading-tight">
                          {language === "hi" ? scheme.titleHi : scheme.title}
                        </h3>
                        <ChevronDown
                          className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {getCategoryLabel(scheme.category)}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {scheme.state}
                        </Badge>
                        {scheme.amount && (
                          <Badge className="bg-primary/15 text-[10px] text-primary hover:bg-primary/20">
                            {scheme.amount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        <span>
                          {t("Deadline:", "समय सीमा:", "గడువు:")} {scheme.deadline}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-border bg-muted/30 p-4">
                      {/* Eligibility */}
                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-bold">
                          {t("Eligibility", "पात्रता", "అర్హత")}
                        </h4>
                        <ul className="space-y-1.5">
                          {scheme.eligibility.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="mb-4">
                        <h4 className="mb-2 text-sm font-bold">
                          {t("Benefits", "लाभ", "ప్రయోజనాలు")}
                        </h4>
                        <ul className="space-y-1.5">
                          {scheme.benefits.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <IndianRupee className="mt-0.5 size-4 shrink-0 text-secondary-foreground" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Apply Button */}
                      <Button className="w-full gap-2" asChild>
                        <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer">
                          {t("Apply Now", "अभी आवेदन करें", "ఇప్పుడు దరఖాస్తు చేయండి")}
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
