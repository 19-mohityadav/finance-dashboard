import { useApp } from "../../context/AppContext";

/**
 * Higher-Order Component (Wrapper) for declarative access control.
 * This pattern ensures that permission logic is centralized and not repeated across components.
 * 
 * Usage: 
 * <HasPermission role="admin">
 *   <AdminButton />
 * </HasPermission>
 */
export default function HasPermission({ role: requiredRole, children, fallback = null }) {
  const { role: currentRole } = useApp();

  // Basic check for exact match. Can be expanded to hierarchy checks (e.g., admin > editor > viewer)
  const hasAccess = Array.isArray(requiredRole) 
    ? requiredRole.includes(currentRole) 
    : currentRole === requiredRole;

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}
