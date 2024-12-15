import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import prettierConfig from 'eslint-config-prettier';

export default createConfigForNuxt({}).append([
    prettierConfig,
    {
        ignores: ['node_modules', '.nuxt', 'dist', '.output'],
        rules: {
            'vue/multi-word-component-names': 0
        }
    },
]);
