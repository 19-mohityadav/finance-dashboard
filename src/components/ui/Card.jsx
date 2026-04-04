import { memo } from "react";

/**
 * Reusable Card component for consistent layout blocks with optional glassmorphism.
 * Optimized with React.memo to ensure container stability during global state updates.
 */
const Card = memo(function Card({ title, children, className = "", extra }) {
  return (
    <div className={`card overflow-hidden transition-all duration-300 ${className}`}>
      {(title || extra) && (
        <div className="mb-6 flex items-center justify-between">
          {title && <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      {children}
    </div>
  );
});

export default Card;

