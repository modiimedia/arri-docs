import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'DM Sans',
                    'DM Sans fallback',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            colors: {
                arrired: {
                    50: '#FFBFD2',
                    100: '#FF85A9',
                    200: '#FB5687',
                    300: '#F53A72',
                    400: '#E7235D',
                    500: '#DD0A49',
                    DEFAULT: '#DD0A49',
                    600: '#C31147',
                    700: '#A11C44',
                    800: '#662035',
                    900: '#3A111E',
                    950: '#1A0B0F',
                },
                arrigray: {
                    50: '#E5E3EE',
                    100: '#DAD7E8',
                    200: '#C2BDD4',
                    300: '#A8A3BA',
                    400: '#A8A3BA',
                    500: '#918DA5',
                    DEFAULT: '#918DA5',
                    600: '#716D83',
                    700: '#595666',
                    800: '#44414F',
                    // 900: "#292731",
                    900: '#131217',
                    950: '#131217',
                },
                green: {
                    50: '#EFFDF5',
                    100: '#D9FBE8',
                    200: '#B3F5D1',
                    300: '#75EDAE',
                    400: '#00DC82',
                    500: '#00C16A',
                    600: '#00A155',
                    700: '#007F45',
                    800: '#016538',
                    900: '#0A5331',
                    950: '#052e16',
                },
            },
        },
    },
};
