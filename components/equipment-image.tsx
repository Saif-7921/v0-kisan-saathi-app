"use client"

import { useState } from "react"
import { equipmentImageMap } from "@/lib/equipment-images"

interface EquipmentImageProps {
  equipmentName: string
}

export function EquipmentImage({ equipmentName }: EquipmentImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "primary-failed" | "fallback-failed">("loading")
  const imageData = equipmentImageMap[equipmentName as keyof typeof equipmentImageMap]

  if (!imageData) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-t-lg flex items-center justify-center"
        style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #e5e7eb, #f3f4f6)" }}
      >
        <span className="text-4xl">🚜</span>
      </div>
    )
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-lg"
      style={{ aspectRatio: "16/9", borderRadius: "12px 12px 0 0" }}
    >
      {/* Shimmer skeleton while loading */}
      {status === "loading" && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite"
          }}
        />
      )}

      {/* Primary image or fallback */}
      {status !== "fallback-failed" && (
        <img
          src={status === "primary-failed" ? imageData.fallback : imageData.primary}
          alt={equipmentName}
          className="w-full h-full object-cover"
          style={{
            opacity: status === "loading" ? 0 : 1,
            transition: "opacity 0.4s ease"
          }}
          onLoad={() => setStatus("loaded")}
          onError={() => {
            if (status === "loading" || status === "loaded") {
              setStatus("primary-failed")
            } else {
              setStatus("fallback-failed")
            }
          }}
          crossOrigin="anonymous"
        />
      )}

      {/* Final emoji fallback — only when both URLs fail */}
      {status === "fallback-failed" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ background: imageData.gradient }}
        >
          <span style={{ fontSize: "64px" }}>{imageData.emoji}</span>
          <span className="text-white font-bold text-sm text-center px-4">
            {equipmentName}
          </span>
        </div>
      )}

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)"
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}
