import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RequireAuth from './RequireAuth';

export default function RequireRole({ role, roles, children }) {
  return (
    <RequireAuth>
      <RoleGate role={role} roles={roles}>
        {children}
      </RoleGate>
    </RequireAuth>
  );
}

function RoleGate({ role, roles, children }) {
  const { user } = useAuth();
  const allowedRoles = roles || (role ? [role] : []);
  const userRole = user?.role || 'user';

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const fallbackPath =
      userRole === 'superadmin' || userRole === 'admin' ? '/admin' : '/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}
