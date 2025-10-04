"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------------
   Types & Context
-------------------------------------------------------------------------------- */

type SelectContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  value?: string;
  setValue: (v: string) => void;
  onValueChange?: (v: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement  | null>;
  contentRef: React.RefObject<HTMLDivElement  | null>;
  disabled?: boolean;
  placeholder?: string;
  registerItem: (item: { value: string; label: string }) => void;
  items: { value: string; label: string }[];
};

const SelectCtx = React.createContext<SelectContextValue | null>(null);

function useSelectCtx() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctx = React.useContext<SelectContextValue>(SelectCtx as any);
  if (!ctx) {
    throw new Error("Select components must be used within <Select>.");
  }
  return ctx as SelectContextValue;
}

/* --------------------------------------------------------------------------------
   Root
-------------------------------------------------------------------------------- */

export function Select({
  value: controlled,
  defaultValue,
  onValueChange,
  disabled,
  placeholder,
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolled, setUncontrolled] = React.useState<string | undefined>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;

  const setValue = React.useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolled(v);
      onValueChange?.(v);
      setOpen(false);
    },
    [isControlled, onValueChange]
  );

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (
        contentRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // Items registry (for label lookup & keyboard nav)
  const [items, setItems] = React.useState<{ value: string; label: string }[]>([]);
  const registerItem = React.useCallback((item: { value: string; label: string }) => {
    setItems((prev) => (prev.some((i) => i.value === item.value) ? prev : [...prev, item]));
  }, []);

  const ctx: SelectContextValue = {
    open,
    setOpen,
    value,
    setValue,
    onValueChange,
    triggerRef,
    contentRef,
    disabled,
    placeholder,
    registerItem,
    items,
  };

  return (
    <SelectCtx.Provider value={ctx}>
      <div className={cn("relative inline-block text-left", className)}>{children}</div>
    </SelectCtx.Provider>
  );
}

/* --------------------------------------------------------------------------------
   Trigger
-------------------------------------------------------------------------------- */

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { open, setOpen, triggerRef, disabled } = useSelectCtx();
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      disabled={disabled}
      onClick={() => !disabled && setOpen(!open)}
      className={cn(
        // mirrors your Textarea tokens
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 pr-9 text-base shadow-sm md:text-sm",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {/* caret */}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={cn(
          "pointer-events-none absolute right-2 h-4 w-4 text-muted-foreground transition-transform",
          open ? "rotate-180" : "rotate-0"
        )}
      >
        <path d="M6 8l4 4 4-4" fill="currentColor" />
      </svg>
    </button>
  );
}

/* --------------------------------------------------------------------------------
   Value
-------------------------------------------------------------------------------- */

export function SelectValue({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const { value, items, placeholder: rootPlaceholder } = useSelectCtx();
  const label = React.useMemo(() => items.find((i) => i.value === value)?.label, [items, value]);
  return (
    <span className={cn("truncate text-left", className)}>
      {label ?? placeholder ?? rootPlaceholder ?? "Select…"}
    </span>
  );
}

/* --------------------------------------------------------------------------------
   Content
-------------------------------------------------------------------------------- */

export function SelectContent({
  className,
  align = "start",
  sideOffset = 6,
  children,
}: {
  className?: string;
  align?: "start" | "end" | "center";
  sideOffset?: number;
  children: React.ReactNode;
}) {
  const { open, contentRef, triggerRef } = useSelectCtx();

  // Simple positioning below trigger
  const [styles, setStyles] = React.useState<React.CSSProperties>({});
  React.useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const y = rect.height + sideOffset;
    let x = 0;
    if (align === "end") x = rect.width;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    else if (align === "center") x = rect.width / 2;
    setStyles({
      position: "absolute",
      top: y,
      left: align === "start" ? 0 : align === "end" ? "auto" : `calc(50% - ${rect.width / 2}px)`,
      right: align === "end" ? 0 : "auto",
      minWidth: rect.width,
      zIndex: 50,
    });
  }, [open, align, sideOffset, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="listbox"
      tabIndex={-1}
      className={cn(
        "max-h-64 w-full overflow-auto rounded-md border border-input bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      style={styles}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------------
   Item
-------------------------------------------------------------------------------- */

export function SelectItem({
  value,
  children,
  className,
  disabled,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const { setValue, registerItem } = useSelectCtx();
  const ref = React.useRef<HTMLDivElement>(null);

  // Register for label lookup
  React.useEffect(() => {
    const label =
      typeof children === "string"
        ? children
        : (ref.current?.textContent ?? value);
    registerItem({ value, label });
  }, [value, children, registerItem]);

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={false}
      data-value={value}
      onClick={() => !disabled && setValue(value)}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}
