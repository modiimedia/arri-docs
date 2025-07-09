import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        docs: defineCollection({
            type: 'page',
            source: 'content/docs/**/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
            }),
        }),
    },
});
