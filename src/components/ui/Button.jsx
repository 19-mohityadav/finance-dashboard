import { memo } from "react";

/**
 * Standardized Button component with multiple variants.
 * Optimized with React.memo to prevent unnecessary re-rendering during state updates.
 */
const Button = memo(function Button({ children, onClick, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "btn-primary",
    secondary: "rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-slate-200 dark:hover:bg-white/10",
    danger: "rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 text-sm font-bold transition-all active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;

