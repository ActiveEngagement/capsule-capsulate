import vue from '@vitejs/plugin-vue';
import { pascalCase } from 'change-case';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

const external = [
    // ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [])
];

// vite.config.js
export default defineConfig(config => ({
    build: {
        sourcemap: config.mode === 'production',
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Capsulate',
            // the proper extensions will be added
            fileName: 'capsule-capsulate',
        },
        rollupOptions: {
            external,
            output: {
                globals: external.reduce((carry, dep) => {
                    return Object.assign(carry, {
                        [dep]: pascalCase(dep)
                    });
                }, {}),
            }
        },
    },
    plugins: [vue()],
    define: {
        'process.env': process.env
    }
}));