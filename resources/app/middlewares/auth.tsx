import React, { ReactElement } from 'react';
import { Navigate, BrowserRouter as Router } from 'react-router-dom';

interface AuthMiddlewareProps {
    children: ReactElement;
}

export const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
    const isAuthenticated = (): boolean => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    return isAuthenticated()
        ? children
        : (
            <Router basename='/'>
                <Navigate to="/login" />
            </Router>
        );
};