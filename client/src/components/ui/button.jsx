import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(function Button(
  { className, variant = "default", size = "default", ...props },
  ref,
) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default:
      "bg-brand-600 text-white hover:bg-brand-500 brand-glow",
    secondary:
      "bg-zinc-900/80 text-zinc-50 border border-zinc-800 hover:bg-zinc-900",
    outline:
      "bg-transparent text-zinc-50 border border-zinc-800 hover:bg-zinc-900",
    ghost: "bg-transparent text-zinc-50 hover:bg-zinc-900/60",
    danger:
      "bg-red-600 text-white hover:bg-red-500 brand-glow",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-6",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

