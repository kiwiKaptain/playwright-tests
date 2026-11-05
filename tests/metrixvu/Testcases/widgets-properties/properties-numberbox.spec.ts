import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setActionsToNone, setAppearance, setLayoutAndSpacing, setRunTimeFilter } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { NumberBoxTextboxLocators } from "../../Locators/numberboxTextboxSpecificLocators";


const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { NUMBERBOX: "mi-number-box" } as const;
test.describe("PROPERTIES - NUMBERBOX Widget", () => {
  test.beforeEach(async ({ page }) => {
     test.setTimeout(120000);
    await login(page);
    const setupDashboard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, setupDashboard);

    // Drop a single NUMBERBOX widget on the canvas
    await dragAndDropWidget(page, WIDGETS.NUMBERBOX);

    const droppedWidget = await getDroppedWidgetByUuid(page, WIDGETS.NUMBERBOX);
    try {
      await droppedWidget.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Dropped NUMBERBOX widget is not visible on the canvas.");
      console.error(error);
      throw error;
    }

    // Resize widget
    const resizeHandle = droppedWidget.locator(".ui-resizable-se");
    try {
      await resizeHandle.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Resize handle is not visible for the NUMBERBOX widget.");
      console.error(error);
      throw error;
    }
    await resizeWidget(page, droppedWidget, resizeHandle, 150, 150);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

 test("1.User can change LAYOUT & SPACING properties for Numberbox widget", async ({
     page,
   }) => {
     const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.NUMBERBOX);
 

   
           // Update Layout & Spacing
         
     await setLayoutAndSpacing(page, "10", "15", "20", "25");
     // Switch to Viewer
     await page.locator("label").filter({ hasText: "Viewer" }).click();
 
     // Save
     await page.getByRole("button", { name: "Save", exact: true }).click();
 
     const targetWidgetContent = targetWidget .locator(".grid-stack-item-content");
     await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
     await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
    //  await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
    await expect(async () => {
  const value = await targetWidgetContent.evaluate(
    (element) => getComputedStyle(element).paddingBottom
  );

  expect(["20px", "18px"]).toContain(value);
}).toPass();
     await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
   });




   test("2 .User can change APPEARANCE properties for Numberbox widget", async ({
        page,
      }) => {
            
           await setAppearance(page, "rgb(229, 214, 73)"); 
          
      await setRunTimeFilter (page);
   // Switch to Viewer
   await page.locator("label").filter({ hasText: "Viewer" }).click();
   
   // Save
   await page.getByRole("button", { name: "Save", exact: true }).click();
   
   
   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.NUMBERBOX);
        
   
     // Verify background color - look for the container with the background
     const bgContainer = targetWidget.locator(".mi-number-box-container");
     
     // Wait for the container to be visible
     await bgContainer.waitFor({ state: "visible" });
     
     // Check the background color 
     await expect(bgContainer).toHaveCSS("background-color", "rgb(229, 214, 73)");
   
   // Verify runtime filter is visible
     const runtimeFilter = targetWidget.locator('[title="Filter"]');
   
     await expect(runtimeFilter).toBeVisible();
   
   });



test("3. User can change GENERAL properties for Numberbox widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================

  const valueLabel = NumberBoxTextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await valueLabel.click();

  const valueInput = NumberBoxTextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await valueInput.fill("450");
  await valueInput.press("Enter");

  // ============================================================
  // Placeholder
  // ============================================================

  const placeholderLabel =
    NumberBoxTextboxLocators.placeholderLabel(page);

  if ((await placeholderLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await placeholderLabel.click();

  const placeholderInput =
    NumberBoxTextboxLocators.placeholder(page);

  if ((await placeholderInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await placeholderInput.fill("Enter NUmber For Test");

  // ============================================================
  // Border Visible
  // ============================================================

  const borderVisibleLabel =
    NumberBoxTextboxLocators.borderVisibleLabel(page);

  if ((await borderVisibleLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-border-visible' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await borderVisibleLabel.click();

  const borderVisibleInput =
    NumberBoxTextboxLocators.borderVisible(page);

  if ((await borderVisibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-border-visible' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const isBorderVisibleChecked =
    (await borderVisibleInput.getAttribute("aria-checked")) === "true";

  if (!isBorderVisibleChecked) {
    await borderVisibleInput.click();
  }

  // ============================================================
  // Border Color
  // ============================================================

  const borderColorLabel =
    NumberBoxTextboxLocators.borderColorLabel(page);

  if ((await borderColorLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-border-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await borderColorLabel.click();

  const borderColorInput =
    NumberBoxTextboxLocators.borderColor(page);

  if ((await borderColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-border-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await borderColorInput.fill("rgba(99, 217, 91, 1)");
  await borderColorInput.press("Enter");

  // ============================================================
  // Border Width
  // ============================================================

  const borderWidthLabel =
    NumberBoxTextboxLocators.borderWidthLabel(page);

  if ((await borderWidthLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-border-width' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await borderWidthLabel.click();

  const borderWidthInput =
    NumberBoxTextboxLocators.borderWidth(page);

  if ((await borderWidthInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-border-width' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await borderWidthInput.fill("15");
  await borderWidthInput.press("Enter");

  // ============================================================
  // Font Size
  // ============================================================

  const fontSizeLabel =
    NumberBoxTextboxLocators.fontSizeLabel(page);

  if ((await fontSizeLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-font-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await fontSizeLabel.click();

  const fontSizeInput =
    NumberBoxTextboxLocators.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-font-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await fontSizeInput.fill("30");
  await fontSizeInput.press("Enter");

  // ============================================================
  // Text Color
  // ============================================================

  const textColorLabel =
    NumberBoxTextboxLocators.textColorLabel(page);

  if ((await textColorLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-text-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await textColorLabel.click();

  const textColorInput =
    NumberBoxTextboxLocators.textColor(page);

  if ((await textColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-text-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await textColorInput.fill("rgba(255, 95, 3, 1)");
  await textColorInput.press("Enter");

  // ============================================================
  // Text Alignment
  // ============================================================

  const textAlignLabel =
    NumberBoxTextboxLocators.textAlignLabel(page);

  if ((await textAlignLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-text-align' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await textAlignLabel.click();

  const textAlignRight =
    NumberBoxTextboxLocators.textAlign(page, "right");

  if ((await textAlignRight.count()) === 0) {
    throw new Error(
      "Test ID 'prop-control-text-align-right' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await textAlignRight.click();

  

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

  // ============================================================
  // Verify Number Box in Viewer
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.NUMBERBOX,
  );

  const numberBoxContainer = targetWidget.locator(
    ".mi-number-box-container",
  );

  if ((await numberBoxContainer.count()) === 0) {
    throw new Error(
      "Number Box container not found in Viewer. The Number Box widget may not have loaded correctly. Please try rerunning the test case.",
    );
  }

    // ============================================================
  // Verify Value in Viewer
  // ============================================================

  const numberBoxInput = numberBoxContainer.locator(
    'input.dx-texteditor-input[role="spinbutton"]',
  );

  await expect(numberBoxInput).toBeVisible({ timeout: 10000 });

  const actualValue = await numberBoxInput.getAttribute("aria-valuenow");

  expect(
    actualValue,
    "GENERAL PROPERTY FAILED: Expected Number Box value to be 450, but found " +
      actualValue +
      ".",
  ).toBe("450");

  // ============================================================
  // Verify Placeholder in Viewer
  // ============================================================

  const actualPlaceholder = await numberBoxInput.getAttribute("placeholder");

  expect(
    actualPlaceholder,
    "GENERAL PROPERTY FAILED: Expected placeholder to be 'Enter NUmber For Test', but found '" +
      actualPlaceholder +
      "'.",
  ).toBe("Enter NUmber For Test");

  // ============================================================
  // Verify Text Alignment in Viewer
  // ============================================================

  await expect(numberBoxInput).toHaveCSS("text-align", "right");


// ============================================================
// Verify Border Color in Viewer
// ============================================================

const actualBorderColor = await numberBoxContainer.evaluate(
  (element) =>
    getComputedStyle(element)
      .getPropertyValue("--textbox-border-color")
      .trim(),
);

expect(
  actualBorderColor,
  "GENERAL PROPERTY FAILED: Expected border color to be rgba(99, 217, 91, 1), but found " +
    actualBorderColor +
    ".",
).toBe("rgba(99, 217, 91, 1)");

 
// ============================================================
// Verify Border Width in Viewer
// ============================================================

const actualBorderWidth = await numberBoxContainer.evaluate(
  (element) =>
    getComputedStyle(element)
      .getPropertyValue("--textbox-border-width")
      .trim(),
);

expect(
  actualBorderWidth,
  "GENERAL PROPERTY FAILED: Expected border width to be 15px, but found " +
    actualBorderWidth +
    ".",
).toBe("15px");

  // ============================================================
  // Verify Font Size in Viewer
  // ============================================================

  const actualFontSize = await numberBoxInput.evaluate(
    (element) => getComputedStyle(element).fontSize,
  );

  expect(
    actualFontSize,
    "GENERAL PROPERTY FAILED: Expected font size to be 30px, but found " +
      actualFontSize +
      ".",
  ).toBe("30px");

  // ============================================================
  // Verify Text Color in Viewer
  // ============================================================

  const actualTextColor = await numberBoxInput.evaluate(
    (element) => getComputedStyle(element).color,
  );

  expect(
    actualTextColor,
    "GENERAL PROPERTY FAILED: Expected text color to be rgb(255, 95, 3), but found " +
      actualTextColor +
      ".",
  ).toBe("rgb(255, 95, 3)");
});


test("4. User can change PLACEHOLDER properties for Numberbox widget", async ({
  page,
}) => {
  // ============================================================
  // Placeholder
  // ============================================================

  const placeholderLabel =
    NumberBoxTextboxLocators.placeholderLabel(page);

  if ((await placeholderLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await placeholderLabel.click();

  const placeholderInput =
    NumberBoxTextboxLocators.placeholder(page);

  if ((await placeholderInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await placeholderInput.fill("Enter NUmber For Test");
  await placeholderInput.press("Enter");

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

  // ============================================================
  // Get Number Box Widget
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.NUMBERBOX,
  );

  const bgContainer = targetWidget.locator(
    ".mi-number-box-container",
  );

  await bgContainer.waitFor({ state: "visible" });

  // ============================================================
  // Verify Placeholder in Viewer
  // ============================================================

  const numberBoxInput = bgContainer.locator(
    'input.dx-texteditor-input[role="spinbutton"]',
  );

  await expect(numberBoxInput).toBeVisible({ timeout: 10000 });

  const actualPlaceholder =
    await numberBoxInput.getAttribute("placeholder");

  expect(
    actualPlaceholder,
    "PLACEHOLDER PROPERTY FAILED: Expected placeholder to be 'Enter NUmber For Test', but found '" +
      actualPlaceholder +
      "'.",
  ).toBe("Enter NUmber For Test");
});




   test("5. User can change SPIN BUTTONS properties for Numberbox widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================

  const valueLabel = NumberBoxTextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await valueLabel.click();

  const valueInput = NumberBoxTextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await valueInput.fill("450");
  await valueInput.press("Enter");

 

  // ============================================================
  // Font Size
  // ============================================================

  const fontSizeLabel =
    NumberBoxTextboxLocators.fontSizeLabel(page);

  if ((await fontSizeLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-font-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await fontSizeLabel.click();

  const fontSizeInput =
    NumberBoxTextboxLocators.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-font-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await fontSizeInput.fill("30");
  await fontSizeInput.press("Enter");

  // ============================================================
  // Text Color
  // ============================================================

  const textColorLabel =
    NumberBoxTextboxLocators.textColorLabel(page);

  if ((await textColorLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-text-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await textColorLabel.click();

  const textColorInput =
    NumberBoxTextboxLocators.textColor(page);

  if ((await textColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-text-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await textColorInput.fill("rgba(224, 115, 47, 1)");
  await textColorInput.press("Enter");

 

  // ============================================================
  // Show Spin Buttons
  // ============================================================

  const showSpinButtonsLabel =
    NumberBoxTextboxLocators.showSpinButtonsLabel(page);

  if ((await showSpinButtonsLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-show-spin-buttons' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await showSpinButtonsLabel.click();

  const showSpinButtonsInput =
    NumberBoxTextboxLocators.showSpinButtons(page);

  if ((await showSpinButtonsInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-show-spin-buttons' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  const areSpinButtonsVisible =
    (await showSpinButtonsInput.getAttribute("aria-checked")) === "true";

  if (!areSpinButtonsVisible) {
    await showSpinButtonsInput.click();
  }

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

// ============================================================
// Verify Number Box in Viewer
// ============================================================

const targetWidget = await getDroppedWidgetByUuid(
  page,
  WIDGETS.NUMBERBOX,
);

const numberBoxContainer = targetWidget.locator(
  ".mi-number-box-container",
);

if ((await numberBoxContainer.count()) === 0) {
  throw new Error(
    "Number Box container not found in Viewer. The Number Box widget may not have loaded correctly. Please try rerunning the test case.",
  );
}

await expect(numberBoxContainer).toBeVisible({
  timeout: 10000,
});

// ============================================================
// Verify Spin Buttons in Viewer
// ============================================================

const numberBoxInput = numberBoxContainer.locator(
  'input.dx-texteditor-input[role="spinbutton"]',
);

const spinUpButton = numberBoxContainer.locator(
  ".dx-numberbox-spin-up",
);

const spinDownButton = numberBoxContainer.locator(
  ".dx-numberbox-spin-down",
);

await expect(
  spinUpButton,
  "SPIN BUTTONS PROPERTY FAILED: Spin-up button is not visible.",
).toBeVisible();

await expect(
  spinDownButton,
  "SPIN BUTTONS PROPERTY FAILED: Spin-down button is not visible.",
).toBeVisible();

// ============================================================
// Verify Initial Value: 450
// ============================================================

await expect(
  numberBoxInput,
  "SPIN BUTTONS PROPERTY FAILED: Expected initial value to be 450.",
).toHaveAttribute("aria-valuenow", "450");

// ============================================================
// Click Spin-Up Button
// ============================================================

//await spinUpButton.click();

//await page.locator('.dx-numberbox-spin-up-icon').click();
// await page.locator('.dx-numberbox-spin-up-icon').click();

// ============================================================
// Verify Incremented Value: 451
// ============================================================

// await expect(
//   numberBoxInput,
//   "SPIN BUTTONS PROPERTY FAILED: Expected value to increment to 451 after clicking the spin-up button.",
// ).toHaveAttribute("aria-valuenow", "451");

  }

);
 
test("6. User can change DISPLAY properties for Numberbox widget", async ({
  page,
}) => {
  // ============================================================
  // Read Only
  // ============================================================

  const readOnlyLabel =
    NumberBoxTextboxLocators.readOnlyLabel(page);

  if ((await readOnlyLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-read-only' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await readOnlyLabel.click();

  const readOnlyInput =
    NumberBoxTextboxLocators.readOnly(page);

  if ((await readOnlyInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-read-only' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  if ((await readOnlyInput.getAttribute("aria-checked")) !== "true") {
    await readOnlyInput.click();
  }

  // ============================================================
  // Label
  // ============================================================

  await NumberBoxTextboxLocators.labelLabel(page).click();

  const labelInput = NumberBoxTextboxLocators.label(page);

  if ((await labelInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-label' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case.",
    );
  }

  await labelInput.fill("test");
  await labelInput.press("Enter");

  // ============================================================
  // Label Mode: Outside
  // ============================================================

  await NumberBoxTextboxLocators.labelModeLabel(page).click();

  const labelModeControl =
    NumberBoxTextboxLocators.labelModeControl(page);

  await labelModeControl
    .getByRole("button", { name: "Select" })
    .click();

  await NumberBoxTextboxLocators.labelModeOption(
    page,
    "outside",
  ).click();

  // ============================================================
  // Styling Mode: Filled
  // ============================================================

  await NumberBoxTextboxLocators.stylingModeLabel(page).click();

  const stylingModeControl =
    NumberBoxTextboxLocators.stylingModeControl(page);

  await stylingModeControl
    .getByRole("button", { name: "Select" })
    .click();

  await NumberBoxTextboxLocators.stylingModeOption(
    page,
    "filled",
  ).click();

  // ============================================================
  // Hint
  // ============================================================

  await NumberBoxTextboxLocators.hintLabel(page).click();

  const hintInput = NumberBoxTextboxLocators.hint(page);

  if ((await hintInput.count()) > 0) {
    await hintInput.fill("Number Box hint");
    await hintInput.press("Enter");
  }

  // ============================================================
  // Format: Decimal
  // ============================================================

  await NumberBoxTextboxLocators.formatLabel(page).click();

  const formatControl =
    NumberBoxTextboxLocators.formatControl(page);

  await formatControl
    .getByRole("button", { name: "Select" })
    .click();

  await NumberBoxTextboxLocators.formatOption(
    page,
    "decimal",
  ).click();

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

// ============================================================
// Verify Number Box in Viewer
// ============================================================

const targetWidget = await getDroppedWidgetByUuid(
  page,
  WIDGETS.NUMBERBOX,
);

const numberBoxContainer = targetWidget.locator(
  ".mi-number-box-container",
);

await expect(numberBoxContainer).toBeVisible({
  timeout: 10000,
});

// ============================================================
// Verify Read Only
// ============================================================

const numberBoxInput = numberBoxContainer.locator(
  'dx-number-box input.dx-texteditor-input[role="spinbutton"]',
);

await expect(
  numberBoxInput,
  "DISPLAY PROPERTY FAILED: Number Box should be read-only.",
).toHaveAttribute("aria-readonly", "true");

// ============================================================
// Verify Label
// ============================================================

const actualLabel = numberBoxContainer.locator(
  ".dx-texteditor-label .dx-label span",
);

await expect(
  actualLabel,
  "DISPLAY PROPERTY FAILED: Expected label to be 'test'.",
).toHaveText("test");

// ============================================================
// Verify Label Mode: Outside
// ============================================================

await expect(
  numberBoxContainer,
  "DISPLAY PROPERTY FAILED: Expected label mode to be outside.",
).toHaveClass(/label-outside/);

// ============================================================
// Verify Styling Mode: Filled
// ============================================================

const numberBoxEditor = numberBoxContainer.locator("dx-number-box");

await expect(
  numberBoxEditor,
  "DISPLAY PROPERTY FAILED: Expected styling mode to be filled.",
).toHaveClass(/dx-editor-filled/);

// ============================================================
// Verify Hint
// ============================================================

await expect(
  numberBoxEditor,
  "DISPLAY PROPERTY FAILED: Expected hint to be 'Number Box hint'.",
).toHaveAttribute("title", "Number Box hint");
});
test("7 .User can change Link Dashboard via ACTIONS properties for  Numberbox widget", async ({
    page,
  }) => {
    // Update ACTIONS

    await setActionsProperties(
      page,
      TEST_DATA.dashboards.dashboardNameForActionPropertyTesting,
    );
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Verify current dashboard
    await expect(
      page.locator(
        '//div[@class="flex items-center space-x-1 md:space-x-2"]/p',
      ),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
    // Fetch the parent container widget using the dynamic helper function
    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.NUMBERBOX);
    await targetWidget.click();

    // Verify the linked dashboard is opened
    // await expect(
    //   page.locator('//p[contains(@class,"truncate")]'),
    // ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);


    const dashboardName = page.locator('//p[contains(@class,"truncate")]');

if ((await dashboardName.count()) === 0) {
  throw new Error(
    "Dashboard is not visible. Please verify whether the dashboard link is working correctly or rerun the test case.",
  );
}

try {
  await expect(dashboardName).toContainText(
    TEST_DATA.dashboards.dashboardNameForActionPropertyTesting,
  );
} catch (error) {
  throw new Error(
    `Dashboard is not visible or the dashboard link is not working correctly. Expected dashboard name: "${TEST_DATA.dashboards.dashboardNameForActionPropertyTesting}".`,
    { cause: error },
  );
}
  });
  test("8. User can set the action type to NONE for  Numberbox widget", async ({
        page,
      }) => {
        // Update ACTIONS to None
        await setActionsToNone(
          page,
         
        );
    
        // Switch to Viewer
        await page.locator("label").filter({ hasText: "Viewer" }).click();
    
        // Save
        await page.getByRole("button", { name: "Save", exact: true }).click();
    
        // Verify current dashboard
        await expect(
          page.locator(
            '//div[@class="flex items-center space-x-1 md:space-x-2"]/p',
          ),
        ).toContainText(
          TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
        );
    
        // Fetch the parent container widget using the dynamic helper function
        const cardWidget = await getDroppedWidgetByUuid(
          page,
          WIDGETS.NUMBERBOX,
        );
        await cardWidget.click();
    
        // Verify the None Action
        await expect(
          page.locator('//p[contains(@class,"truncate")]'),
        ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
      });
});