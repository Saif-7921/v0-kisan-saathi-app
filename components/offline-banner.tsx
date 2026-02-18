"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    setIsOffline(!navigator.onLine)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="flex items-center justify-center gap-2 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
      <WifiOff className="size-4" />
      <span>Offline Mode — Data will sync when connected</span>
    </div>
  )
}
