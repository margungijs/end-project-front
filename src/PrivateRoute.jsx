import { useAuth } from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user, ready } = useAuth();

    console.log(user);

    if (!ready) return null;

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
