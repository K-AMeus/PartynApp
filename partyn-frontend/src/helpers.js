// helpers.js
import { useLocation } from 'react-router-dom';

export const useGetCurrentPage = () => {
    const location = useLocation();
    const url = location.pathname;
    return {
        isLoginPage: url.endsWith("/login"),
        isRegisterPage: url.endsWith("/register"),
        isForgotPasswordPage: url.endsWith("/forgot-password"),
    };
};
