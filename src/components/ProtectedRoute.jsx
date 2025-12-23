import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import ForbiddenPage from '../pages/ForbiddenPage';

// allowedRoles: Mảng chứa các role được phép (VD: ['LANDLORD', 'TENANT'])
const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    // 1. Chưa đăng nhập -> Đá về Login, kèm theo state "from" để redirect ngược lại sau này
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Đã đăng nhập nhưng sai Role -> Hiện trang 403
    // Lưu ý: user.role trong DB của bạn là 'LANDLORD' hoặc 'TENANT' (theo schema.prisma)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <ForbiddenPage />;
    }

    // 3. Hợp lệ -> Cho phép truy cập (Render các Route con)
    return <Outlet />;
};

export default ProtectedRoute;