import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import inspect from 'vite-plugin-inspect';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        inspect({
            build: true,
            outputDir: '.vite-inspect',
        }),
        vue(),
        svgr(),
        compression(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
