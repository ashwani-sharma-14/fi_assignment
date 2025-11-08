import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg border bg-card p-4 shadow-lg",
        "transform transition-all duration-300 ease-in-out",
        isVisible
          ? "translate-x-0 opacity-100 scale-100 animate-slide-in-right"
          : "translate-x-[120%] opacity-0 scale-95 pointer-events-none"
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="rounded-md p-1 hover:bg-muted transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
