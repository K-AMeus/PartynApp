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
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Events />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/signup" element={<AuthForm />} />
                <Route path="/admin" element={<ProtectedRoute element={AdminPanel} />} />                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
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
