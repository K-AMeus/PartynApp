function NavigationButton({ text, onClick }) {
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
export default NavigationButton;