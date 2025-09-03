import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
          '.styles': path.resolve(__dirname, './src/styles'),
        },
      },
});

