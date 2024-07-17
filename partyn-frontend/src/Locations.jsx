import React from 'react';
import location1 from './assets/location1.jpg';
import location2 from './assets/location2.jpg';
import location3 from './assets/location3.jpg';

const hardcodedLocations = [
    { id: 1, name: 'Genialistide Klubi', description: 'A place for creative and cultural events.', imageUrl: location1 },
    { id: 2, name: 'Naiiv', description: 'A cozy bar with live music and performances.', imageUrl: location2 },
    { id: 3, name: 'Kivi Baar', description: 'A popular spot for drinks and socializing.', imageUrl: location3 }
];

const Locations = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-r from-purple-950 to-orange-700 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-4xl w-full sm:mx-auto px-8">
                <div className="flex items-center justify-center mb-6 text-white">
                    <h1 className="text-3xl font-semibold">Locations</h1>
                </div>
                <div className="space-y-8">
                    {hardcodedLocations.map((location) => (
                        <div key={location.id}
                             className="relative bg-gray-900 shadow-md rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                             style={{ height: '270px' }}>
                            <div className="flex h-full">
                                {/* Location image */}
                                <div className="flex-shrink-0 w-1/3 relative">
                                    <img src={location.imageUrl} alt={location.name}
                                         className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 opacity-100"></div>
                                </div>
                                <div className="ml-8 flex-1 p-4 flex flex-col justify-between">
                                    {/* Location name */}
                                    <div className="mt-12"> {/* Adjusted margin here */}
                                        <h2 className="text-2xl font-bold text-white uppercase">{location.name}</h2>
                                        <div className="h-4"></div>
                                        {/* Location description */}
                                        <p className="text-lg text-gray-400">{location.description}</p>
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Locations;
