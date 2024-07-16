import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import Events from './Events';
import Locations from './Locations';
import AdminPanel from './AdminPanel';
import Header from './Header';
import Footer from './Footer';
import AuthForm from './AuthForm';
import Profile from './Profile';
import './App.css';

const AppContent = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Events />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/signup" element={<AuthForm />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/profile" element={<Profile />} />
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
