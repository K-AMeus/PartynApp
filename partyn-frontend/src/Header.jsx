import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from './assets/logo_transparent.png';

const navigation = [
    { name: 'Events', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function getColorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash % 360);
    return `hsl(${color}, 70%, 50%)`;
}

function getInitials(email) {
    return email ? email.charAt(0).toUpperCase() : '';
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-black bg-opacity-70 fixed top-0 left-0 right-0 z-50 shadow-lg font-courier-new">
            <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16 relative">
                <div className="flex items-center">
                    <Link to="/" className="flex-shrink-0">
                        <img className="h-20 w-auto" src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="hidden md:flex space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-sky-300 hover:text-sky-500 hover:underline transition-colors duration-200 px-3 py-2 rounded-md text-lg font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="text-red-500 bg-red-900 hover:bg-red-800 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                        >
                            Admin Panel
                        </Link>
                    )}
                </div>
                <div className="hidden md:flex md:items-center space-x-4">
                    {user ? (
                        <>
                            <button
                                onClick={handleProfile}
                                className="relative flex items-center justify-center p-2 focus:outline-none"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full"
                                    />
                                ) : (
                                    <div
                                        className="h-8 w-8 rounded-full flex items-center justify-center text-white"
                                        style={{
                                            backgroundColor: getColorFromString(user.email)
                                        }}
                                    >
                                        {getInitials(user.email)}
                                    </div>
                                )}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleLogin}
                                className="text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                            >
                                Log In
                            </button>
                            <button
                                onClick={handleSignUp}
                                className="text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-40">
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full bg-black bg-opacity-80 backdrop-blur-md overflow-y-auto">
                        <div className="flex items-center justify-between p-5">
                            <Link to="/" className="flex-shrink-0">
                                <img className="h-20 w-auto" src={logo} alt="Logo" />
                            </Link>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 px-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-sky-300 hover:text-sky-500 hover:underline transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="block px-3 py-2 rounded-md text-lg font-medium text-red-500 bg-red-900 hover:bg-red-800 transition-colors duration-200"
                                >
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                        <div className="border-t border-gray-700 mt-6 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                {user ? (
                                    <>
                                        <button
                                            onClick={handleProfile}
                                            className="relative flex items-center justify-center p-2 focus:outline-none"
                                        >
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    className="h-8 w-8 rounded-full"
                                                />
                                            ) : (
                                                <div
                                                    className="h-8 w-8 rounded-full flex items-center justify-center text-white"
                                                    style={{
                                                        backgroundColor: getColorFromString(user.email)
                                                    }}
                                                >
                                                    {getInitials(user.email)}
                                                </div>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-lg font-medium w-full transition-colors duration-200"
                                        >
                                            Log out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleLogin}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium w-full transition-colors duration-200"
                                        >
                                            Log In
                                        </button>
                                        <button
                                            onClick={handleSignUp}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium w-full transition-colors duration-200"
                                        >
                                            Sign Up
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </header>
    );
}
