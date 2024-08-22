import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthProvider';
import '../styles/index.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1024);

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/events');
                const sortedEvents = response.data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
                setEvents(sortedEvents.map(event => ({
                    ...event,
                    likes: event.likes || 0,
                    liked: false,
                })));
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }


    const handleLike = useCallback(
        debounce(async (eventId) => {
            if (!user) {
                navigate('/auth?mode=login');
                return;
            }

            try {
                const idToken = await user.getIdToken();
                await axios.post(`http://localhost:8080/events/${eventId}/like`, {}, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                });

                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event.id === eventId
                            ? {
                                ...event,
                                likes: event.liked ? event.likes - 1 : event.likes + 1,
                                liked: !event.liked,
                            }
                            : event
                    )
                );
            } catch (error) {
                console.error('Error liking event:', error);
            }
        }, 300),
        [user, navigate]
    );

    const truncateDescription = (description, length = 80) => {
        if (description.length <= length) return description;
        return description.substring(0, length) + '...';
    };

    return (
        <div className="relative py-6 flex flex-col justify-center sm:py-12 z-10">
            <div className="relative py-3 sm:max-w-6xl w-full sm:mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-center mb-6 text-white font-courier-new">
                    <svg className="h-8 w-8 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="mr-4">Tartu, Estonia</span>
                    <h1 className="text-3xl font-bold">
                        {currentTime.toLocaleTimeString('en-GB', {
                            timeZone: 'Europe/Tallinn',
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })}
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
                            <div key={event.id}className="relative bg-zinc-950 text-white border-2 rounded-lg border-sky-200 neon-red p-6 transform hover:-translate-y-2 transition-all duration-300 font-courier-new flex flex-col sm:flex-row"

                                 style={{ height: isWideScreen ? '320px' : 'auto', borderRadius: '20px' }}>

                                {/* Date information */}
                                <div className="flex h-full">
                                    <div
                                        className="flex-shrink-0 w-20 h-20 rounded-full bg-zinc-950 text-white border-2 border-sky-200 neon-red p-3 font-bold absolute top-4 left-4 z-20 font-courier-new neon-red"
                                        style={{transform: 'rotate(-15deg)'}}>
                                        <div className="text-center">
                                            <p>{new Date(event.dateTime).getDate()}</p>
                                            <p>{new Date(event.dateTime).toLocaleString('default', {month: 'short'})}</p>
                                        </div>
                                    </div>
                                </div>


                                {/* Event image - Left 1/3 */}
                                <div className="w-1/3 relative">
                                    <img src={event.imageUrl} alt={event.name}
                                         className="w-full h-full object-cover rounded-lg"/>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 opacity-100 rounded-lg"></div>
                                </div>

                                {/* Event Name, Description - Middle 1/3 */}
                                <div className="w-1/3 flex flex-col justify-start pl-14 mt-8 text-left">
                                    <h2 className="text-[1.50rem] font-dela-gothic-one text-white uppercase">{event.name}</h2>
                                    <p className="text-base text-gray-200 font-dela-gothic-one3 mt-4">
                                        {truncateDescription(event.description, 100)}
                                    </p>
                                    <p className="text-lg text-white font-dela-gothic-one3 mt-4 hover:text-red-500 transition-colors">
                                        Read More -&gt;
                                    </p>
                                </div>

                                {/* Location, Time, Interested Count, Likes, and Facebook Link - Right 1/3 */}
                                <div className="w-1/3 flex flex-col justify-between items-start pl-20">
                                    <div className="flex items-center space-x-1 mt-8 mb-3 overflow-visible">

                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                                  stroke="#EF4444"/>
                                            <circle cx="12" cy="10" r="3"
                                                    stroke="#EF4444"/>
                                        </svg>
                                        <p className="text-base text-gray-200 font-dela-gothic-one2 ml-2">{event.location}</p>
                                    </div>

                                    {/* datetime */}
                                    <div className="flex items-center">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                                                    fill="#EF4444"/>
                                                <path
                                                    d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                                                    fill="#EF4444" strokeWidth="200"/>
                                            </svg>
                                            <p className="text-base text-gray-200 font-dela-gothic-one2 ml-2">
                                                {new Date(event.dateTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                })} - {new Date(event.endDateTime).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Ticket Price */}
                                    <div className="flex items-center space-x-3">
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                             width="24" height="24"
                                             viewBox="0 0 512 512"
                                             preserveAspectRatio="xMidYMid meet">

                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                               fill="red" stroke="#EF4444" strokeWidth={200}>
                                                <path d="M3920 4683 c-8 -3 -775 -289 -1705 -636 -1054 -393 -1712 -633 -1747
                                                    -639 -173 -24 -324 -129 -403 -279 -57 -109 -65 -161 -65 -447 0 -334 -5 -326
                                                    190 -335 166 -8 266 -54 356 -164 64 -79 88 -149 88 -263 0 -114 -24 -184 -88
                                                    -263 -90 -110 -190 -156 -356 -164 -195 -9 -190 -1 -190 -335 0 -286 8 -338
                                                    65 -447 59 -113 168 -207 290 -254 60 -22 64 -22 765 -27 388 -3 1353 -3 2145
                                                    0 l1440 5 60 22 c124 47 230 140 290 254 57 109 65 161 65 452 l0 259 -34 34
                                                    c-33 33 -36 34 -113 34 -167 0 -272 38 -366 131 -168 168 -168 431 0 597 93
                                                    92 201 132 359 132 151 0 154 7 154 332 0 279 -8 335 -59 436 -71 141 -197
                                                    241 -356 281 l-40 11 -188 552 c-118 349 -198 567 -215 592 -36 52 -105 102
                                                    -166 121 -48 14 -145 19 -176 8z m130 -218 c16 -8 34 -24 40 -35 15 -27 340
                                                    -991 340 -1007 0 -11 -291 -13 -1647 -13 -905 0 -1643 3 -1640 6 12 13 2833
                                                    1063 2855 1063 13 1 36 -6 52 -14z m-2340 -1341 c0 -70 2 -78 29 -105 21 -21
                                                    39 -29 65 -29 81 0 116 43 116 144 l0 66 1373 -2 1372 -3 53 -24 c65 -29 143
                                                    -113 168 -178 14 -38 18 -89 22 -240 l4 -193 -34 0 c-66 -1 -175 -30 -258 -71
                                                    -162 -79 -293 -244 -334 -419 -20 -83 -20 -217 0 -300 41 -175 172 -340 334
                                                    -419 83 -41 192 -70 258 -71 l34 0 -4 -192 c-4 -152 -8 -203 -22 -241 -25 -65
                                                    -103 -149 -168 -178 l-53 -24 -1372 -3 -1373 -2 0 66 c0 101 -35 144 -116 144
                                                    -26 0 -44 -8 -65 -29 -27 -27 -29 -35 -29 -106 l0 -76 -627 3 -628 3 -53 24
                                                    c-65 29 -143 113 -168 178 -14 38 -18 89 -22 241 l-4 192 34 0 c66 1 175 30
                                                    258 71 162 79 293 244 334 419 20 83 20 217 0 300 -41 175 -172 340 -334 419
                                                    -83 40 -192 70 -257 71 l-33 0 0 165 c0 165 10 246 37 299 21 41 92 115 127
                                                    133 78 41 91 42 724 42 l612 1 0 -76z"/>
                                                <path d="M1774 2650 c-12 -4 -31 -21 -43 -36 -20 -25 -21 -37 -21 -243 0 -240
                                                    2 -251 65 -277 46 -19 100 -2 125 39 18 29 20 52 20 234 0 111 -4 213 -10 227
                                                    -11 29 -65 66 -95 65 -11 0 -30 -4 -41 -9z"/>
                                                <path d="M1783 1748 c-17 -4 -41 -20 -52 -34 -20 -25 -21 -40 -21 -245 l0
                                                    -219 28 -30 c50 -57 146 -42 172 26 6 14 10 116 10 227 0 184 -2 205 -20 235
                                                    -11 17 -21 32 -22 32 -2 0 -17 4 -33 8 -17 5 -44 5 -62 0z"/>
                                            </g>
                                        </svg>

                                        <p className="text-base text-gray-200 font-dela-gothic-one2">{event.ticketPrice > 0 ? `€${event.ticketPrice}` : 'FREE'}</p>
                                    </div>

                                    {/* Like button */}
                                    <div className="flex items-center text-red-500 cursor-pointer mt-4"
                                         onClick={() => handleLike(event.id)}>
                                        <div className="flex items-center space-x-3">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999Z"
                                                    stroke={event.liked ? '#EF4444' : '#EF4444'}
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p className="text-base text-gray-200 font-dela-gothic-one2">{event.likes}</p>
                                        </div>
                                    </div>

                                    {/* Facebook link */}
                                    <div className="mt-4">
                                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                                           className="facebook-button-link">
                                            <svg width="122" height="50" viewBox="0 0 122 50" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g filter="url(#filter0_f_29_992)">
                                                    <rect x="9" y="9" width="104" height="32" rx="6" fill="#1400FF"
                                                          fillOpacity="0.71"/>
                                                    <rect x="11.5" y="11.5" width="99" height="27" rx="3.5"
                                                          stroke="white" strokeWidth="5"/>
                                                </g>
                                                <rect x="9.5" y="9.5" width="103" height="31" rx="5.5" fill="black"
                                                      stroke="#65C8FF"/>
                                                <path
                                                    d="M40 18H37.8182C36.8538 18 35.9288 18.3424 35.2469 18.9519C34.5649 19.5614 34.1818 20.388 34.1818 21.25V23.2H32V25.8H34.1818V31H37.0909V25.8H39.2727L40 23.2H37.0909V21.25C37.0909 21.0776 37.1675 20.9123 37.3039 20.7904C37.4403 20.6685 37.6253 20.6 37.8182 20.6H40V18Z"
                                                    stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path
                                                    d="M57.4453 20.7266C57.6224 20.7266 57.7474 20.7682 57.8203 20.8516C57.8984 20.9297 57.9375 21.0651 57.9375 21.2578C57.9375 21.4505 57.8984 21.5885 57.8203 21.6719C57.7474 21.75 57.6224 21.7891 57.4453 21.7891H55.5547V28.9375H59.4219V26.3672C59.4219 26.1849 59.4661 26.0547 59.5547 25.9766C59.6432 25.8984 59.7943 25.8594 60.0078 25.8594C60.2214 25.8594 60.3724 25.8984 60.4609 25.9766C60.5495 26.0547 60.5938 26.1849 60.5938 26.3672V29.4688C60.5938 29.6615 60.5547 29.7995 60.4766 29.8828C60.4036 29.9609 60.2786 30 60.1016 30H53.1172C52.9401 30 52.8125 29.9609 52.7344 29.8828C52.6615 29.7995 52.625 29.6615 52.625 29.4688C52.625 29.276 52.6615 29.1406 52.7344 29.0625C52.8125 28.9792 52.9401 28.9375 53.1172 28.9375H54.3828V21.7891H53.1172C52.9401 21.7891 52.8125 21.75 52.7344 21.6719C52.6615 21.5885 52.625 21.4505 52.625 21.2578C52.625 21.0651 52.6615 20.9297 52.7344 20.8516C52.8125 20.7682 52.9401 20.7266 53.1172 20.7266H57.4453ZM66.6719 22.7812C66.849 22.7812 66.974 22.8229 67.0469 22.9062C67.125 22.9844 67.1641 23.1198 67.1641 23.3125V28.9375H69.6719C69.849 28.9375 69.974 28.9792 70.0469 29.0625C70.125 29.1406 70.1641 29.276 70.1641 29.4688C70.1641 29.6615 70.125 29.7995 70.0469 29.8828C69.974 29.9609 69.849 30 69.6719 30H63.5469C63.3698 30 63.2422 29.9609 63.1641 29.8828C63.0911 29.7995 63.0547 29.6615 63.0547 29.4688C63.0547 29.276 63.0911 29.1406 63.1641 29.0625C63.2422 28.9792 63.3698 28.9375 63.5469 28.9375H65.9922V23.8438H64.0156C63.8385 23.8438 63.7109 23.8047 63.6328 23.7266C63.5599 23.6432 63.5234 23.5052 63.5234 23.3125C63.5234 23.1198 63.5599 22.9844 63.6328 22.9062C63.7109 22.8229 63.8385 22.7812 64.0156 22.7812H66.6719ZM66.4219 19.3516C66.7083 19.3516 66.9036 19.3906 67.0078 19.4688C67.112 19.5417 67.1641 19.6719 67.1641 19.8594V20.875C67.1641 21.0625 67.112 21.1953 67.0078 21.2734C66.9036 21.3464 66.7083 21.3828 66.4219 21.3828C66.1354 21.3828 65.9401 21.3464 65.8359 21.2734C65.7318 21.1953 65.6797 21.0625 65.6797 20.875V19.8594C65.6797 19.6719 65.7318 19.5417 65.8359 19.4688C65.9401 19.3906 66.1354 19.3516 66.4219 19.3516ZM76.8672 22.6094C77.3411 22.6094 77.7526 22.7135 78.1016 22.9219C78.4505 23.125 78.7188 23.4193 78.9062 23.8047C79.0938 24.1901 79.1875 24.6406 79.1875 25.1562V28.9375H79.8281C80.0052 28.9375 80.1302 28.9792 80.2031 29.0625C80.2812 29.1406 80.3203 29.276 80.3203 29.4688C80.3203 29.6615 80.2812 29.7995 80.2031 29.8828C80.1302 29.9609 80.0052 30 79.8281 30H77.2969C77.1198 30 76.9922 29.9609 76.9141 29.8828C76.8411 29.7995 76.8047 29.6615 76.8047 29.4688C76.8047 29.276 76.8411 29.1406 76.9141 29.0625C76.9922 28.9792 77.1198 28.9375 77.2969 28.9375H78.0156V25.2734C78.0156 24.8099 77.9089 24.4427 77.6953 24.1719C77.4818 23.901 77.1667 23.7656 76.75 23.7656C76.3073 23.7656 75.8932 23.8932 75.5078 24.1484C75.1276 24.4036 74.8229 24.7552 74.5938 25.2031C74.3646 25.651 74.25 26.151 74.25 26.7031V28.9375H74.9688C75.1458 28.9375 75.2708 28.9792 75.3438 29.0625C75.4219 29.1406 75.4609 29.276 75.4609 29.4688C75.4609 29.6615 75.4219 29.7995 75.3438 29.8828C75.2708 29.9609 75.1458 30 74.9688 30H72.4375C72.2604 30 72.1328 29.9609 72.0547 29.8828C71.9818 29.7995 71.9453 29.6615 71.9453 29.4688C71.9453 29.276 71.9818 29.1406 72.0547 29.0625C72.1328 28.9792 72.2604 28.9375 72.4375 28.9375H73.0781V23.8438H72.2812C72.1042 23.8438 71.9766 23.8047 71.8984 23.7266C71.8255 23.6432 71.7891 23.5052 71.7891 23.3125C71.7891 23.1198 71.8255 22.9844 71.8984 22.9062C71.9766 22.8229 72.1042 22.7812 72.2812 22.7812H73.6797C73.8568 22.7812 73.9818 22.8229 74.0547 22.9062C74.1328 22.9844 74.1719 23.1198 74.1719 23.3125V24.25C74.5156 23.7188 74.9167 23.3125 75.375 23.0312C75.8385 22.75 76.3359 22.6094 76.8672 22.6094ZM89.3438 28.9375C89.5208 28.9375 89.6458 28.9792 89.7188 29.0625C89.7969 29.1406 89.8359 29.276 89.8359 29.4688C89.8359 29.6615 89.7969 29.7995 89.7188 29.8828C89.6458 29.9609 89.5208 30 89.3438 30H86.8125C86.6354 30 86.5078 29.9609 86.4297 29.8828C86.3568 29.7995 86.3203 29.6615 86.3203 29.4688C86.3203 29.276 86.3568 29.1406 86.4297 29.0625C86.5078 28.9792 86.6354 28.9375 86.8125 28.9375H87.375L85.4141 26.6094L83.9922 27.8594V28.9375H84.5625C84.7396 28.9375 84.8646 28.9792 84.9375 29.0625C85.0156 29.1406 85.0547 29.276 85.0547 29.4688C85.0547 29.6615 85.0156 29.7995 84.9375 29.8828C84.8646 29.9609 84.7396 30 84.5625 30H81.9531C81.776 30 81.6484 29.9609 81.5703 29.8828C81.4974 29.7995 81.4609 29.6615 81.4609 29.4688C81.4609 29.276 81.4974 29.1406 81.5703 29.0625C81.6484 28.9792 81.776 28.9375 81.9531 28.9375H82.8203V20.8125H81.7969C81.6198 20.8125 81.4922 20.7734 81.4141 20.6953C81.3411 20.612 81.3047 20.474 81.3047 20.2812C81.3047 20.0885 81.3411 19.9531 81.4141 19.875C81.4922 19.7917 81.6198 19.75 81.7969 19.75H83.5C83.6771 19.75 83.8021 19.7917 83.875 19.875C83.9531 19.9531 83.9922 20.0885 83.9922 20.2812V26.4688L86.9688 23.8438H86.4141C86.237 23.8438 86.1094 23.8047 86.0312 23.7266C85.9583 23.6432 85.9219 23.5052 85.9219 23.3125C85.9219 23.1198 85.9583 22.9844 86.0312 22.9062C86.1094 22.8229 86.237 22.7812 86.4141 22.7812H89.0234C89.2005 22.7812 89.3255 22.8229 89.3984 22.9062C89.4766 22.9844 89.5156 23.1198 89.5156 23.3125C89.5156 23.5052 89.4766 23.6432 89.3984 23.7266C89.3255 23.8047 89.2005 23.8438 89.0234 23.8438H88.5625L86.2656 25.8672L88.8906 28.9375H89.3438Z"
                                                    fill="white"/>
                                                <defs>
                                                    <filter id="filter0_f_29_992" x="0.1" y="0.1" width="121.8"
                                                            height="49.8" filterUnits="userSpaceOnUse"
                                                            colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                        <feBlend mode="normal" in="SourceGraphic"
                                                                 in2="BackgroundImageFix" result="shape"/>
                                                        <feGaussianBlur stdDeviation="4.45"
                                                                        result="effect1_foregroundBlur_29_992"/>
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </a>
                                    </div>
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
