"use client"

import { useState } from "react"
import { getEquipmentImageUrl } from "@/lib/equipment-images"

interface EquipmentImageProps {
  equipmentName: string
}

export function EquipmentImage({ equipmentName }: EquipmentImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imageUrl = getEquipmentImageUrl(equipmentName)

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/9", borderRadius: "12px 12px 0 0" }}
    >
      {/* Shimmer skeleton while loading */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite"
          }}
        />
      )}

      {/* Image */}
      <img
        src={imageUrl}
        alt={equipmentName}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        crossOrigin="anonymous"
        loading="lazy"
        decoding="async"
      />

      {/* Dark overlay for text readability on images */}
      {isLoaded && !hasError && (
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
