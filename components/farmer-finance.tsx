"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  IndianRupee,
  Calendar,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { financeData } from "@/lib/mock-data"

interface FarmerFinanceProps {
  onBack: () => void
}

export function FarmerFinance({ onBack }: FarmerFinanceProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

  const totalSubsidies = financeData.subsidies.reduce((sum, s) => s.status === "credited" ? sum + s.amount : sum, 0)
  const pendingSubsidies = financeData.subsidies.reduce((sum, s) => s.status === "pending" ? sum + s.amount : sum, 0)

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
            {t("Farmer Finance", "किसान वित्त", "రైతు ఫైనాన్స్")}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t("Manage your finances", "अपने वित्त का प्रबंधन करें", "మీ ఆర్థిక నిర్వహణ")}
          </p>
        </div>
      </div>

      {/* Bank Account Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-primary to-primary/80">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-primary-foreground/80" />
              <span className="text-sm font-medium text-primary-foreground/80">
                {financeData.bankAccount.bankName}
              </span>
            </div>
            <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
              {t("Linked", "लिंक्ड", "లింక్డ్")}
            </Badge>
          </div>
          <div className="mb-1 text-sm text-primary-foreground/70">
            {t("Available Balance", "उपलब्ध शेष", "అందుబాటులో ఉన్న బ్యాలెన్స్")}
          </div>
          <div className="mb-4 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-primary-foreground">
              Rs. {financeData.bankAccount.balance.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-primary-foreground/70">
            <span>A/C: {financeData.bankAccount.accountNumber}</span>
            <span>IFSC: {financeData.bankAccount.ifsc}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
                <TrendingUp className="size-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">
                {t("Subsidies Received", "प्राप्त सब्सिडी", "అందిన సబ్సిడీలు")}
              </span>
            </div>
            <p className="text-xl font-bold">Rs. {totalSubsidies.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-secondary/20">
                <Clock className="size-4 text-secondary-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">
                {t("Pending", "लंबित", "పెండింగ్")}
              </span>
            </div>
            <p className="text-xl font-bold">Rs. {pendingSubsidies.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t("Overview", "अवलोकन", "అవలోకనం")}</TabsTrigger>
          <TabsTrigger value="loans">{t("Loans", "ऋण", "రుణాలు")}</TabsTrigger>
          <TabsTrigger value="transactions">{t("History", "इतिहास", "చరిత్ర")}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 flex flex-col gap-4">
          {/* Subsidies Section */}
          <div>
            <h3 className="mb-3 font-bold">{t("Subsidy Status", "सब्सिडी स्थिति", "సబ్సిడీ స్థితి")}</h3>
            <div className="flex flex-col gap-2">
              {financeData.subsidies.map((subsidy) => (
                <Card key={subsidy.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 items-center justify-center rounded-full ${
                          subsidy.status === "credited" ? "bg-primary/15" : "bg-secondary/20"
                        }`}
                      >
                        {subsidy.status === "credited" ? (
                          <CheckCircle2 className="size-5 text-primary" />
                        ) : (
                          <Clock className="size-5 text-secondary-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{subsidy.name}</p>
                        <p className="text-xs text-muted-foreground">{subsidy.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Rs. {subsidy.amount.toLocaleString()}</p>
                      <Badge
                        variant={subsidy.status === "credited" ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {subsidy.status === "credited"
                          ? t("Credited", "जमा", "జమ")
                          : t("Pending", "लंबित", "పెండింగ్")}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Loan Eligibility Check */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <CreditCard className="size-5 text-primary" />
                <h3 className="font-bold">{t("Quick Loan Check", "त्वरित ऋण जांच", "త్వరిత రుణ తనిఖీ")}</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                {t(
                  "Based on your profile, you may be eligible for:",
                  "आपकी प्रोफाइल के आधार पर, आप इसके लिए पात्र हो सकते हैं:",
                  "మీ ప్రొఫైల్ ఆధారంగా, మీరు అర్హులు కావచ్చు:"
                )}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-card p-3">
                  <div>
                    <p className="font-medium">Kisan Credit Card</p>
                    <p className="text-xs text-muted-foreground">Up to Rs. 3,00,000</p>
                  </div>
                  <Badge className="bg-primary/15 text-primary">4% Interest</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-card p-3">
                  <div>
                    <p className="font-medium">Agri Gold Loan</p>
                    <p className="text-xs text-muted-foreground">Up to Rs. 50,000</p>
                  </div>
                  <Badge className="bg-secondary/20 text-secondary-foreground">7% Interest</Badge>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                {t("Check Full Eligibility", "पूर्ण पात्रता जांचें", "పూర్తి అర్హత తనిఖీ")}
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loans Tab */}
        <TabsContent value="loans" className="mt-4 flex flex-col gap-4">
          {financeData.loans.map((loan) => (
            <Card key={loan.id}>
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-5 text-primary" />
                    <h3 className="font-bold">{loan.type}</h3>
                  </div>
                  <Badge variant={loan.status === "active" ? "default" : "secondary"}>
                    {loan.status === "active"
                      ? t("Active", "सक्रिय", "యాక్టివ్")
                      : t("Closed", "बंद", "మూసివేయబడింది")}
                  </Badge>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("Loan Amount", "ऋण राशि", "రుణ మొత్తం")}
                    </p>
                    <p className="font-bold">Rs. {loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("Outstanding", "बकाया", "బకాయి")}
                    </p>
                    <p className="font-bold text-destructive">Rs. {loan.outstanding.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("Interest Rate", "ब्याज दर", "వడ్డీ రేటు")}
                    </p>
                    <p className="font-bold">{loan.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("Monthly EMI", "मासिक EMI", "నెలవారీ EMI")}
                    </p>
                    <p className="font-bold">Rs. {loan.emi.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{t("Repaid", "चुकाया", "చెల్లించారు")}</span>
                    <span className="font-medium">
                      {Math.round(((loan.amount - loan.outstanding) / loan.amount) * 100)}%
                    </span>
                  </div>
                  <Progress value={((loan.amount - loan.outstanding) / loan.amount) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t("Next Due:", "अगली देय:", "తదుపరి బకాయి:")}
                    </span>
                  </div>
                  <span className="font-medium">{loan.nextDue}</span>
                </div>

                <Button className="mt-3 w-full">
                  {t("Pay EMI", "EMI भुगतान", "EMI చెల్లించండి")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="mt-4">
          <div className="flex flex-col gap-2">
            {financeData.transactions.map((txn) => (
              <Card key={txn.id}>
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-full ${
                        txn.type === "credit" ? "bg-primary/15" : "bg-destructive/10"
                      }`}
                    >
                      {txn.type === "credit" ? (
                        <ArrowDownLeft className="size-5 text-primary" />
                      ) : (
                        <ArrowUpRight className="size-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{txn.description}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${
                      txn.type === "credit" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {txn.type === "credit" ? "+" : "-"}Rs. {txn.amount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
