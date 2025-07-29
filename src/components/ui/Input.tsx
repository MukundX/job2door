import { clsx } from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          "w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white/50",
          "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
          "transition-all duration-200 hover:border-white/30",
          "disabled:bg-white/10 disabled:text-white/50 disabled:cursor-not-allowed",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
);
Input.displayName = "Input"; 