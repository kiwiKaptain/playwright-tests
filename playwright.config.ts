import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, ".env"),
    quiet: true,
});

export default defineConfig({
    testDir: "./tests",
    
    testMatch: '**/*.spec.ts',

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


        // Fail actions sooner
    actionTimeout: 10 * 1000, // 10 seconds

    // Page navigation
    navigationTimeout: 30 * 1000, // 30 seconds
    },

    projects: [
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
    ],


     // Maximum time for each test
  timeout: 3 * 60 * 1000, // 3 minutes

  // Maximum wait for assertions
  expect: {
    timeout: 10 * 1000, // 10 seconds
  },
});
