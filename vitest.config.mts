import { defineConfig } from "vitest/dist/config.js";
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        reporters: ["verbose"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "#": path.resolve(__dirname, "./"),
        },
    },
});
