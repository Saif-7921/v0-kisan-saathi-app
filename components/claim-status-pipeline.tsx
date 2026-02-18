"use client"

import { Check, Send, Brain, CloudSun, FileSearch, ThumbsUp, Banknote } from "lucide-react"
import { cn } from "@/lib/utils"

const statusIcons = [Send, Brain, CloudSun, FileSearch, ThumbsUp, Banknote]
const statusLabels = [
  "Submitted",
  "AI Verified",
  "Weather Checked",
  "Under Review",
  "Approved",
  "Paid",
]

interface ClaimStatusPipelineProps {
  currentStep: number
  compact?: boolean
}

export function ClaimStatusPipeline({ currentStep, compact }: ClaimStatusPipelineProps) {
  return (
    <div className="flex items-center gap-0.5">
      {statusLabels.map((label, i) => {
        const Icon = statusIcons[i]
        const isCompleted = i < currentStep
        const isCurrent = i === currentStep
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full transition-colors",
                  compact ? "size-5" : "size-7",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-secondary text-secondary-foreground ring-2 ring-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className={compact ? "size-3" : "size-3.5"} />
                ) : (
                  <Icon className={compact ? "size-3" : "size-3.5"} />
                )}
              </div>
              {i < statusLabels.length - 1 && (
                <div
                  className={cn(
                    "mx-0.5 h-0.5 flex-1 rounded-full",
                    i < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            {!compact && (
              <span
                className={cn(
                  "text-center text-[9px] leading-tight",
                  isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
