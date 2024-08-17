import React, { useState } from 'react';
import '../styles/index.css';

function SvgButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative inline-flex items-center p-0 rounded-lg text-white transition-all duration-200"
        >
            <svg
                width="140"
                height="60"
                viewBox="0 0 122 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-200 hover:filter hover:brightness-125"
            >
                <g filter="url(#filter0_f_29_992)">
                    <rect
                        x="9"
                        y="9"
                        width="104"
                        height="32"
                        rx="6"
                        fill="#1400FF"
                        fillOpacity="0.71"
                    />
                    <rect
                        x="11.5"
                        y="11.5"
                        width="99"
                        height="27"
                        rx="3.5"
                        stroke="white"
                        strokeWidth="5"
                    />
                </g>
                <rect
                    x="9.5"
                    y="9.5"
                    width="103"
                    height="31"
                    rx="5.5"
                    fill="black"
                    stroke="#65C8FF"
                    className="transition-all duration-200 hover:stroke-white"
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                >
                    {text}
                </text>
                <defs>
                    <filter
                        id="filter0_f_29_992"
                        x="0.1"
                        y="0.1"
                        width="121.8"
                        height="49.8"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation="4.45"
                            result="effect1_foregroundBlur_29_992"
                        />
                    </filter>
                </defs>
            </svg>
        </button>
    );
}

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        venueName: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Future form submission logic
        console.log('Form submitted:', formData);
    };

    return (
        <div className="relative min-h-screen flex flex-col text-white font-courier-new">
            <div className="absolute inset-0 area z-0">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="relative py-12 sm:max-w-4xl w-full sm:mx-auto px-8 flex-grow">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
                <p className="text-lg text-gray-400 text-center mb-8">
                    Are you a club or bar owner looking to host events on our platform? Fill out the form below, and
                    we'll get in touch with you soon!
                </p>

                <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-lg font-medium mb-2 text-left">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-zinc-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-lg font-medium mb-2 text-left">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-zinc-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="venueName" className="block text-lg font-medium mb-2 text-left">Venue Name</label>
                        <input
                            type="text"
                            id="venueName"
                            name="venueName"
                            value={formData.venueName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-zinc-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-lg font-medium mb-2 text-left">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-zinc-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block text-lg font-medium mb-2 text-left">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-zinc-950 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                            rows="5"
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <SvgButton text="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
