import { clsx } from "clsx";
import { SelectHTMLAttributes, forwardRef } from "react";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        "px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select"; 