import React, { useEffect, useState } from 'react';
import axios from 'axios';
import location1 from './assets/location1.jpg';
import location2 from './assets/location2.jpg';
import location3 from './assets/location3.jpg';
import './index.css';

// Top pick locations with static images
const topPickLocations = [
    { id: 1, imageUrl: location1, name: 'Top Pick 1' },
    { id: 2, imageUrl: location2, name: 'Top Pick 2' },
    { id: 3, imageUrl: location3, name: 'Top Pick 3' }
];

// Function to randomly position top pick containers
const getRandomPosition = () => {
    const randomNum = Math.random();
    if (randomNum < 0.2) return 'left';
    if (randomNum < 0.4) return 'right';
    return 'none';
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [positions, setPositions] = useState([]);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1024);

    // Handle screen resize to adjust visibility of top pick containers
    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch events and set their positions
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/events');
                const sortedEvents = response.data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
                setEvents(sortedEvents);

                const newPositions = sortedEvents.map(() => getRandomPosition());
                setPositions(newPositions);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEvents();
    }, []);

    // Update the current time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const options = { timeZone: 'Europe/Tallinn', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    // Get styles for top pick containers to position them correctly
    const getTopPickStyle = (index) => {
        let topValue = index * 25;
        if (topValue > 75) topValue = 75; // Prevents top pick from going too low
        return {
            top: `${topValue}vh`,
            zIndex: 1,
            display: isWideScreen ? 'block' : 'none'
        };
    };

    return (
        <div className="relative py-6 flex flex-col justify-center sm:py-12 z-10">
            {/* Render top pick containers */}
            {isWideScreen && positions.map((position, index) => (
                position !== 'none' && (
                    <div
                        key={topPickLocations[index % topPickLocations.length].id}
                        className={`absolute w-48 h-48 p-4 rounded-lg neon-red transform ${position === 'left' ? 'left-8' : 'right-8'}`}
                        style={getTopPickStyle(index)}
                    >
                        <img src={topPickLocations[index % topPickLocations.length].imageUrl} alt={`Top Pick ${index}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                )
            ))}

            <div className="relative py-3 sm:max-w-4xl w-full sm:mx-auto px-8">
                {/* Header with live clock */}
                <div className="flex items-center justify-center mb-6 text-white font-courier-new">
                    <svg className="h-8 w-8 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="mr-4">Tartu, Estonia</span>
                    <h1 className="text-3xl font-semibold">
                        {currentTime.toLocaleTimeString('en-GB', options)}
                    </h1>
                </div>
                {/* Error message */}
                {error && <p className="text-red-500 text-center font-courier-new">{error}</p>}
                {/* Events list */}
                <div className="space-y-8">
                    {events.length === 0 && !error ? (
                        <p className="text-center text-gray-400 font-courier-new">No events available</p>
                    ) : (
                        events.map((event, index) => (
                            <div key={event.id}
                                 className="relative bg-zinc-950 text-sky-200 border-2 rounded-lg border-sky-200 neon-red p-4 transform hover:-translate-y-2 transition-all duration-300 font-courier-new"
                                 style={{ height: '270px', borderRadius: '20px' }}>
                                {/* Location information */}
                                <div className="absolute top-2 right-0 flex items-center text-white z-10"
                                     style={{ transform: 'translateY(20%) translateX(-20%)', marginLeft: '1rem' }}>
                                    <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <p className="ml-1">{event.location}</p>
                                </div>
                                <div className="flex h-full">
                                    {/* Date information */}
                                    <div
                                        className="flex-shrink-0 w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-white text-lg font-bold absolute top-4 left-4 z-20 font-courier-new">
                                        <div className="text-center">
                                            <p>{new Date(event.dateTime).getDate()}</p>
                                            <p>{new Date(event.dateTime).toLocaleString('default', {month: 'short'})}</p>
                                        </div>
                                    </div>
                                    {/* Event image */}
                                    <div className="flex-shrink-0 w-1/3 relative">
                                        <img src={`http://localhost:8080${event.imageUrl}`} alt={event.name}
                                             className="w-full h-full object-cover rounded-lg" />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 opacity-100 rounded-lg"></div>
                                    </div>
                                    <div className="ml-8 flex-1 p-4 flex flex-col justify-between">
                                        {/* Event name */}
                                        <div className="mt-12"> {/* Adjusted margin here */}
                                            <h2 className="text-2xl font-bold text-sky-200 uppercase font-courier-new">{event.name}</h2>
                                            <div className="h-4"></div>
                                            {/* Event time */}
                                            <p className="text-lg text-gray-400 font-courier-new">{new Date(event.dateTime).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 space-x-4">
                                            {/* Interested count */}
                                            <div className="flex items-center text-white space-x-4">
                                                <svg className="h-8 w-8 text-red-500" width="24" height="24"
                                                     viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24H24z"/>
                                                    <circle cx="9" cy="7" r="4"/>
                                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
                                                </svg>
                                                <p>{event.interested}</p>
                                            </div>
                                            <div className="flex items-center text-white space-x-4">
                                                {/* Facebook link */}
                                                <a href={event.facebookLink} target="_blank" rel="noopener noreferrer"
                                                   className="text-blue-500 hover:underline">
                                                    <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none"
                                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                         strokeLinejoin="round">
                                                        <path
                                                            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                                    </svg>
                                                </a>
                                                <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                                </svg>
                                                {event.ticketPrice > 0 ? <p className="font-courier-new">€{event.ticketPrice}</p> : <p className="font-courier-new">FREE</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Hover arrow */}
                                <div
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
