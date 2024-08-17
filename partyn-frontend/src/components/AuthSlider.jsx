import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import googleLogo from './assets/google_logo.png';
import NavigationButton from './NavigationButton.jsx';

const AuthSlider = () => {
    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setIsLogin(searchParams.get('mode') !== 'signup');
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
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

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center sm:py-12 bg-black bg-opacity-70 z-10">
            <div className="relative w-full max-w-4xl h-auto bg-zinc-950 rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full flex">
                    {/* Login Form Panel */}
                    <div className={`flex-shrink-0 w-full md:w-1/2 p-6 md:py-12 transition-transform duration-700 ease-in-out ${isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <h2 className="text-4xl font-bold text-white mb-8 font-courier-new text-center">Login</h2>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-400 text-left font-courier-new">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-sky-500 font-courier-new"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-gray-400 text-left font-courier-new">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-sky-500 font-courier-new"
                                    required
                                />
                            </div>
                            <div className="flex justify-center items-center space-x-4">
                                <NavigationButton text="Log In" onClick={handleSubmit} />
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="flex items-center justify-center bg-white text-black rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
                                    style={{ height: '37px', width: '127px' }}
                                >
                                    <img src={googleLogo} alt="Google logo" className="h-5 mr-2" />
                                    Google
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sign Up Form Panel */}
                    <div className={`flex-shrink-0 w-full md:w-1/2 p-6 md:py-12 transition-transform duration-700 ease-in-out ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <h2 className="text-4xl font-bold text-white mb-8 font-courier-new text-center">Sign Up</h2>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-400 text-left font-courier-new">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-sky-500 font-courier-new"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-gray-400 text-left font-courier-new">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-sky-500 font-courier-new"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-400 text-left font-courier-new">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-sky-500 font-courier-new"
                                    required
                                />
                            </div>
                            <div className="flex justify-center items-center space-x-4">
                                <NavigationButton text="Sign Up" onClick={handleSubmit} />
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="flex items-center justify-center bg-white text-black rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
                                    style={{ height: '37px', width: '127px' }}
                                >
                                    <img src={googleLogo} alt="Google logo" className="h-5 mr-2" />
                                    Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Overlay Panel */}
                <div
                    className={`absolute top-0 left-0 w-full h-full md:w-1/2 bg-gradient-to-r from-zinc-950 via-red-900 to-zinc-950 transition-transform duration-700 ease-in-out transform ${
                        isLogin ? 'translate-x-full' : 'translate-x-0'
                    } flex items-center justify-center p-8 text-white font-courier-new`}
                >
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">{isLogin ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
                        <p className="mb-8">
                            {isLogin
                                ? 'Enter your personal details and start your journey with us.'
                                : 'To keep connected with us please login with your personal info.'}
                        </p>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="border border-white text-white rounded-full py-2 px-8 font-semibold transition duration-200 hover:bg-white hover:text-black font-courier-new"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSlider;
