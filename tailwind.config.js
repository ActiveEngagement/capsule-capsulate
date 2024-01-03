/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './demo/**/*.vue',
        './node_modules/@vue-interface/**/src/*.{vue,ts}',
    ],
    presets: [
        require('@vue-interface/form-control/tailwindcss')
    ]
};

