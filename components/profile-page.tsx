"use client"

import {
  User,
  MapPin,
  Shield,
  FileText,
  Wheat,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Languages,
  Phone,
  Landmark,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { farmerProfile } from "@/lib/mock-data"

export function ProfilePage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">
          {t("My Profile", "मेरी प्रोफ़ाइल", "నా ప్రొఫైల్")}
        </h1>
        <LanguageToggle />
      </div>

      {/* Profile Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-3 p-5">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/20">
            <User className="size-9 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-serif text-xl font-bold">{farmerProfile.name}</p>
            <p className="text-sm text-muted-foreground font-serif">{farmerProfile.nameHindi}</p>
            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span>
                {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-primary/15 text-primary">
              <Shield className="mr-0.5 size-3" />
              {t("Aadhaar Verified", "आधार सत्यापित", "ఆధార్ ధృవీకరించబడింది")}
            </Badge>
            <Badge className="bg-primary/15 text-primary">
              <FileText className="mr-0.5 size-3" />
              {t("Land Records Verified", "भूमि रिकॉर्ड सत्यापित", "భూమి రికార్డులు")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Crop Details */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Wheat className="size-4 text-primary" />
            <span className="text-sm font-bold">
              {t("Crop Details", "फसल विवरण", "పంట వివరాలు")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-[10px] text-muted-foreground">Crop Type</p>
              <p className="text-sm font-bold">{farmerProfile.cropType}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-[10px] text-muted-foreground">Land Area</p>
              <p className="text-sm font-bold">{farmerProfile.landArea} acres</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            <span className="text-sm font-bold">
              {t("Insurance Policy", "बीमा पॉलिसी", "బీమా పాలసీ")}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-[10px] text-muted-foreground">Policy Number</p>
            <p className="text-sm font-bold">{farmerProfile.insurancePolicyNumber}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {farmerProfile.insuranceCompany}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account */}
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Landmark className="size-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {t("Bank Account", "बैंक खाता", "బ్యాంక్ ఖాతా")}
            </p>
            <p className="text-sm font-bold">{farmerProfile.bankAccount}</p>
          </div>
          <Badge className="bg-primary/15 text-primary text-[10px]">Linked</Badge>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardContent className="flex flex-col divide-y divide-border p-0">
          {/* Language */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Languages className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t("Language", "भाषा", "భాష")}
              </span>
            </div>
            <LanguageToggle />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t("Notifications", "सूचनाएं", "నోటిఫికేషన్లు")}
              </span>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Help & Support */}
          <button className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t("Help & Support", "मदद और सहायता", "సహాయం & మద్దతు")}
              </span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>

          {/* WhatsApp Support */}
          <button className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium">
                  {t("Voice Helpline", "वॉइस हेल्पलाइन", "వాయిస్ హెల్ప్‌లైన్")}
                </span>
                <p className="text-xs text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Logout */}
      <button className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-destructive/10 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/15">
        <LogOut className="size-4" />
        {t("Logout", "लॉगआउट", "లాగ్అవుట్")}
      </button>
    </div>
  )
}
