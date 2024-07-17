import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const AdminPanel = () => {
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [topPick, setTopPick] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const auth = getAuth();

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const idTokenResult = await auth.currentUser.getIdTokenResult();
                setIsAdmin(!!idTokenResult.claims.admin);
            } else {
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [user, auth]);

    if (isAdmin === null) {
        // Loading state while checking admin status
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;  // Redirect to home page if not authenticated
    }

    if (!isAdmin) {
        return <Navigate to="/" />;  // Redirect to home page if not an admin
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            name,
            dateTime,
            ticketPrice: parseInt(ticketPrice),
            description,
            location,
            topPick,
        };

        const formData = new FormData();
        formData.append('event', JSON.stringify(eventData));
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post('http://localhost:8080/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Event posted successfully!');
            setError(null);
            navigate('/');
        } catch (error) {
            setError('Failed to post event');
            setSuccess(null);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 py-6 flex items-center justify-center sm:py-12">
            <div className="relative w-full max-w-4xl bg-gray-950 bg-opacity-80 text-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Post a New Event</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="dateTime">Date and Time</label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="ticketPrice">Ticket Price</label>
                        <input
                            type="number"
                            id="ticketPrice"
                            value={ticketPrice}
                            onChange={(e) => setTicketPrice(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="topPick"
                            checked={topPick}
                            onChange={(e) => setTopPick(e.target.checked)}
                            className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <label className="block text-sm font-bold" htmlFor="topPick">Top Pick</label>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="file">Upload Image</label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;
