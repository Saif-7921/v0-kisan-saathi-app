"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  Search,
  MapPin,
  Phone,
  Star,
  Filter,
  ShoppingBag,
  Tag,
  Wheat,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { marketplaceListings } from "@/lib/mock-data"

interface CropMarketplaceProps {
  onBack: () => void
}

export function CropMarketplace({ onBack }: CropMarketplaceProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const filteredListings = marketplaceListings
    .filter((listing) => {
      const matchesSearch = listing.crop.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === "all" || listing.type === activeTab
      return matchesSearch && matchesTab
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerUnit - b.pricePerUnit
      if (sortBy === "price-high") return b.pricePerUnit - a.pricePerUnit
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    })

  const sellListings = marketplaceListings.filter((l) => l.type === "sell").length
  const buyListings = marketplaceListings.filter((l) => l.type === "buy").length

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex size-9 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-muted/80"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="font-serif text-xl font-bold">
              {t("Crop Marketplace", "फसल बाजार", "పంట మార్కెట్")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("Buy & sell crops directly", "सीधे फसल खरीदें और बेचें", "నేరుగా పంటలు కొనండి మరియు అమ్మండి")}
            </p>
          </div>
        </div>
        <Button size="sm" className="gap-1">
          <Plus className="size-4" />
          {t("List Crop", "फसल लिस्ट", "పంట జోడించు")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 bg-primary/10">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
              <Tag className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold">{sellListings}</p>
              <p className="text-xs text-muted-foreground">{t("For Sale", "बिक्री के लिए", "అమ్మకానికి")}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-secondary/10">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/20">
              <ShoppingBag className="size-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{buyListings}</p>
              <p className="text-xs text-muted-foreground">{t("Want to Buy", "खरीदना चाहते हैं", "కొనాలనుకుంటున్నారు")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("Search crops...", "फसल खोजें...", "పంటలు వెతకండి...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1">
              <Filter className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder={t("Sort by", "क्रमबद्ध", "క్రమబద్ధీకరించు")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">{t("Most Recent", "सबसे हाल का", "ఇటీవలిది")}</SelectItem>
              <SelectItem value="price-low">{t("Price: Low to High", "कीमत: कम से ज्यादा", "ధర: తక్కువ నుండి ఎక్కువ")}</SelectItem>
              <SelectItem value="price-high">{t("Price: High to Low", "कीमत: ज्यादा से कम", "ధర: ఎక్కువ నుండి తక్కువ")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">{t("All", "सभी", "అన్ని")}</TabsTrigger>
          <TabsTrigger value="sell">{t("For Sale", "बिक्री", "అమ్మకం")}</TabsTrigger>
          <TabsTrigger value="buy">{t("Want to Buy", "खरीदना", "కొనాలి")}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredListings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Wheat className="mb-2 size-10 text-muted-foreground" />
                <p className="font-medium">{t("No listings found", "कोई लिस्टिंग नहीं मिली", "జాబితాలు కనుగొనబడలేదు")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("Try adjusting your search", "अपनी खोज बदलें", "మీ శోధనను మార్చండి")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-bold">{listing.crop}</h3>
                          <Badge
                            variant={listing.type === "sell" ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {listing.type === "sell"
                              ? t("For Sale", "बिक्री", "అమ్మకం")
                              : t("Wanted", "चाहिए", "కావాలి")}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="text-[10px]">
                          {listing.quality}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          Rs. {listing.pricePerUnit.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">per {listing.unit.slice(0, -1)}</p>
                      </div>
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Wheat className="size-3.5" />
                        <span>
                          {listing.quantity} {listing.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="size-3.5" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="size-3.5" />
                        <span>{listing.postedDate}</span>
                      </div>
                      {listing.available && (
                        <div className="flex items-center gap-1.5 text-primary">
                          <CheckCircle2 className="size-3.5" />
                          <span>{t("Available", "उपलब्ध", "అందుబాటులో")}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/15">
                          <span className="text-xs font-bold text-primary">
                            {listing.seller.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{listing.seller}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <Phone className="size-3.5" />
                        {t("Contact", "संपर्क", "సంప్రదించు")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
