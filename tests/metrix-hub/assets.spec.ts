import { test, expect } from "@playwright/test";

test.describe("Variable CRUD", () => {
  // Clean Lifecycle Management
  test.beforeEach("Open Metrix Hub", async ({ page }) => {
    // Navigate and check for basic page availability
    const loginUrl = "http://192.168.1.99:4200/#/login";
    // const loginUrl = "http://optvian.local/metrixhub/#/login";
    await page.goto(loginUrl);

    await expect(
      page,
      `Failed to reach the login endpoint page: ${loginUrl}`,
    ).toHaveURL(/.*login/);

    // Form inputs interaction with explicit safety visibility checks
    const usernameInput = page.getByRole("textbox", {
      name: "Enter your username",
    });
    await expect(
      usernameInput,
      "The username input field is missing from the login form template.",
    ).toBeVisible();
    await usernameInput.fill("admin");

    const passwordInput = page.getByRole("textbox", { name: "••••••••" });
    await expect(
      passwordInput,
      "The password input field is missing from the login form template.",
    ).toBeVisible();
    await passwordInput.fill("adm!n$25");

    await page.getByRole("button", { name: "Sign In" }).click();

    // Verify authentication was successful and navigation occurred before proceeding to individual tests
    const assetNavButton = page
      .locator("div")
      .filter({ hasText: "Assets" })
      .nth(3);
    await expect(
      assetNavButton,
      "Login failed: The dashboard 'Assets' navigation option is not visible.",
    ).toBeVisible();
    await assetNavButton.click();
  });

  test.afterEach("Logout from Metrix Hub", async ({ page }) => {
    // Graceful teardown to prevent hanging user authentication sessions
    try {
      const userMenu = page.getByRole("button", { name: "user" });
      if (await userMenu.isVisible({ timeout: 5000 })) {
        await userMenu.click();
        await page.getByText("Logout").click();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.warn(
          "Teardown clean warning: User was already logged out or context shifted.",
          e.message,
        );
      } else {
        console.warn(
          "Teardown clean warning: An unknown error object type occurred.",
          String(e),
        );
      }
    }
  });

  // TEST 1: Import & Rename
  test("import variables and rename variable", async ({ page }) => {
    const importBtn = page.getByTitle("Import Variables").locator("button");
    await expect(
      importBtn,
      "The 'Import Variables' trigger button cannot be found on screen.",
    ).toBeVisible();
    await importBtn.click();

    const fileInput = page.getByLabel("Choose Excel File");
    // await expect(
    //   fileInput,
    //   "The file uploader modal prompt did not display.",
    // ).toBeVisible();

    // Explicit file path parsing sequence
    await fileInput.setInputFiles(
      "C:/Users/Admin/Downloads/variable-template.xlsx",
    );
    await page.getByRole("button", { name: "Upload" }).click();
    await page.getByRole("button", { name: "Done" }).click();

    // Verify file data populated the grid canvas row elements
    const targetRow = page.locator("div").filter({ hasText: /^Var1$/ });
    await expect(
      targetRow,
      "Variable import failed: Row 'Var1' was not discovered in the datagrid view.",
    ).toBeVisible({ timeout: 10000 });
    await targetRow.dblclick();

    const inlineInput = page
      .getByRole("gridcell", { name: "Var1" })
      .getByPlaceholder("Enter value...");
    await expect(
      inlineInput,
      "Inline editing mode input wrapper did not trigger on grid cell double click.",
    ).toBeVisible();
    await inlineInput.click();
    await inlineInput.fill("Var1Test");
    await page.getByRole("button", { name: "Update" }).click();

    // Validate the rename operation successfully persisted inside the DOM table state
    await expect(
      page.getByRole("gridcell", { name: "Var1Test" }),
      "The variable did not successfully update its cell label display to 'Var1Test'.",
    ).toBeVisible();
  });

  // TEST 2: Copy
  test("copying variables", async ({ page }) => {
    const selectTargetRow = page
      .getByRole("row", {
        name: "Select row Var1Test Modbus_instance1 Connection1 Holding Registers INT 1 Normal",
      })
      .getByLabel("Select row");

    await expect(
      selectTargetRow,
      "The modified target variable row 'Var1Test' was missing from the copying layout table.",
    ).toBeVisible();
    await selectTargetRow.click();

    // Process copy via systemic action
    await page.locator("button").nth(2).click();

    const copiedRowCheck = page
      .getByRole("row", { name: "Select row Var1Test_copy" })
      .getByLabel("Select row");
    await expect(
      copiedRowCheck,
      "Copy action verification failure: 'Var1Test_copy' clone record item row was not instantiated.",
    ).toBeVisible({ timeout: 10000 });
    await copiedRowCheck.click();
  });

  // TEST 3: Delete
  test("deleting variables", async ({ page }) => {
    const targetDeleteRow = page
      .getByRole("row", {
        name: "Select row Var1Test_copy Modbus_instance1 Connection1 Holding Registers INT 1 Normal",
      })
      .getByLabel("Select row");

    await expect(
      targetDeleteRow,
      "The data record row chosen for deletion ('Var1Test_copy') is absent from the dataset matrix view.",
    ).toBeVisible();
    await targetDeleteRow.click();

    const actionDeleteBtn = page.locator("button").nth(1);
    await expect(
      actionDeleteBtn,
      "The global action row delete icon command modifier trigger cannot be located.",
    ).toBeVisible();
    await actionDeleteBtn.click();

    await page.getByRole("button", { name: "Delete" }).click();

    // Final positive confirmation assertion validation
    await expect(
      targetDeleteRow,
      "The targeted data row still persists inside the interface view canvas grid template context after running delete operations.",
    ).toBeHidden({ timeout: 8000 });
  });
});
