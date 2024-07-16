import React from 'react';
import { useAuth } from './AuthProvider';

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <p className="text-center text-white">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 flex flex-col items-center justify-center">
            <div className="bg-gray-950 bg-opacity-80 p-8 rounded-2xl shadow-lg text-white max-w-md w-full">
                <h2 className="text-3xl font-bold mb-4 text-center">Profile</h2>
                <div className="flex flex-col items-center">
                    <img
                        src={user.photoURL || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="h-32 w-32 rounded-full mb-4"
                    />
                    <p className="text-xl font-semibold">{user.displayName || 'No display name'}</p>
                    <p className="text-lg">{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
