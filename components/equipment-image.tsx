"use client"

import { useState, useEffect } from "react"
import { getEquipmentImage } from "@/lib/equipment-images"

interface EquipmentImageProps {
  equipmentName: string
}

export function EquipmentImage({ equipmentName }: EquipmentImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "primary-failed" | "fallback-failed">("loading")
  const [imageData, setImageData] = useState(() => getEquipmentImage(equipmentName))

  useEffect(() => {
    setImageData(getEquipmentImage(equipmentName))
    setStatus("loading")
  }, [equipmentName])
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/9", borderRadius: "12px 12px 0 0" }}
    >
      {/* Shimmer skeleton while loading */}
      {status === "loading" && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite"
          }}
        />
      )}

      {/* Primary image with lazy loading */}
      {status !== "fallback-failed" && (
        <img
          src={status === "primary-failed" ? imageData.fallback : imageData.primary}
          alt={equipmentName}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{
            opacity: status === "loading" ? 0 : 1,
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
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Fallback: Emoji gradient when both images fail */}
      {status === "fallback-failed" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: imageData.gradient }}
        >
          <span style={{ fontSize: "5rem", opacity: 0.9 }}>{imageData.emoji}</span>
          <span className="text-white font-bold text-sm text-center px-4 max-w-xs line-clamp-2">
            {equipmentName}
          </span>
        </div>
      )}

      {/* Dark overlay for text readability on images */}
      {status !== "fallback-failed" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)"
          }}
        />
      )}

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
