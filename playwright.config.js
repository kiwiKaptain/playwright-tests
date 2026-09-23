const { defineConfig } = require("@playwright/test");
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, ".env");

dotenv.config({
    path: envPath, quiet: true
});

module.exports = defineConfig({
    testDir: "./tests",

    use: {
        browserName: "chromium",
        headless: false,
        baseURL: process.env.BASE_URL,
        screenshot: "on",
        video: "on",
        trace: "on-first-retry",
    },

    reporter: [["list"], ["html", { open: "never" }]],
});
