// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src',
    css: ['~/assets/css/tailwind.css'],
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    app: {
        head: {
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },

                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
                },
            ],
        },
    },
    content: {
        build: {
            markdown: {
                highlight: {
                    theme: 'one-dark-pro',
                    langs: [
                        'javascript',
                        'typescript',
                        'swift',
                        'rust',
                        'go',
                        'kotlin',
                        'dart',
                        'python',
                        'bash',
                        'json',
                        'yaml',
                    ],
                },
            },
        },
    },
    components: false,
    tailwindcss: {
        cssPath: './src/assets/css/tailwind.css',
        configPath: './tailwind.config.ts',
    },
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        'nuxt-shiki',
    ],
    shiki: {
        defaultTheme: 'one-dark-pro',
        bundledThemes: [
            'github-dark',
            'github-light',
            'one-dark-pro',
            'one-light',
        ],
        bundledLangs: [
            'go',
            'typescript',
            'javascript',
            'rust',
            'dart',
            'html',
            'swift',
            'kotlin',
            'bash',
            'sh',
            'http',
            'hurl',
        ],
    },
});
