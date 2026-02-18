"use client"

import { useState } from "react"
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
  XCircle,
  Tractor,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { equipmentListings, equipmentTypes } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type View = "list" | "detail" | "add"

export function EquipmentMarketplace() {
  const { t } = useLanguage()
  const [view, setView] = useState<View>("list")
  const [search, setSearch] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [sortBy, setSortBy] = useState("distance")
  const [selectedEquipment, setSelectedEquipment] = useState<(typeof equipmentListings)[0] | null>(null)
  const [booked, setBooked] = useState(false)

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
        onBack={() => { setView("list"); setBooked(false) }}
        booked={booked}
        onBook={() => setBooked(true)}
      />
    )
  }

  if (view === "add") {
    return <ListEquipmentForm onBack={() => setView("list")} />
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">
          {t("Equipment Marketplace", "उपकरण बाज़ार", "పరికరాల మార్కెట్")}
        </h1>
        <LanguageToggle />
      </div>

      {/* Search & Sort */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("Find equipment near you", "उपकरण खोजें", "పరికరాలు కనుగొనండి")}
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
        {t("List My Equipment", "अपना उपकरण जोड़ें", "నా పరికరం జాబితా")}
      </Button>

      {/* Equipment Cards */}
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
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex gap-3 p-3">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Tractor className="size-8 text-muted-foreground" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-bold leading-tight">{eq.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {eq.owner} - {eq.village}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {eq.distance} km
                    </div>
                    <div className="flex items-center gap-0.5 text-xs text-secondary-foreground">
                      <Star className="size-3 fill-secondary text-secondary" />
                      {eq.rating} ({eq.reviews})
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                      {"₹"}{eq.pricePerDay}/day
                    </span>
                    {eq.available ? (
                      <Badge className="bg-primary/15 text-primary text-[10px]">
                        Available
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/15 text-destructive text-[10px]">
                        Booked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}

// ---- Equipment Detail View ----
function EquipmentDetail({
  equipment,
  onBack,
  booked,
  onBook,
}: {
  equipment: (typeof equipmentListings)[0]
  onBack: () => void
  booked: boolean
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
        {t("Back to listings", "सूची पर वापस", "జాబితాకు తిరిగి")}
      </button>

      {/* Photo */}
      <div className="flex h-48 items-center justify-center rounded-xl bg-muted">
        <Tractor className="size-16 text-muted-foreground" />
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
          <Button size="sm" variant="outline" className="min-h-10 gap-1">
            <Phone className="size-3.5" />
            Call
          </Button>
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
                <p className="text-lg font-bold text-primary">{"₹"}{equipment.pricePerHour}</p>
                <p className="text-[10px] text-muted-foreground">per hour</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-secondary/20 p-3">
              <Calendar className="size-4 text-secondary-foreground" />
              <div>
                <p className="text-lg font-bold text-secondary-foreground">{"₹"}{equipment.pricePerDay}</p>
                <p className="text-[10px] text-muted-foreground">per day</p>
              </div>
            </div>
          </div>
          {equipment.deliveryAvailable && (
            <div className="flex items-center gap-2 rounded-lg bg-muted p-2 text-xs">
              <Truck className="size-3.5 text-primary" />
              <span>Delivery available (+{"₹"}{equipment.deliveryCost})</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Book Now */}
      {!booked ? (
        <Button
          size="lg"
          className="min-h-14 bg-primary text-base text-primary-foreground hover:bg-primary/90"
          onClick={onBook}
          disabled={!equipment.available}
        >
          <IndianRupee className="mr-1 size-4" />
          {equipment.available
            ? t("Book Now", "अभी बुक करें", "ఇప్పుడు బుక్ చేయండి")
            : t("Currently Unavailable", "उपलब्ध नहीं", "ప్రస్తుతం అందుబాటులో లేదు")}
        </Button>
      ) : (
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex flex-col items-center gap-2 p-4">
            <CheckCircle2 className="size-8 text-primary" />
            <p className="font-serif text-lg font-bold text-primary">
              {t("Booking Confirmed!", "बुकिंग की पुष्टि!", "బుకింగ్ కన్ఫర్మ్!")}
            </p>
            <p className="text-xs text-muted-foreground">
              The owner will contact you shortly
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ---- List Equipment Form ----
function ListEquipmentForm({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 pb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" />
          {t("Back", "वापस", "వెనక్కి")}
        </button>
        <Card className="border-primary bg-primary/5">
          <CardContent className="flex flex-col items-center gap-3 p-6">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-serif text-lg font-bold text-primary">
              {t("Equipment Listed!", "उपकरण सूचीबद्ध!", "పరికరం జాబితా చేయబడింది!")}
            </p>
            <Card className="w-full border-secondary/30 bg-secondary/10">
              <CardContent className="p-3 text-center">
                <p className="text-xs text-muted-foreground">Estimated Monthly Earnings</p>
                <p className="text-2xl font-bold text-secondary-foreground">
                  {"₹"}12,000
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
        {t("Back", "वापस", "వెనక్కి")}
      </button>

      <h2 className="font-serif text-xl font-bold">
        {t("List Your Equipment", "अपना उपकरण जोड़ें", "మీ పరికరం జాబితా")}
      </h2>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div>
            <Label className="text-xs text-muted-foreground">Equipment Type</Label>
            <Select>
              <SelectTrigger className="mt-1 min-h-12 text-base">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {equipmentTypes.filter((t) => t !== "All").map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Brand / Model</Label>
              <Input className="mt-1 min-h-12 text-base" placeholder="e.g. Mahindra 575" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Year</Label>
              <Input type="number" className="mt-1 min-h-12 text-base" placeholder="2022" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Price per Hour ({"₹"})</Label>
              <Input type="number" className="mt-1 min-h-12 text-base" placeholder="150" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Price per Day ({"₹"})</Label>
              <Input type="number" className="mt-1 min-h-12 text-base" placeholder="800" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Condition</Label>
            <Select>
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
                {t("You can earn up to", "आप कमा सकते हैं", "మీరు సంపాదించవచ్చు")}
              </p>
              <p className="text-xl font-bold text-secondary-foreground">
                {"₹"}12,000/{t("month", "माह", "నెల")}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Button
        size="lg"
        className="min-h-14 bg-primary text-base text-primary-foreground hover:bg-primary/90"
        onClick={() => setSubmitted(true)}
      >
        {t("List Equipment", "उपकरण जोड़ें", "పరికరం జాబితా చేయండి")}
      </Button>
    </div>
  )
}
