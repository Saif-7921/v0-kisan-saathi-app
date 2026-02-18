"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [waveAmps, setWaveAmps] = useState<number[]>(Array(12).fill(0.2))
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isRecording) {
      animRef.current = setInterval(() => {
        setWaveAmps(Array(12).fill(0).map(() => 0.2 + Math.random() * 0.8))
      }, 100)
    } else {
      if (animRef.current) clearInterval(animRef.current)
      setWaveAmps(Array(12).fill(0.2))
    }
    return () => {
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [isRecording])

  const handleToggle = () => {
    if (isRecording) {
      setIsRecording(false)
      // Simulate transcription
      setTimeout(() => {
        onTranscript("My paddy field was completely submerged due to heavy rainfall on 15th January. About 60% of the crop is damaged.")
      }, 500)
    } else {
      setIsRecording(true)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-center rounded-full p-4 transition-all",
          isRecording
            ? "bg-destructive text-card animate-pulse"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-label={isRecording ? "Stop recording" : "Start voice input"}
      >
        {isRecording ? <MicOff className="size-6" /> : <Mic className="size-6" />}
      </button>
      {isRecording && (
        <div className="flex h-8 items-end gap-0.5">
          {waveAmps.map((amp, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-primary transition-all duration-100"
              style={{ height: `${amp * 32}px` }}
            />
          ))}
        </div>
      )}
      <span className="text-xs text-muted-foreground">
        {isRecording ? "Listening... Tap to stop" : "Tap to speak"}
      </span>
    </div>
  )
}
