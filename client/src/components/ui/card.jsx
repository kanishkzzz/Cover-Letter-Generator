import React from "react";
import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("p-6 pb-4", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h2 className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-4", className)} {...props} />;
}

