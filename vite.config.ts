import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: 'src',
                replacement: path.resolve(__dirname, './src'),
            },
        ],
    },
    server: {
        hmr: true,
        https: false,
        // proxy: {
        //     '/socket': {
        //         target: 'ws://localhost:3000',
        //         ws: true,
        //         secure: false,
        //         changeOrigin: true,
        //     },
        // },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },

    css: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
})
