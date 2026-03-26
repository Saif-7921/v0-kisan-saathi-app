"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  Sprout,
  FlaskConical,
  Bug,
  Users,
  Tractor,
  Droplets,
  Truck,
  MoreHorizontal,
  Calendar,
  IndianRupee,
  PieChart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { expenses, cropSales, expenseCategories } from "@/lib/mock-data"
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

interface ExpenseTrackerProps {
  onBack: () => void
}

const categoryIcons: Record<string, React.ElementType> = {
  seeds: Sprout,
  fertilizer: FlaskConical,
  pesticide: Bug,
  labor: Users,
  equipment: Tractor,
  irrigation: Droplets,
  transport: Truck,
  other: MoreHorizontal,
}

const CHART_COLORS = ["#2D6A4F", "#F5A623", "#48CAE4", "#E07A5F", "#81B29A", "#3D405B", "#F4A261", "#9A8C98"]

export function ExpenseTracker({ onBack }: ExpenseTrackerProps) {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("expenses")

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalSales = cropSales.reduce((sum, sale) => sum + sale.amount, 0)
  const profitLoss = totalSales - totalExpenses

  // Group expenses by category for pie chart
  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {} as Record<string, number>)

  const pieChartData = Object.entries(expensesByCategory).map(([category, amount]) => {
    const cat = expenseCategories.find((c) => c.id === category)
    return {
      name: language === "hi" ? cat?.labelHi || category : cat?.label || category,
      value: amount,
    }
  })

  const getCategoryLabel = (categoryId: string) => {
    const cat = expenseCategories.find((c) => c.id === categoryId)
    return language === "hi" ? cat?.labelHi || categoryId : cat?.label || categoryId
  }

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
              {t("Expense Tracker", "खर्च ट्रैकर", "ఖర్చు ట్రాకర్")}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t("Track farming costs & income", "खेती की लागत और आय ट्रैक करें", "వ్యవసాయ ఖర్చులు మరియు ఆదాయం ట్రాక్ చేయండి")}
            </p>
          </div>
        </div>
        <Button size="sm" className="gap-1">
          <Plus className="size-4" />
          {t("Add", "जोड़ें", "జోడించు")}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 bg-destructive/10">
          <CardContent className="p-3 text-center">
            <TrendingDown className="mx-auto mb-1 size-5 text-destructive" />
            <p className="text-lg font-bold text-destructive">Rs. {totalExpenses.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">{t("Total Expenses", "कुल खर्च", "మొత్తం ఖర్చులు")}</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-primary/10">
          <CardContent className="p-3 text-center">
            <TrendingUp className="mx-auto mb-1 size-5 text-primary" />
            <p className="text-lg font-bold text-primary">Rs. {totalSales.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">{t("Total Sales", "कुल बिक्री", "మొత్తం అమ్మకాలు")}</p>
          </CardContent>
        </Card>
        <Card className={`border-0 ${profitLoss >= 0 ? "bg-primary/15" : "bg-destructive/15"}`}>
          <CardContent className="p-3 text-center">
            {profitLoss >= 0 ? (
              <TrendingUp className="mx-auto mb-1 size-5 text-primary" />
            ) : (
              <TrendingDown className="mx-auto mb-1 size-5 text-destructive" />
            )}
            <p className={`text-lg font-bold ${profitLoss >= 0 ? "text-primary" : "text-destructive"}`}>
              Rs. {Math.abs(profitLoss).toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {profitLoss >= 0 ? t("Profit", "लाभ", "లాభం") : t("Loss", "हानि", "నష్టం")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">{t("Expenses", "खर्च", "ఖర్చులు")}</TabsTrigger>
          <TabsTrigger value="sales">{t("Sales", "बिक्री", "అమ్మకాలు")}</TabsTrigger>
          <TabsTrigger value="analysis">{t("Analysis", "विश्लेषण", "విశ్లేషణ")}</TabsTrigger>
        </TabsList>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="mt-4">
          <div className="flex flex-col gap-2">
            {expenses.map((exp) => {
              const Icon = categoryIcons[exp.category] || MoreHorizontal
              return (
                <Card key={exp.id}>
                  <CardContent className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{exp.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-[10px]">
                            {getCategoryLabel(exp.category)}
                          </Badge>
                          <span>{exp.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-destructive">-Rs. {exp.amount.toLocaleString()}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="mt-4">
          <div className="flex flex-col gap-2">
            {cropSales.map((sale) => (
              <Card key={sale.id}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold">{sale.crop}</h3>
                    <p className="text-lg font-bold text-primary">+Rs. {sale.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {sale.quantity} {sale.unit} @ Rs. {sale.pricePerUnit}/{sale.unit.slice(0, -1)}
                    </span>
                    <span>{sale.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {cropSales.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <IndianRupee className="mb-2 size-10 text-muted-foreground" />
                  <p className="font-medium">{t("No sales recorded", "कोई बिक्री दर्ज नहीं", "అమ్మకాలు నమోదు కాలేదు")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Add your crop sales", "अपनी फसल बिक्री जोड़ें", "మీ పంట అమ్మకాలు జోడించండి")}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="mt-4 flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <PieChart className="size-5" />
                {t("Expense Breakdown", "खर्च विभाजन", "ఖర్చు విభజన")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, "Amount"]}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category-wise breakdown */}
          <div>
            <h3 className="mb-3 font-bold">{t("Category Details", "श्रेणी विवरण", "వర్గ వివరాలు")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(expensesByCategory).map(([category, amount], idx) => {
                const Icon = categoryIcons[category] || MoreHorizontal
                const percentage = ((amount / totalExpenses) * 100).toFixed(1)
                return (
                  <Card key={category}>
                    <CardContent className="flex items-center gap-3 p-3">
                      <div
                        className="flex size-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${CHART_COLORS[idx % CHART_COLORS.length]}20` }}
                      >
                        <Icon
                          className="size-4"
                          style={{ color: CHART_COLORS[idx % CHART_COLORS.length] }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{getCategoryLabel(category)}</p>
                        <p className="text-sm font-bold">Rs. {amount.toLocaleString()}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {percentage}%
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
