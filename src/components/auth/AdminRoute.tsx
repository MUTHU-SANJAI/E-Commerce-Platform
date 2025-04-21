import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Spinner from '../ui/Spinner';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    // If not authenticated or not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is an admin, render the protected admin route
  return <Outlet />;
};

export default AdminRoute;