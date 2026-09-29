import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, ".env"),
    quiet: true,
});

export default defineConfig({
    testDir: "./tests",

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [["list"], ["html", { open: "never" }]],

    use: {
        baseURL: process.env.BASE_URL,
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "on",

        trace: "on-first-retry",
    },

    projects: [
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
    ],
});
