import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Custom assertion message clearly stating the problem
  await expect(
    page,
    "The website homepage title does not match the Playwright brand branding rule.",
  ).toHaveTitle(/Nasa/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // 1. Give users a clear hint if the button itself is missing or renamed
  const getStartedBtn = page.getByRole("link", { name: "Get started" });
  await expect(
    getStartedBtn,
    'The main "Get started" link/button is missing from the landing page.',
  ).toBeVisible();

  await getStartedBtn.click();

  // 2. Clear hint if the page fails to navigate or redirect properly
  const installationHeading = page.getByRole("heading", {
    name: "Installation",
  });
  await expect(
    installationHeading,
    'Failed to navigate to the documentation page; the "Installation" heading did not load.',
  ).toBeVisible();
});
