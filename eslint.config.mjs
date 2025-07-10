import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
    rules: {
        'vue/multi-word-component-names': 0
    }
})
    .prepend(eslint.configs.recommended)
    .prepend(...tsEslint.configs.recommended);
