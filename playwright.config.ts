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


    // Click, fill, hover, etc.
    actionTimeout: 60 * 1000, // 30 seconds

  // Page loads and navigation
    navigationTimeout: 60 * 1000, // 60 seconds
    },


    projects: [
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
    ],


     // Maximum time for each test
   // Entire test timeout
  timeout: 4 * 60 * 1000, // 4 minutes

  // Assertion timeout
  expect: {
    timeout: 20 * 1000, // 20 seconds
  },
});
