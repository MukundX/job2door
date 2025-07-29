import { clsx } from "clsx";
import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(
        "px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea"; 