"use client"

import { useState, useRef } from "react"
import {
  Search,
  MapPin,
  Star,
  Phone,
  Calendar,
  Truck,
  IndianRupee,
  Filter,
  ArrowLeft,
  Plus,
  Clock,
  CheckCircle2,
  Tractor,
  X,
  Loader2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { useToastContext } from "@/lib/toast-context"
import { equipmentListings, equipmentTypes } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type View = "list" | "detail" | "add"

export function EquipmentMarketplace() {
  const { t } = useLanguage()
  const { showToast } = useToastContext()
  const [view, setView] = useState<View>("list")
  const [search, setSearch] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("distance")
  const [selectedEquipment, setSelectedEquipment] = useState<(typeof equipmentListings)[0] | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = equipmentListings.filter((eq) => {
    const matchesSearch =
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.owner.toLowerCase().includes(search.toLowerCase())
    const matchesType = selectedType === "All" || eq.type === selectedType
    return matchesSearch && matchesType
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance
    if (sortBy === "price") return a.pricePerDay - b.pricePerDay
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  if (view === "detail" && selectedEquipment) {
    return (
      <EquipmentDetail
        equipment={selectedEquipment}
        onBack={() => setView("list")}
        onBook={() => setShowBookingModal(true)}
      />
    )
  }

  if (view === "add") {
    return <ListEquipmentForm onBack={() => setView("list")} />
  }

  const conditionColor = (c: string) =>
    c === "Good" ? "bg-primary/15 text-primary" : c === "Fair" ? "bg-secondary/20 text-secondary-foreground" : "bg-destructive/15 text-destructive"
  const availColor = (l: string) =>
    l === "Available Now" ? "bg-primary/15 text-primary" : l === "Booked" ? "bg-destructive/15 text-destructive" : "bg-secondary/20 text-secondary-foreground"

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">
          {t("Equipment Marketplace", "\u0909\u092A\u0915\u0930\u0923 \u092C\u093E\u091C\u093C\u093E\u0930", "\u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C3E\u0C32 \u0C2E\u0C3E\u0C30\u0C4D\u0C15\u0C46\u0C1F\u0C4D")}
        </h1>
        <LanguageToggle />
      </div>

      {/* Search & Sort */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("Find equipment near you", "\u0909\u092A\u0915\u0930\u0923 \u0916\u094B\u091C\u0947\u0902", "\u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C3E\u0C32\u0C41 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C02\u0C21\u0C3F")}
            className="min-h-12 pl-9 text-base"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="min-h-12 w-28">
            <Filter className="mr-1 size-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {equipmentTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors",
              selectedType === type
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* List My Equipment button */}
      <Button
        variant="outline"
        className="min-h-12 border-dashed border-primary text-primary"
        onClick={() => setView("add")}
      >
        <Plus className="mr-2 size-4" />
        {t("List My Equipment", "\u0905\u092A\u0928\u093E \u0909\u092A\u0915\u0930\u0923 \u091C\u094B\u0921\u093C\u0947\u0902", "\u0C28\u0C3E \u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C02 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E")}
      </Button>

      {/* Equipment Cards with Images */}
      <div className="flex flex-col gap-3">
        {sorted.map((eq) => (
          <button
            key={eq.id}
            onClick={() => {
              setSelectedEquipment(eq)
              setView("detail")
            }}
            className="text-left"
          >
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
              {/* Image Section */}
              <div className="relative h-40 w-full overflow-hidden md:h-48">
                <img
                  src={eq.image}
                  alt={eq.name}
                  className="size-full object-cover"
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      parent.classList.add("bg-gradient-to-br", "from-primary/20", "to-primary/5")
                      const fallback = document.createElement("div")
                      fallback.className = "absolute inset-0 flex items-center justify-center"
                      fallback.innerHTML = '<span class="text-4xl">🚜</span>'
                      parent.appendChild(fallback)
                    }
                  }}
                />
                {/* Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                {/* Availability badge top-left */}
                <Badge className={cn("absolute left-2 top-2 text-[10px]", availColor(eq.availabilityLabel))}>
                  {eq.availabilityLabel}
                </Badge>
                {/* Condition badge top-right */}
                <Badge className={cn("absolute right-2 top-2 text-[10px]", conditionColor(eq.condition))}>
                  {eq.condition === "Good" ? "Good" : eq.condition === "Fair" ? "Fair" : "Needs Service"}
                </Badge>
                {/* Owner avatar bottom-left */}
                <div className="absolute bottom-2 left-2 flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary/80">
                  <span className="text-xs font-bold text-primary-foreground">{eq.owner[0]}</span>
                </div>
                {/* Distance bottom-right */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-card/90 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
                  <MapPin className="size-3" />
                  {eq.distance} km
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-tight">{eq.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {eq.owner} - {eq.village}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-secondary-foreground">
                    <Star className="size-3 fill-secondary text-secondary" />
                    {eq.rating} ({eq.reviews})
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">
                    {"\u20B9"}{eq.pricePerDay}/day
                  </span>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedEquipment && (
        <BookingModal
          equipment={selectedEquipment}
          onClose={() => setShowBookingModal(false)}
          onConfirm={() => {
            setShowBookingModal(false)
            showToast("Booking confirmed! Owner will contact you shortly.")
          }}
        />
      )}
    </div>
  )
}

// ---- Booking Modal ----
function BookingModal({
  equipment,
  onClose,
  onConfirm,
}: {
  equipment: (typeof equipmentListings)[0]
  onClose: () => void
  onConfirm: () => void
}) {
  const { t } = useLanguage()
  const [duration, setDuration] = useState("1")
  const [durationType, setDurationType] = useState<"hours" | "days">("days")
  const [delivery, setDelivery] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const basePrice = durationType === "days"
    ? equipment.pricePerDay * Number(duration)
    : equipment.pricePerHour * Number(duration)
  const deliveryCost = delivery && equipment.deliveryAvailable ? equipment.deliveryCost : 0
  const total = basePrice + deliveryCost

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      onConfirm()
    }, 1500)
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-sm animate-in zoom-in-95 rounded-2xl bg-card p-5 shadow-xl duration-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold">{t("Book Equipment", "\u0909\u092A\u0915\u0930\u0923 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902", "\u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C02 \u0C2C\u0C41\u0C15\u0C4D")}</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>

        <p className="mb-3 text-sm font-medium text-foreground">{equipment.name}</p>

        {/* Date */}
        <div className="mb-3">
          <Label className="text-xs text-muted-foreground">{t("Booking Date", "\u092C\u0941\u0915\u093F\u0902\u0917 \u0924\u093E\u0930\u0940\u0916", "\u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D \u0C24\u0C47\u0C26\u0C40")}</Label>
          <Input type="date" className="mt-1 min-h-11" defaultValue={new Date().toISOString().split("T")[0]} />
        </div>

        {/* Duration */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">{t("Duration", "\u0905\u0935\u0927\u093F", "\u0C35\u0C4D\u0C2F\u0C35\u0C27\u0C3F")}</Label>
            <Input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value || "1")}
              className="mt-1 min-h-11"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">{t("Type", "\u092A\u094D\u0930\u0915\u093E\u0930", "\u0C30\u0C15\u0C02")}</Label>
            <Select value={durationType} onValueChange={(v) => setDurationType(v as "hours" | "days")}>
              <SelectTrigger className="mt-1 min-h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Delivery Toggle */}
        {equipment.deliveryAvailable && (
          <button
            onClick={() => setDelivery(!delivery)}
            className={cn(
              "mb-3 flex w-full items-center justify-between rounded-lg border p-3 transition-colors",
              delivery ? "border-primary bg-primary/5" : "border-border"
            )}
          >
            <div className="flex items-center gap-2 text-sm">
              <Truck className="size-4 text-primary" />
              <span>{t("Add Delivery", "\u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u091C\u094B\u0921\u093C\u0947\u0902", "\u0C21\u0C46\u0C32\u0C3F\u0C35\u0C30\u0C40 \u0C1A\u0C47\u0C30\u0C4D\u0C1A\u0C02\u0C21\u0C3F")} (+{"\u20B9"}{equipment.deliveryCost})</span>
            </div>
            <div className={cn("size-5 rounded-full border-2", delivery ? "border-primary bg-primary" : "border-muted-foreground")} />
          </button>
        )}

        {/* Price Summary */}
        <Card className="mb-4 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col gap-1 p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Base ({duration} {durationType})</span>
              <span>{"\u20B9"}{basePrice.toLocaleString("en-IN")}</span>
            </div>
            {delivery && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Delivery</span>
                <span>{"\u20B9"}{deliveryCost}</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-border pt-1 text-sm font-bold text-foreground">
              <span>{t("Total", "\u0915\u0941\u0932", "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02")}</span>
              <span className="text-primary">{"\u20B9"}{total.toLocaleString("en-IN")}</span>
            </div>
          </CardContent>
        </Card>

        <Button
          className="min-h-12 w-full bg-primary text-primary-foreground"
          onClick={handleConfirm}
          disabled={confirming}
        >
          {confirming ? (
            <><Loader2 className="mr-2 size-4 animate-spin" /> {t("Confirming...", "\u092A\u0941\u0937\u094D\u091F\u093F \u0939\u094B \u0930\u0939\u0940...", "\u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F...")}</>
          ) : (
            <>{t("Confirm Booking", "\u092C\u0941\u0915\u093F\u0902\u0917 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902", "\u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F")}</>
          )}
        </Button>
      </div>
    </div>
  )
}

// ---- Equipment Detail View ----
function EquipmentDetail({
  equipment,
  onBack,
  onBook,
}: {
  equipment: (typeof equipmentListings)[0]
  onBack: () => void
  onBook: () => void
}) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 pb-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("Back to listings", "\u0938\u0942\u091A\u0940 \u092A\u0930 \u0935\u093E\u092A\u0938", "\u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E\u0C15\u0C41 \u0C24\u0C3F\u0C30\u0C3F\u0C17\u0C3F")}
      </button>

      {/* Photo */}
      <div className="relative h-48 overflow-hidden rounded-xl md:h-56">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="size-full object-cover"
          crossOrigin="anonymous"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = "none"
          }}
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }} />
      </div>

      <div>
        <h2 className="font-serif text-xl font-bold">{equipment.name}</h2>
        <p className="text-sm text-muted-foreground">
          {equipment.owner} - {equipment.village}
        </p>
      </div>

      {/* Specs */}
      <Card>
        <CardContent className="grid grid-cols-2 gap-3 p-4">
          <div>
            <p className="text-[10px] text-muted-foreground">Model</p>
            <p className="text-sm font-semibold">{equipment.model}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Year</p>
            <p className="text-sm font-semibold">{equipment.year}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Capacity</p>
            <p className="text-sm font-semibold">{equipment.capacity}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Fuel Type</p>
            <p className="text-sm font-semibold">{equipment.fuelType}</p>
          </div>
        </CardContent>
      </Card>

      {/* Owner */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/15">
              <span className="text-sm font-bold text-primary">
                {equipment.owner[0]}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold">{equipment.owner}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3 fill-secondary text-secondary" />
                {equipment.rating} ({equipment.reviews} reviews)
              </div>
            </div>
          </div>
          <a href={`tel:${equipment.phone}`}>
            <Button size="sm" variant="outline" className="min-h-10 gap-1">
              <Phone className="size-3.5" />
              Call
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardContent className="flex flex-col gap-2 p-4">
          <p className="text-xs font-medium text-muted-foreground">PRICING</p>
          <div className="flex gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-primary/10 p-3">
              <Clock className="size-4 text-primary" />
              <div>
                <p className="text-lg font-bold text-primary">{"\u20B9"}{equipment.pricePerHour}</p>
                <p className="text-[10px] text-muted-foreground">per hour</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-secondary/20 p-3">
              <Calendar className="size-4 text-secondary-foreground" />
              <div>
                <p className="text-lg font-bold text-secondary-foreground">{"\u20B9"}{equipment.pricePerDay}</p>
                <p className="text-[10px] text-muted-foreground">per day</p>
              </div>
            </div>
          </div>
          {equipment.deliveryAvailable && (
            <div className="flex items-center gap-2 rounded-lg bg-muted p-2 text-xs">
              <Truck className="size-3.5 text-primary" />
              <span>Delivery available (+{"\u20B9"}{equipment.deliveryCost})</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Book Now */}
      <Button
        size="lg"
        className="min-h-14 bg-primary text-base text-primary-foreground hover:bg-primary/90"
        onClick={onBook}
        disabled={!equipment.available}
      >
        <IndianRupee className="mr-1 size-4" />
        {equipment.available
          ? t("Book Now", "\u0905\u092D\u0940 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902", "\u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F")
          : t("Currently Unavailable", "\u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902", "\u0C2A\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C41\u0C24\u0C02 \u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41\u0C32\u0C4B \u0C32\u0C47\u0C26\u0C41")}
      </Button>
    </div>
  )
}

// ---- List Equipment Form ----
function ListEquipmentForm({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage()
  const { showToast } = useToastContext()
  const [submitted, setSubmitted] = useState(false)
  const [eqType, setEqType] = useState("")
  const [brand, setBrand] = useState("")
  const [year, setYear] = useState("")
  const [priceHour, setPriceHour] = useState("")
  const [priceDay, setPriceDay] = useState("")
  const [condition, setCondition] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!eqType) errs.eqType = "Select equipment type"
    if (!brand) errs.brand = "Enter brand/model"
    if (!priceDay) errs.priceDay = "Enter daily price"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setSubmitted(true)
    showToast("Equipment listed successfully!")
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 pb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" />
          {t("Back", "\u0935\u093E\u092A\u0938", "\u0C35\u0C46\u0C28\u0C15\u0C4D\u0C15\u0C3F")}
        </button>
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex flex-col items-center gap-3 p-6">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-serif text-lg font-bold text-primary">
              {t("Equipment Listed!", "\u0909\u092A\u0915\u0930\u0923 \u0938\u0942\u091A\u0940\u092C\u0926\u094D\u0927!", "\u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C02 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F!")}
            </p>
            <Card className="w-full border-secondary/30 bg-secondary/10">
              <CardContent className="p-3 text-center">
                <p className="text-xs text-muted-foreground">Estimated Monthly Earnings</p>
                <p className="text-2xl font-bold text-secondary-foreground">
                  {"\u20B9"}12,000
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" />
        {t("Back", "\u0935\u093E\u092A\u0938", "\u0C35\u0C46\u0C28\u0C15\u0C4D\u0C15\u0C3F")}
      </button>

      <h2 className="font-serif text-xl font-bold">
        {t("List Your Equipment", "\u0905\u092A\u0928\u093E \u0909\u092A\u0915\u0930\u0923 \u091C\u094B\u0921\u093C\u0947\u0902", "\u0C2E\u0C40 \u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C02 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E")}
      </h2>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div>
            <Label className="text-xs text-muted-foreground">Equipment Type</Label>
            <Select value={eqType} onValueChange={setEqType}>
              <SelectTrigger className={cn("mt-1 min-h-12 text-base", errors.eqType && "border-destructive")}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {equipmentTypes.filter((t) => t !== "All").map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eqType && <p className="mt-1 text-xs text-destructive">{errors.eqType}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Brand / Model</Label>
              <Input
                className={cn("mt-1 min-h-12 text-base", errors.brand && "border-destructive")}
                placeholder="e.g. Mahindra 575"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {errors.brand && <p className="mt-1 text-xs text-destructive">{errors.brand}</p>}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Year</Label>
              <Input
                type="number"
                className="mt-1 min-h-12 text-base"
                placeholder="2022"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Price per Hour ({"\u20B9"})</Label>
              <Input
                type="number"
                className="mt-1 min-h-12 text-base"
                placeholder="150"
                value={priceHour}
                onChange={(e) => setPriceHour(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Price per Day ({"\u20B9"})</Label>
              <Input
                type="number"
                className={cn("mt-1 min-h-12 text-base", errors.priceDay && "border-destructive")}
                placeholder="800"
                value={priceDay}
                onChange={(e) => setPriceDay(e.target.value)}
              />
              {errors.priceDay && <p className="mt-1 text-xs text-destructive">{errors.priceDay}</p>}
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="mt-1 min-h-12 text-base">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <MapPin className="size-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Location auto-detected: Peddapalli
            </span>
          </div>

          {/* Earnings Estimator */}
          <Card className="border-secondary/30 bg-secondary/10">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">
                {t("You can earn up to", "\u0906\u092A \u0915\u092E\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902", "\u0C2E\u0C40\u0C30\u0C41 \u0C38\u0C02\u0C2A\u0C3E\u0C26\u0C3F\u0C02\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41")}
              </p>
              <p className="text-xl font-bold text-secondary-foreground">
                {"\u20B9"}12,000/{t("month", "\u092E\u093E\u0939", "\u0C28\u0C46\u0C32")}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Button
        size="lg"
        className="min-h-14 bg-primary text-base text-primary-foreground hover:bg-primary/90"
        onClick={handleSubmit}
      >
        {t("List Equipment", "\u0909\u092A\u0915\u0930\u0923 \u091C\u094B\u0921\u093C\u0947\u0902", "\u0C2A\u0C30\u0C3F\u0C15\u0C30\u0C02 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F")}
      </Button>
    </div>
  )
}
