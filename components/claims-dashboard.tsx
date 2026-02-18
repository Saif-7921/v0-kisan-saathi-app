"use client"

import {
  FileText,
  Tractor,
  IndianRupee,
  Calendar,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClaimStatusPipeline } from "@/components/claim-status-pipeline"
import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { claims, bookings, monthlyEarnings } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const statusColorMap: Record<string, string> = {
  submitted: "bg-secondary/30 text-secondary-foreground",
  "ai-verified": "bg-accent/15 text-accent-foreground",
  "under-review": "bg-secondary/30 text-secondary-foreground",
  approved: "bg-primary/15 text-primary",
  paid: "bg-primary text-primary-foreground",
}

const bookingStatusColorMap: Record<string, string> = {
  upcoming: "bg-accent/15 text-accent-foreground",
  completed: "bg-primary/15 text-primary",
  cancelled: "bg-destructive/15 text-destructive",
}

export function ClaimsDashboard() {
  const { t } = useLanguage()
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null)

  const totalClaimCompensation = claims
    .filter((c) => c.status === "approved" || c.status === "paid")
    .reduce((sum, c) => sum + c.lossAmount, 0)

  const totalRentalIncome = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.cost, 0)

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">
          {t("My Dashboard", "मेरा डैशबोर्ड", "నా డ్యాష్‌బోర్డ్")}
        </h1>
        <LanguageToggle />
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-1 p-3">
            <FileText className="size-5 text-primary" />
            <p className="text-[10px] text-muted-foreground">
              {t("Claim Compensation", "दावा मुआवजा", "క్లెయిమ్ పరిహారం")}
            </p>
            <p className="text-lg font-bold text-primary">
              {"₹"}{totalClaimCompensation.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
        <Card className="border-secondary/20 bg-secondary/10">
          <CardContent className="flex flex-col items-center gap-1 p-3">
            <Tractor className="size-5 text-secondary-foreground" />
            <p className="text-[10px] text-muted-foreground">
              {t("Rental Income", "किराया आय", "అద్దె ఆదాయం")}
            </p>
            <p className="text-lg font-bold text-secondary-foreground">
              {"₹"}{totalRentalIncome.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Chart */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <span className="text-sm font-bold">
              {t("Monthly Earnings", "मासिक आय", "నెలవారీ ఆదాయం")}
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, undefined]}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="claims" fill="var(--color-primary)" radius={[3, 3, 0, 0]} name="Claims" />
                <Bar dataKey="rental" fill="var(--color-secondary)" radius={[3, 3, 0, 0]} name="Rental" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Claims & Bookings */}
      <Tabs defaultValue="claims">
        <TabsList className="w-full">
          <TabsTrigger value="claims" className="flex-1 text-xs">
            {t("My Claims", "मेरे दावे", "నా క్లెయిమ్‌లు")}
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex-1 text-xs">
            {t("My Bookings", "मेरी बुकिंग", "నా బుకింగ్‌లు")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="mt-3">
          <div className="flex flex-col gap-3">
            {claims.map((claim) => {
              const isExpanded = expandedClaim === claim.id
              return (
                <Card key={claim.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() =>
                        setExpandedClaim(isExpanded ? null : claim.id)
                      }
                      className="flex w-full items-center justify-between p-3"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{claim.id}</span>
                          <Badge
                            className={cn(
                              "text-[10px] capitalize",
                              statusColorMap[claim.status]
                            )}
                          >
                            {claim.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{claim.crop}</span>
                          <span>-</span>
                          <span>{claim.damageType}</span>
                          <span>-</span>
                          <span>{"₹"}{claim.lossAmount.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="border-t border-border px-3 py-3">
                        <ClaimStatusPipeline currentStep={claim.statusStep} />
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-lg bg-muted p-2 text-center">
                            <p className="text-[10px] text-muted-foreground">AI Score</p>
                            <p className="text-sm font-bold">{claim.aiScore}/100</p>
                          </div>
                          <div className="rounded-lg bg-muted p-2 text-center">
                            <p className="text-[10px] text-muted-foreground">Weather</p>
                            <p className="text-sm font-bold">
                              {claim.weatherVerified ? "Verified" : "Pending"}
                            </p>
                          </div>
                          <div className="rounded-lg bg-muted p-2 text-center">
                            <p className="text-[10px] text-muted-foreground">Date</p>
                            <p className="text-sm font-bold">
                              {new Date(claim.date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-3">
          <div className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Tractor className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{booking.equipment}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        <span>
                          {new Date(booking.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span>-</span>
                        <span>{booking.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-primary">
                      {"₹"}{booking.cost}
                    </span>
                    <Badge
                      className={cn(
                        "text-[10px] capitalize",
                        bookingStatusColorMap[booking.status]
                      )}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
