"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepProgressBarProps {
  steps: string[]
  currentStep: number
}

export function StepProgressBar({ steps, currentStep }: StepProgressBarProps) {
  return (
    <div className="flex items-center gap-1 px-2">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep
        const isCurrent = i === currentStep
        return (
          <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-secondary text-secondary-foreground ring-2 ring-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="size-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1 h-0.5 flex-1 rounded-full transition-colors",
                    i < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-center text-[10px] leading-tight",
                isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}
