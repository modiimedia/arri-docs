import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
    content: ['src/**/*.{vue,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#eab308', // Arri yellow
                    light: '#facc15',
                    dark: '#ca8a04',
                },
                background: {
                    DEFAULT: '#0a0a0c', // Dark modern terminal background
                    card: '#121215',
                    border: '#1f1f23',
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
        },
    },
    plugins: [typography],
} satisfies Config;
