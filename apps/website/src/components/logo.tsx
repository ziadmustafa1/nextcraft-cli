import React from 'react'

export function Logo({ className = "h-8 w-8", ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className={className}
            fill="none"
            {...props}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" className="text-blue-500" />
                    <stop offset="100%" stopColor="currentColor" className="text-purple-600" />
                </linearGradient>
                <linearGradient id="logo-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
            </defs>

            {/* Main N Shape - Isometric Block Style */}
            <path
                d="M64 40 L128 72 L128 216 L64 184 Z"
                fill="url(#logo-gradient-dark)"
                opacity="0.9"
            />
            <path
                d="M128 72 L192 40 L192 184 L128 216 Z"
                fill="url(#logo-gradient-dark)"
                opacity="0.7"
            />
            <path
                d="M64 40 L128 8 L192 40 L128 72 Z"
                fill="url(#logo-gradient-dark)"
                opacity="1"
            />

            {/* Connection/Circuit accents to imply "Tech/Code" */}
            <circle cx="128" cy="8" r="8" fill="white" fillOpacity="0.5" />
            <circle cx="64" cy="40" r="8" fill="white" fillOpacity="0.5" />
            <circle cx="192" cy="40" r="8" fill="white" fillOpacity="0.5" />
        </svg>
    )
}
