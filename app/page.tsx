import dynamic from "next/dynamic"

const KisanSaathiApp = dynamic(() => import("@/components/kisan-saathi-app"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
          <span className="text-lg font-bold text-primary-foreground">K</span>
        </div>
        <p className="text-sm text-muted-foreground">Loading KisanSaathi...</p>
      </div>
    </div>
  ),
})

export default function Page() {
  return <KisanSaathiApp />
}
