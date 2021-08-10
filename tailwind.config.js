module.exports = {
    mode: 'jit',
    prefix: 'tw-',
    purge: [
        './public/**/*.html',
        './src/renderer/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        // require('tailwindcss-important'),
    ],
};
