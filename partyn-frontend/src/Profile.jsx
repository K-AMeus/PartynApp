import React from 'react';
import { useAuth } from './AuthProvider';

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

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 text-white">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-24 w-24 rounded-full mb-4"
                    />
                ) : (
                    <div
                        className="h-24 w-24 rounded-full flex items-center justify-center text-white text-3xl mb-4"
                        style={{
                            backgroundColor: getColorFromString(user.email)
                        }}
                    >
                        {getInitials(user.email)}
                    </div>
                )}
                <h2 className="text-2xl font-semibold">{user.displayName || user.email}</h2>
                <p className="text-gray-400">{user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
