/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ink: '#07080b',
                panel: '#0b0d11',
                silk: '#e9e4d8',
                muted: '#8d9096',
                signal: '#ff5c34',
                line: 'rgba(233, 228, 216, 0.1)',
                'line-strong': 'rgba(233, 228, 216, 0.22)',
                copper: {
                    DEFAULT: '#c07a3e',
                    bright: '#e2a862',
                    dim: '#8a5a2e',
                },
            },
            fontFamily: {
                display: ['"Space Grotesk Variable"', '"IBM Plex Sans Variable"', 'sans-serif'],
                sans: ['"IBM Plex Sans Variable"', 'system-ui', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
            },
        },
    },
    plugins: [],
};
