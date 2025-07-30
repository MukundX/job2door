import { clsx } from "clsx";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-white/5 backdrop-blur-sm border border-white/10",
      elevated: "bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl shadow-black/20",
      outlined: "bg-transparent border-2 border-white/20"
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-xl p-6 transition-all duration-200",
          variants[variant],
          className
        )}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);
Card.displayName = "Card";