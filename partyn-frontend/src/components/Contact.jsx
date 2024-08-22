import React, { useState } from 'react';
import '../styles/index.css';
import NavigationButton from './NavigationButton'; 

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
                        <NavigationButton text="Submit" onClick={handleSubmit} /> {/* Updated to use NavigationButton */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
