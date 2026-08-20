import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-line bg-ink-2/70 px-4 text-paper placeholder:text-paper-faint transition-colors duration-200 focus:border-jade focus:outline-none focus-visible:outline-none disabled:opacity-50 aria-[invalid=true]:border-red-400/70";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  // 48px tall: comfortably above the 44px minimum, and no iOS zoom at 16px.
  <input ref={ref} className={cn(base, "h-12 text-base", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(base, "min-h-32 py-3 text-base leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  // Native select on purpose: correct wheel picker on iOS, correct
  // accessibility semantics everywhere, zero JS.
  <select
    ref={ref}
    className={cn(base, "h-12 cursor-pointer appearance-none text-base", className)}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export function Label({
  className,
  required,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("mb-2 block text-sm text-paper-dim", className)} {...props}>
      {children}
      {required && (
        <span className="ml-1 text-jade" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/** Field wrapper: label, control, helper text and error, wired for a11y. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("min-w-0", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-paper-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
