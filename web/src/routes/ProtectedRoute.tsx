import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
        <div className="relative">
          <div className="w-14 h-14 border-4 border-ink/20 border-t-accent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-display text-xs text-ink">
            NESS
          </div>
        </div>
        <p className="mt-4 font-body text-sm font-semibold text-ink/70 uppercase tracking-widest animate-pulse">
          Memverifikasi Otorisasi...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
