import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './assets/logo_transparent.png';
import googleLogo from './assets/google_logo.png';

const AuthForm = () => {
    const { login, signup, loginWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSwitch = (path) => {
        navigate(path);
        setIsLogin(path === '/login');
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 py-6 flex flex-col justify-center items-center sm:py-12">
            <img src={logo} alt="Logo" className="h-48 mb-8" />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex space-x-4 mb-8">
                <button
                    onClick={() => handleSwitch('/login')}
                    className={`px-4 py-2 rounded-t-md ${isLogin ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
                >
                    Log In
                </button>
                <button
                    onClick={() => handleSwitch('/signup')}
                    className={`px-4 py-2 rounded-t-md ${!isLogin ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}
                >
                    Sign Up
                </button>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-gray-950 bg-opacity-80 p-8 rounded-2xl shadow-lg text-white">
                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-bold text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>
                <div className="mt-4 text-center">
                    <p>{isLogin ? 'Sign in with' : 'Sign up with'}</p>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="mt-2 flex items-center justify-center bg-white text-black py-2 px-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-200 mx-auto"
                    >
                        <img src={googleLogo} alt="Google logo" className="h-6 mr-2" />
                        Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
