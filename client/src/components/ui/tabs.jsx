import React, { createContext, useContext, useMemo, useState } from "react";
import { cn } from "../../lib/utils";

const TabsContext = createContext(null);

export function Tabs({
  className,
  defaultValue,
  value: valueProp,
  onValueChange,
  children,
  ...props
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const setValue = (next) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  const ctx = useMemo(() => ({ value, setValue }), [value]);

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn(className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-zinc-800 bg-zinc-950/60 p-1 text-zinc-100",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ value, className, ...props }) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx?.setValue(value)}
      className={cn(
        "rounded-sm px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2",
        active ? "bg-brand-600 text-white" : "text-zinc-200 hover:bg-zinc-900",
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}

export function TabsContent({ value, children, ...props }) {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return (
    <div className="mt-4" {...props}>
      {children}
    </div>
  );
}

