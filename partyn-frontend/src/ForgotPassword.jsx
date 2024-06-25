// ForgotPassword.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className="flex flex-col gap-4 mx-auto h-full w-full items-center justify-center lg:w-2/3">
            <h1 className="mb-2 text-6xl text-black text-center lg:mb-4">Forgot password</h1>
            <p className="text-center">Forgot password description</p>
            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your email" name="email" />
            <button className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send password reset email</button>
        </div>
    );
};

export default ForgotPassword;
