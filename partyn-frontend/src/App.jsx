import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import Events from './Events';
import Locations from './Locations';
import AdminPanel from './AdminPanel';
import Header from './Header';
import Footer from './Footer';
import AuthForm from './AuthForm';
import Profile from './Profile';
import './App.css';
import './index.css';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { user, isAdmin } = useAuth();
    return user && isAdmin ? <Element {...rest} /> : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
    const { user, isAdmin } = useAuth();
    return user && isAdmin ? children : <Navigate to="/" />;
};

const AppContent = () => {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 area z-0">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Events />} />
                        <Route path="/locations" element={<Locations />} />
                        <Route path="/login" element={<AuthForm />} />
                        <Route path="/signup" element={<AuthForm />} />
                        <Route path="/admin" element={<ProtectedRoute element={AdminPanel} />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;
