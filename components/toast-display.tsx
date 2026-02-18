"use client"

import { useToastContext } from "@/lib/toast-context"
import { CheckCircle2, XCircle, Info, X } from "lucide-react"

export function ToastDisplay() {
  const { toasts, removeToast } = useToastContext()

  if (toasts.length === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex w-full max-w-sm items-center gap-2 rounded-xl px-4 py-3 shadow-lg animate-in slide-in-from-bottom-4 duration-300 ${
            toast.type === "success"
              ? "bg-primary text-primary-foreground"
              : toast.type === "error"
              ? "bg-destructive text-primary-foreground"
              : "bg-card text-foreground border border-border"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="size-5 shrink-0" />}
          {toast.type === "error" && <XCircle className="size-5 shrink-0" />}
          {toast.type === "info" && <Info className="size-5 shrink-0" />}
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="shrink-0 opacity-70 hover:opacity-100">
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
