module.exports = {
    testDir: "./tests",

    use: {
        browserName: "chromium",
        headless: false,
    },

    reporter: [["list"], ["html", { open: "never" }]],
};
