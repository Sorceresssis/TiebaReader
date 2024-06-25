import { defineConfig, type BuildOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import n_path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(() => {
    const build: BuildOptions = {
        minify: true,
        outDir: n_path.resolve(__dirname, './dist/render'),
        rollupOptions: {
            input: {
                home: n_path.resolve(__dirname, './src/render/index.html'),
                thread: n_path.resolve(__dirname, './src/render/thread/index.html'),
            },
        },
        emptyOutDir: true,
    };

    return {
        base: './',
        root: n_path.resolve(__dirname, "./src/render"),
        resolve: {
            alias: {
                '@': ''
            }
        },
        build,
        plugins: [vue()],
    }
})
