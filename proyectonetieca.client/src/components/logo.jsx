const Logo = ({ alto, ancho, animacion }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" stroke="none" fill="#FFD700" />
            <circle cx="12" cy="12" r="8" stroke="none" fill="#F08080" />
            <circle cx="12" cy="12" r="6" stroke="none" fill="#90EE90" />
            <circle cx="12" cy="12" r="4" stroke="none" fill="#87CEEB" />
            <circle cx="12" cy="12" r="2" stroke="none" fill="#DDA0DD" />
        </svg>
    );
}

export default Logo;