import { useAuth } from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user, ready } = useAuth();

    if (!ready) return null;

    if (!user && ready) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
