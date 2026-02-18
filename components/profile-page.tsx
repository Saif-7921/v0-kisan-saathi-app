"use client"

import { useState } from "react"
import {
  User,
  MapPin,
  Shield,
  FileText,
  Wheat,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Languages,
  Phone,
  Landmark,
  Edit3,
  X,
  Save,
  Loader2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { useToastContext } from "@/lib/toast-context"
import { farmerProfile } from "@/lib/mock-data"

interface ProfilePageProps {
  onLogout?: () => void
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const { t } = useLanguage()
  const { showToast } = useToastContext()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [profileData, setProfileData] = useState({
    name: farmerProfile.name,
    phone: farmerProfile.phone,
    village: farmerProfile.village,
    cropType: farmerProfile.cropType,
  })

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">
          {t("My Profile", "\u092E\u0947\u0930\u0940 \u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932", "\u0C28\u0C3E \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D")}
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
            <p className="font-serif text-xl font-bold">{profileData.name}</p>
            <p className="font-serif text-sm text-muted-foreground">{farmerProfile.nameHindi}</p>
            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span>
                {profileData.village}, {farmerProfile.district}, {farmerProfile.state}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-primary/15 text-primary">
              <Shield className="mr-0.5 size-3" />
              {t("Aadhaar Verified", "\u0906\u0927\u093E\u0930 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924", "\u0C06\u0C27\u0C3E\u0C30\u0C4D \u0C27\u0C43\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F")}
            </Badge>
            <Badge className="bg-primary/15 text-primary">
              <FileText className="mr-0.5 size-3" />
              {t("Land Records Verified", "\u092D\u0942\u092E\u093F \u0930\u093F\u0915\u0949\u0930\u094D\u0921 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924", "\u0C2D\u0C42\u0C2E\u0C3F \u0C30\u0C3F\u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C41\u0C32\u0C41")}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-1 gap-1"
            onClick={() => setShowEditModal(true)}
          >
            <Edit3 className="size-3.5" />
            {t("Edit Profile", "\u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902", "\u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C02\u0C21\u0C3F")}
          </Button>
        </CardContent>
      </Card>

      {/* Crop Details */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Wheat className="size-4 text-primary" />
            <span className="text-sm font-bold">
              {t("Crop Details", "\u092B\u0938\u0932 \u0935\u093F\u0935\u0930\u0923", "\u0C2A\u0C02\u0C1F \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-[10px] text-muted-foreground">Crop Type</p>
              <p className="text-sm font-bold">{profileData.cropType}</p>
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
              {t("Insurance Policy", "\u092C\u0940\u092E\u093E \u092A\u0949\u0932\u093F\u0938\u0940", "\u0C2C\u0C40\u0C2E\u0C3E \u0C2A\u0C3E\u0C32\u0C38\u0C40")}
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
              {t("Bank Account", "\u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E", "\u0C2C\u0C4D\u0C2F\u0C3E\u0C02\u0C15\u0C4D \u0C16\u0C3E\u0C24\u0C3E")}
            </p>
            <p className="text-sm font-bold">{farmerProfile.bankAccount}</p>
          </div>
          <Badge className="bg-primary/15 text-primary text-[10px]">Linked</Badge>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardContent className="flex flex-col divide-y divide-border p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Languages className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t("Language", "\u092D\u093E\u0937\u093E", "\u0C2D\u0C3E\u0C37")}
              </span>
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t("Notifications", "\u0938\u0942\u091A\u0928\u093E\u090F\u0902", "\u0C28\u0C4B\u0C1F\u0C3F\u0C2B\u0C3F\u0C15\u0C47\u0C37\u0C28\u0C4D\u0C32\u0C41")}
              </span>
            </div>
            <Switch defaultChecked />
          </div>

          <button
            className="flex items-center justify-between p-4"
            onClick={() => showToast("Help & Support coming soon!", "info")}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t("Help & Support", "\u092E\u0926\u0926 \u0914\u0930 \u0938\u0939\u093E\u092F\u0924\u093E", "\u0C38\u0C39\u0C3E\u0C2F\u0C02 & \u0C2E\u0C26\u0C4D\u0C26\u0C24\u0C41")}
              </span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>

          <a href="tel:1800-XXX-XXXX" className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium">
                  {t("Voice Helpline", "\u0935\u0949\u0907\u0938 \u0939\u0947\u0932\u094D\u092A\u0932\u093E\u0907\u0928", "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C39\u0C46\u0C32\u0C4D\u0C2A\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D")}
                </span>
                <p className="text-xs text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </a>
        </CardContent>
      </Card>

      {/* Logout */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-destructive/10 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/15"
      >
        <LogOut className="size-4" />
        {t("Logout", "\u0932\u0949\u0917\u0906\u0909\u091F", "\u0C32\u0C3E\u0C17\u0C4D\u0C05\u0C35\u0C41\u0C1F\u0C4D")}
      </button>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowEditModal(false) }}
        >
          <div className="w-full max-w-sm animate-in zoom-in-95 rounded-2xl bg-card p-5 shadow-xl duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">{t("Edit Profile", "\u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902", "\u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C02\u0C21\u0C3F")}</h3>
              <button onClick={() => setShowEditModal(false)} className="rounded-lg p-1 hover:bg-muted">
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input
                  className="mt-1 min-h-11"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Phone</Label>
                <Input
                  className="mt-1 min-h-11"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Village</Label>
                <Input
                  className="mt-1 min-h-11"
                  value={profileData.village}
                  onChange={(e) => setProfileData({ ...profileData, village: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Crop Type</Label>
                <Input
                  className="mt-1 min-h-11"
                  value={profileData.cropType}
                  onChange={(e) => setProfileData({ ...profileData, cropType: e.target.value })}
                />
              </div>
            </div>
            <Button
              className="mt-4 min-h-11 w-full gap-2 bg-primary text-primary-foreground"
              onClick={() => {
                setShowEditModal(false)
                showToast("Profile updated successfully!")
              }}
            >
              <Save className="size-4" />
              {t("Save Changes", "\u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u0938\u0939\u0947\u091C\u0947\u0902", "\u0C2E\u0C3E\u0C30\u0C4D\u0C2A\u0C41\u0C32\u0C41 \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F")}
            </Button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowLogoutConfirm(false) }}
        >
          <div className="w-full max-w-sm animate-in zoom-in-95 rounded-2xl bg-card p-6 shadow-xl duration-200">
            <div className="flex flex-col items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-destructive/15">
                <LogOut className="size-6 text-destructive" />
              </div>
              <h3 className="text-center font-serif text-lg font-bold text-foreground">
                {t("Are you sure you want to logout?", "\u0915\u094D\u092F\u093E \u0906\u092A \u0932\u0949\u0917\u0906\u0909\u091F \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902?", "\u0C2E\u0C40\u0C30\u0C41 \u0C32\u0C3E\u0C17\u0C4D\u0C05\u0C35\u0C41\u0C1F\u0C4D \u0C15\u0C3E\u0C35\u0C3E\u0C32\u0C28\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E?")}
              </h3>
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  {t("Cancel", "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902", "\u0C30\u0C26\u0C4D\u0C26\u0C41")}
                </Button>
                <Button
                  className="flex-1 bg-destructive text-primary-foreground hover:bg-destructive/90"
                  onClick={() => {
                    setShowLogoutConfirm(false)
                    showToast("Logged out successfully")
                    if (onLogout) onLogout()
                  }}
                >
                  {t("Logout", "\u0932\u0949\u0917\u0906\u0909\u091F", "\u0C32\u0C3E\u0C17\u0C4D\u0C05\u0C35\u0C41\u0C1F\u0C4D")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
