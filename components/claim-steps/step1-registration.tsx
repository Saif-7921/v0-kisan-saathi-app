"use client"

import { MapPin, Camera, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { farmerProfile, cropTypes } from "@/lib/mock-data"

export function ClaimStep1Registration() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/15">
              <Camera className="size-6 text-primary" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold">{farmerProfile.name}</p>
              <div className="flex gap-1.5">
                <Badge variant="secondary" className="text-[10px]">
                  <Shield className="mr-0.5 size-2.5" />
                  {t("Aadhaar Verified", "आधार सत्यापित", "ఆధార్ ధృవీకరించబడింది")}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Full Name", "पूरा नाम", "పూర్తి పేరు")}
              </Label>
              <Input
                defaultValue={farmerProfile.name}
                className="mt-1 min-h-12 text-base"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Phone Number", "फ़ोन नंबर", "ఫోన్ నంబర్")}
              </Label>
              <Input
                defaultValue={farmerProfile.phone}
                className="mt-1 min-h-12 text-base"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Aadhaar Number", "आधार नंबर", "ఆధార్ నంబర్")}
              </Label>
              <Input
                defaultValue={farmerProfile.aadhaar}
                className="mt-1 min-h-12 text-base"
                disabled
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Crop Type", "फसल प्रकार", "పంట రకం")}
              </Label>
              <Select defaultValue={farmerProfile.cropType}>
                <SelectTrigger className="mt-1 min-h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">
                  {t("Land Area (acres)", "भूमि क्षेत्र", "భూమి విస్తీర్ణం")}
                </Label>
                <Input
                  defaultValue={farmerProfile.landArea}
                  type="number"
                  className="mt-1 min-h-12 text-base"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">
                  {t("Policy Number", "पॉलिसी नंबर", "పాలసీ నంబర్")}
                </Label>
                <Input
                  defaultValue="PMFBY-78432"
                  className="mt-1 min-h-12 text-base"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Insurance Company", "बीमा कंपनी", "బీమా సంస్థ")}
              </Label>
              <Input
                defaultValue={farmerProfile.insuranceCompany}
                className="mt-1 min-h-12 text-base"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">
                {t("Farm Location", "खेत का स्थान", "వ్యవసాయ స్థానం")}
              </Label>
              <div className="mt-1 flex min-h-12 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm">
                <MapPin className="size-4 text-primary" />
                <span>
                  18.6725° N, 79.3942° E — {farmerProfile.village}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
