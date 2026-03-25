"use client"

import { useState, useEffect } from "react"
import { getConfidenceColor } from "@/lib/disease-detection"

interface ConfidenceArcProps {
  value: number
  showLabel?: boolean
}

export function ConfidenceArc({ value, showLabel = true }: ConfidenceArcProps) {
  const [animated, setAnimated] = useState(0)
  const radius = 45
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(value), 300)
    return () => clearTimeout(timer)
  }, [value])

  const strokeDashoffset = circumference * (1 - animated / 100)
  const color = getConfidenceColor(value)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1.5s ease-out",
            transform: "rotate(-90deg)",
            transformOrigin: "60px 60px"
          }}
        />
        {showLabel && (
          <>
            <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="bold" fill={color}>
              {animated}%
            </text>
            <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#6b7280">
              Confidence
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
