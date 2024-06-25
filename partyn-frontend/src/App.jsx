import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Events from './Events.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import AdminPanel from './AdminPanel.jsx';
import Locations from './Locations.jsx';
import LoginLayout from './LoginLayout.jsx';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            // Check if token has expired
            if (decodedToken.exp < currentTime) {
                handleLogoutClick();
                return;
            }

            setIsAuthenticated(true);
            setUser({
                username: decodedToken.sub,
                authorities: decodedToken.roles.split(' ')
            });
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleCloseOverlay = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    const handleLoginSuccess = (jwt, user) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem('token', jwt);
        setShowLogin(false);
        validateToken(jwt);
    };

    const handleRegisterSuccess = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const handleLogoutClick = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    const isAdmin = user?.authorities?.includes('ADMIN');
    console.log('isAdmin:', isAdmin);

    return (
        <Router>
            <div className="App">
                <Header
                    onLoginClick={handleLoginClick}
                    onLogoutClick={handleLogoutClick}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    isAdmin={isAdmin}
                />
                <Routes>
                    <Route path="/" element={<Events />} />
                    {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
                    <Route path="/locations" element={<Locations />} />
                </Routes>
                <Footer />
                {(showLogin || showRegister) && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className={`relative w-full max-w-2xl p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transition-transform transform ${showLogin ? 'slide-in-right' : 'slide-in-left'}`}>
                            <button
                                className="absolute top-0 right-0 m-4 text-gray-800 text-2xl"
                                onClick={handleCloseOverlay}
                            >
                                &times;
                            </button>
                            {showLogin && <Login onLoginSuccess={handleLoginSuccess} onShowRegister={handleRegisterClick} />}
                            {showRegister && <Register onRegisterSuccess={handleRegisterSuccess} onShowLogin={handleLoginClick} />}
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;
