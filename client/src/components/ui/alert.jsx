import React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";

export function Alert({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-zinc-800 bg-zinc-950/60 text-zinc-50",
    error: "border-red-900/60 bg-red-950/30 text-red-50",
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4",
        variants[variant] || variants.default,
        className,
      )}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }) {
  return (
    <div className={cn("text-sm font-semibold", className)} {...props} />
  );
}

export function AlertDescription({ className, ...props }) {
  return (
    <div className={cn("text-sm text-zinc-200", className)} {...props} />
  );
}

export function AlertIcon({ className, ...props }) {
  return (
    <span className={cn("mt-0.5 text-red-300", className)} {...props}>
      <AlertTriangle size={18} />
    </span>
  );
}

