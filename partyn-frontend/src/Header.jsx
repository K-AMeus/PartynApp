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

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
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

    return (
        <header className="bg-gradient-to-r from-purple-900 to-orange-800 fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
            <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16 relative">
                <div className="flex items-center">
                    <Link to="/" className="flex-shrink-0">
                        <img className="h-36 w-auto -mb-0" src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="hidden md:flex space-x-10">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-white hover:bg-gray-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex md:items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-white">{user.displayName}</span>
                            <button
                                onClick={handleProfile}
                                className="flex items-center justify-center p-2 focus:outline-none"
                            >
                                <img
                                    src={user.photoURL || 'https://via.placeholder.com/40'} // Placeholder if no photo
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            </button>
                            <button
                                onClick={logout}
                                className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleLogin}
                                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Log In
                            </button>
                            <button
                                onClick={handleSignUp}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium"
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
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full bg-gradient-to-r from-purple-950 via-pink-700 to-orange-700 backdrop-blur-md overflow-y-auto">
                        <div className="flex items-center justify-between p-5">
                            <Link to="/" className="flex-shrink-0">
                                <img className="h-16 w-auto -mb-8" src={logo} alt="Logo" />
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
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:bg-opacity-75"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 mt-6 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                {user ? (
                                    <>
                                        <span className="text-white">{user.displayName}</span>
                                        <button
                                            onClick={handleProfile}
                                            className="flex items-center justify-center p-2 focus:outline-none"
                                        >
                                            <img
                                                src={user.photoURL || 'https://via.placeholder.com/40'} // Placeholder if no photo
                                                alt="Profile"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                                        >
                                            Log out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleLogin}
                                            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                                        >
                                            Log In
                                        </button>
                                        <button
                                            onClick={handleSignUp}
                                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
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
