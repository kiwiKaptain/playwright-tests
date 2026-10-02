import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setLayoutAndSpacing, setRunTimeFilter } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { ButtonLocators } from "../../Locators/buttonSpecificLocators";

const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { BUTTON: "mi-button" } as const;
test.describe("PROPERTIES - BUTTON Widget", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    const setupDashboard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, setupDashboard);

    // Drop a single BUTTON widget on the canvas
    await dragAndDropWidget(page, WIDGETS.BUTTON);

    const droppedWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
    try {
      await droppedWidget.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Dropped BUTTON widget is not visible on the canvas.");
      console.error(error);
      throw error;
    }

    // Resize widget
    const resizeHandle = droppedWidget.locator(".ui-resizable-se");
    try {
      await resizeHandle.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Resize handle is not visible for the BUTTON widget.");
      console.error(error);
      throw error;
    }
    await resizeWidget(page, droppedWidget, resizeHandle, 150, 150);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

 test("1.User can change LAYOUT & SPACING properties for Button widget", async ({
     page,
   }) => {
     const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
 

   
           // Update Layout & Spacing
         
     await setLayoutAndSpacing(page, "10", "15", "20", "25");
     // Switch to Viewer
     await page.locator("label").filter({ hasText: "Viewer" }).click();
 
     // Save
     await page.getByRole("button", { name: "Save", exact: true }).click();
 
     const targetWidgetContent = targetWidget .locator(".grid-stack-item-content");
     await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
     await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
     await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
     await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
   });
// test("2.User can change APPEARANCE properties for Button widget", async ({
//     page,
//   }) => {
    
//     const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
//  await setRunTimeFilter (page);
// // Background Color

// await page.getByTestId('prop-label-common-background-color-button').click();
//  await page.getByTestId('prop-control-common-background-color-button').click();

// const popup = page.locator(".dx-popup-content").filter({
//   has: page.getByText("Widget Preview"),
// });

// const gradientRow = popup.locator(".gradient-row").first();

// // Primary Color
// const primaryColor = gradientRow.locator(".col-color input.dx-colorbox-input").nth(0);
// const secondaryColor = gradientRow.locator(".col-color input.dx-colorbox-input").nth(1);
// const angleInput = gradientRow.locator(".angle-input input.dx-texteditor-input");

// // Gradient Angle

// await primaryColor.click();
// await primaryColor.press("ControlOrMeta+A");
// await primaryColor.fill("rgb(57, 213, 237)");
// await primaryColor.press("Enter");

// // Secondary Color
// await secondaryColor.click();
// await secondaryColor.press("ControlOrMeta+A");
// await secondaryColor.fill("rgb(228, 237, 57)");
// await secondaryColor.press("Enter");

// await angleInput.press("ControlOrMeta+A");
// await angleInput.fill("45");
// await angleInput.press("Enter");



    
//     await page.getByRole('button', { name: 'Save' }).click();
//     // Switch to Viewer
//     await page.locator("label").filter({ hasText: "Viewer" }).click();

//     // Save
//     await page.getByRole("button", { name: "Save", exact: true }).click();

//     // Get the button element by its ID within the widget
//   const buttonElement = targetWidget.locator('#mi-button');
  
//   // Get the widget UUID for logging
//   const widgetUuid = await targetWidget.getAttribute('data-widget-uuid');
//   console.log('Verifying button in widget:', widgetUuid);
  
//   // Verify button exists and is visible
//   await expect(buttonElement).toBeVisible();
  
//   // Verify gradient background
//   const style = await buttonElement.getAttribute('style');
//   expect(style).toContain('linear-gradient(45deg, rgb(57, 213, 237) 0%, rgb(228, 237, 57) 100%)');
  
//  // Verify runtime filter is visible
//   const runtimeFilter = targetWidget.locator('[title="Filter"]');

//   await expect(runtimeFilter).toBeVisible();

//   });

test("2.User can change APPEARANCE properties for Button widget", async ({
  page,
}) => {
  const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);

  await setRunTimeFilter(page);

  // Background Color
  const backgroundColorLabel =
    ButtonLocators.backgroundColorLabel(page);

  if ((await backgroundColorLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-common-background-color-button not found.",
    );
  }

  await backgroundColorLabel.click();

  const backgroundColorControl =
    ButtonLocators.backgroundColorControl(page);

  if ((await backgroundColorControl.count()) === 0) {
    throw new Error(
      "Test ID prop-control-common-background-color-button not found.",
    );
  }

  await backgroundColorControl.click();

  // Gradient controls
  const primaryColor = ButtonLocators.primaryColorInput(page);

  if ((await primaryColor.count()) === 0) {
    throw new Error(
      "Testid or Gradient primary color input not found.",
    );
  }

  const secondaryColor = ButtonLocators.secondaryColorInput(page);

  if ((await secondaryColor.count()) === 0) {
    throw new Error(
      "Testid or Gradient secondary color input not found.",
    );
  }

  const angleInput = ButtonLocators.gradientAngleInput(page);

  if ((await angleInput.count()) === 0) {
    throw new Error(
      "Testid or Gradient angle input not found.",
    );
  }

  // Primary Color
  await primaryColor.click();
  await primaryColor.press("ControlOrMeta+A");
  await primaryColor.fill("rgb(57, 213, 237)");
  await primaryColor.press("Enter");

  // Secondary Color
  await secondaryColor.click();
  await secondaryColor.press("ControlOrMeta+A");
  await secondaryColor.fill("rgb(228, 237, 57)");
  await secondaryColor.press("Enter");

  // Gradient Angle
  await angleInput.press("ControlOrMeta+A");
  await angleInput.fill("45");
  await angleInput.press("Enter");

  // Save property changes
  await page.getByRole("button", { name: "Save" }).click();

  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save dashboard
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get the button element
  const buttonElement = targetWidget.locator("#mi-button");

  // Get widget UUID for logging
  const widgetUuid = await targetWidget.getAttribute("data-widget-uuid");
  console.log("Verifying button in widget:", widgetUuid);

  // Verify button exists and is visible
  await expect(buttonElement).toBeVisible();

  // Verify gradient background
  const style = await buttonElement.getAttribute("style");

  expect(style).toContain(
    "linear-gradient(45deg, rgb(57, 213, 237) 0%, rgb(228, 237, 57) 100%)",
  );

  // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');

  await expect(runtimeFilter).toBeVisible();
});

//    test("3.User can change GENERAL SETTINGS properties for Button widget", async ({
//       page,
//     }) => {
//       const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
//       // Update GENERAL SETTINGS

//         await page.getByTestId('prop-label-mi-widget-settings-border-visible').click();
//         await page.getByTestId('prop-input-mi-widget-settings-border-visible').click();
//         await page.getByTestId('prop-input-mi-widget-settings-border-visible').click();

//         await page.getByTestId('prop-label-mi-widget-settings-border-color').click();
//         await page.getByTestId('prop-input-mi-widget-settings-border-color').click();
//         await page.getByTestId('prop-input-mi-widget-settings-border-color').press('ControlOrMeta+a');
//         await page.getByTestId('prop-input-mi-widget-settings-border-color').fill('rgb(102, 217, 92)');
//         await page.getByTestId('prop-input-mi-widget-settings-border-color').press('Enter');

//         await page.getByTestId('prop-label-mi-widget-settings-border-width').click();
//         await page.getByTestId('prop-input-mi-widget-settings-border-width').click();
//         await page.getByTestId('prop-input-mi-widget-settings-border-width').press('ControlOrMeta+a');
//         await page.getByTestId('prop-input-mi-widget-settings-border-width').fill('12');
//         await page.getByTestId('prop-input-mi-widget-settings-border-width').press('Enter');


//         await page.getByTestId('prop-label-mi-widget-settings-font-size').click();
//         await page.getByTestId('prop-input-mi-widget-settings-font-size').click();
//         await page.getByTestId('prop-input-mi-widget-settings-font-size').press('ControlOrMeta+a');
//         await page.getByTestId('prop-input-mi-widget-settings-font-size').fill('18');
//         await page.getByTestId('prop-input-mi-widget-settings-font-size').press('Enter');


//         await page.getByTestId('prop-label-mi-widget-settings-text-color').click();
//         await page.getByTestId('prop-input-mi-widget-settings-text-color').click();
//         await page.getByTestId('prop-input-mi-widget-settings-text-color').press('ControlOrMeta+a');
//         await page.getByTestId('prop-input-mi-widget-settings-text-color').fill('rgb(233, 154, 36)');
//         await page.getByTestId('prop-input-mi-widget-settings-text-color').press('Enter');



//         await page.getByTestId('prop-label-mi-widget-settings-text-align').click();
//           await page.getByTestId('prop-control-mi-widget-settings-text-align-right').click();
   

//       // Switch to Viewer
//       await page.locator("label").filter({ hasText: "Viewer" }).click();
  
//       // Save
 
// // Dashboard Save
// await page.locator('button.bg-blue-600').click();
    

  
//   // ===== EXPECTATIONS =====
  
//    // Get the button element by its ID within the widget
//   const buttonElement = targetWidget.locator('#mi-button');
  
//   // Get the widget UUID for logging
//   const widgetUuid = await targetWidget.getAttribute('data-widget-uuid');
//   console.log('Verifying button in widget:', widgetUuid);
  
//   // ===== EXPECTATIONS =====
//   const buttonContainer = targetWidget.locator(".mi-button-container");

// await expect(buttonContainer).toHaveAttribute(
//   "style",
//   expect.stringContaining("--btn-font-size: 18px")
// );

// await expect(buttonContainer).toHaveAttribute(
//   "style",
//   expect.stringContaining("--textbox-text-color: rgba(233, 154, 36, 1)")
// );

// await expect(buttonContainer).toHaveAttribute(
//   "style",
//   expect.stringContaining("--textbox-border-color: rgba(102, 217, 92, 1)")
// );

// await expect(buttonContainer).toHaveAttribute(
//   "style",
//   expect.stringContaining("--textbox-border-width: 12px")
// );

// await expect(buttonContainer).toHaveAttribute(
//   "style",
//   expect.stringContaining("--textbox-text-align: right")
// );
//     });

test("3. User can change GENERAL SETTINGS properties for Button widget", async ({
  page,
}) => {
  const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);

  // ============================================================
  // Border Visible
  // ============================================================

  const borderVisibleLabel = ButtonLocators.borderVisibleLabel(page);
  if ((await borderVisibleLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-mi-widget-settings-border-visible not found.",
    );
  }

  await borderVisibleLabel.click();

  const borderVisibleInput = ButtonLocators.borderVisibleInput(page);
  if ((await borderVisibleInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-mi-widget-settings-border-visible not found.",
    );
  }

  await borderVisibleInput.click();
  await borderVisibleInput.click();

  // ============================================================
  // Border Color
  // ============================================================

  const borderColorLabel = ButtonLocators.borderColorLabel(page);
  if ((await borderColorLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-mi-widget-settings-border-color not found.",
    );
  }

  await borderColorLabel.click();

  const borderColorInput = ButtonLocators.borderColorInput(page);
  if ((await borderColorInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-mi-widget-settings-border-color not found.",
    );
  }

  await borderColorInput.click();
  await borderColorInput.press("ControlOrMeta+A");
  await borderColorInput.fill("rgb(102, 217, 92)");
  await borderColorInput.press("Enter");

  // ============================================================
  // Border Width
  // ============================================================

  const borderWidthLabel = ButtonLocators.borderWidthLabel(page);
  if ((await borderWidthLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-mi-widget-settings-border-width not found.",
    );
  }

  await borderWidthLabel.click();

  const borderWidthInput = ButtonLocators.borderWidthInput(page);
  if ((await borderWidthInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-mi-widget-settings-border-width not found.",
    );
  }

  await borderWidthInput.click();
  await borderWidthInput.press("ControlOrMeta+A");
  await borderWidthInput.fill("12");
  await borderWidthInput.press("Enter");

  // ============================================================
  // Font Size
  // ============================================================

  const fontSizeLabel = ButtonLocators.fontSizeLabel(page);
  if ((await fontSizeLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-mi-widget-settings-font-size not found.",
    );
  }

  await fontSizeLabel.click();

  const fontSizeInput = ButtonLocators.fontSizeInput(page);
  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-mi-widget-settings-font-size not found.",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+A");
  await fontSizeInput.fill("18");
  await fontSizeInput.press("Enter");

  // ============================================================
  // Text Color
  // ============================================================

  const textColorLabel = ButtonLocators.textColorLabel(page);
  if ((await textColorLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-mi-widget-settings-text-color not found.",
    );
  }

  await textColorLabel.click();

  const textColorInput = ButtonLocators.textColorInput(page);
  if ((await textColorInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-mi-widget-settings-text-color not found.",
    );
  }

  await textColorInput.click();
  await textColorInput.press("ControlOrMeta+A");
  await textColorInput.fill("rgb(233, 154, 36)");
  await textColorInput.press("Enter");

  // ============================================================
  // Text Alignment
  // ============================================================

  const textAlignLabel = ButtonLocators.textAlignLabel(page);
  if ((await textAlignLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-mi-widget-settings-text-align not found.",
    );
  }

  await textAlignLabel.click();

  const textAlignRight = ButtonLocators.textAlignRight(page);
  if ((await textAlignRight.count()) === 0) {
    throw new Error(
      "Test ID prop-control-mi-widget-settings-text-align-right not found.",
    );
  }

  await textAlignRight.click();

  // ============================================================
  // Save & Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.locator("button.bg-blue-600").click();

  // ============================================================
  // Verify Button Styles
  // ============================================================

  const buttonContainer = targetWidget.locator(".mi-button-container");

  await expect(buttonContainer).toHaveAttribute(
    "style",
    expect.stringContaining("--btn-font-size: 18px"),
  );

  await expect(buttonContainer).toHaveAttribute(
    "style",
    expect.stringContaining(
      "--textbox-text-color: rgba(233, 154, 36, 1)",
    ),
  );

  await expect(buttonContainer).toHaveAttribute(
    "style",
    expect.stringContaining(
      "--textbox-border-color: rgba(102, 217, 92, 1)",
    ),
  );

  await expect(buttonContainer).toHaveAttribute(
    "style",
    expect.stringContaining("--textbox-border-width: 12px"),
  );

  await expect(buttonContainer).toHaveAttribute(
    "style",
    expect.stringContaining("--textbox-text-align: right"),
  );
});
//     test("4. User can change DISPLAY properties for Button widget", async ({
//   page,
// }) => {
//   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
//     await page.getByTestId('prop-label-visible').click();
//     await page.getByTestId('prop-input-visible').click();
//     await page.getByTestId('prop-input-visible').click();
//     await page.getByTestId('prop-label-text').click();
//     await page.getByTestId('prop-input-text').click();
//     await page.getByTestId('prop-input-text').press('ControlOrMeta+a');
//     await page.getByTestId('prop-input-text').fill('Test Button');
//     await page.getByTestId('prop-input-text').press('Enter');
//     await page.getByTestId('prop-label-icon').click();
//     await page.getByTestId('prop-input-icon').click();
//     await page.getByText('airplane').click();
//     await page.getByTestId('prop-label-hint').click();
//     await page.getByTestId('prop-input-hint').click();
//     await page.getByTestId('prop-input-hint').press('ControlOrMeta+a');
//     await page.getByTestId('prop-input-hint').fill('Sample Test Hint');
//     await page.getByTestId('prop-input-hint').press('Enter');

  
//   // Switch to Viewer
//   await page.locator("label").filter({ hasText: "Viewer" }).click();

//   // Save
//   await page.getByRole("button", { name: "Save", exact: true }).click();

//   // Get the button element
//   const buttonElement = targetWidget.locator("#mi-button");

//   // ===== EXPECTATIONS =====
  
//   // 1. Verify button is visible
//   await expect(buttonElement).toBeVisible();

//   // 2. Verify button text is "Test Button"
//   await expect(buttonElement).toHaveText('Test Button');

//   // 3. Verify button has airplane icon
//   const iconElement = buttonElement.locator('.dx-icon-airplane');
//   await expect(iconElement).toBeVisible();

//   // 4. Verify button has hint/title attribute
//   await expect(buttonElement).toHaveAttribute('title', 'Sample Test Hint');

//   // 5. Verify button has aria-label
//   await expect(buttonElement).toHaveAttribute('aria-label', 'Test Button');

  
 
// });


test("4. User can change DISPLAY properties for Button widget", async ({
  page,
}) => {
  const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);

  // ============================================================
  // Visible
  // ============================================================

  const visibleLabel = ButtonLocators.visibleLabel(page);
  if ((await visibleLabel.count()) === 0) {
    throw new Error("Test ID prop-label-visible not found.");
  }

  await visibleLabel.click();

  const visibleInput = ButtonLocators.visibleInput(page);
  if ((await visibleInput.count()) === 0) {
    throw new Error("Test ID prop-input-visible not found.");
  }

  await visibleInput.click();
  await visibleInput.click();

  // ============================================================
  // Text
  // ============================================================

  const textLabel = ButtonLocators.textLabel(page);
  if ((await textLabel.count()) === 0) {
    throw new Error("Test ID prop-label-text not found.");
  }

  await textLabel.click();

  const textInput = ButtonLocators.textInput(page);
  if ((await textInput.count()) === 0) {
    throw new Error("Test ID prop-input-text not found.");
  }

  await textInput.click();
  await textInput.press("ControlOrMeta+A");
  await textInput.fill("Test Button");
  await textInput.press("Enter");

  // ============================================================
  // Icon
  // ============================================================

  const iconLabel = ButtonLocators.iconLabel(page);
  if ((await iconLabel.count()) === 0) {
    throw new Error("Test ID prop-label-icon not found.");
  }

  await iconLabel.click();

  const iconInput = ButtonLocators.iconInput(page);
  if ((await iconInput.count()) === 0) {
    throw new Error("Test ID prop-input-icon not found.");
  }

  await iconInput.click();

  const airplaneIcon = page.getByText("airplane");
  if ((await airplaneIcon.count()) === 0) {
    throw new Error("Icon option 'airplane' not found.");
  }

  await airplaneIcon.click();

  // ============================================================
  // Hint
  // ============================================================

  const hintLabel = ButtonLocators.hintLabel(page);
  if ((await hintLabel.count()) === 0) {
    throw new Error("Test ID prop-label-hint not found.");
  }

  await hintLabel.click();

  const hintInput = ButtonLocators.hintInput(page);
  if ((await hintInput.count()) === 0) {
    throw new Error("Test ID prop-input-hint not found.");
  }

  await hintInput.click();
  await hintInput.press("ControlOrMeta+A");
  await hintInput.fill("Sample Test Hint");
  await hintInput.press("Enter");

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();

  // ============================================================
  // Verify Button
  // ============================================================

  const buttonElement = targetWidget.locator("#mi-button");

  // 1. Verify button is visible
  await expect(buttonElement).toBeVisible();

  // 2. Verify button text
  await expect(buttonElement).toHaveText("Test Button");

  // 3. Verify airplane icon
  const iconElement = buttonElement.locator(".dx-icon-airplane");
  await expect(iconElement).toBeVisible();

  // 4. Verify hint/title
  await expect(buttonElement).toHaveAttribute(
    "title",
    "Sample Test Hint",
  );

  // 5. Verify aria-label
  await expect(buttonElement).toHaveAttribute(
    "aria-label",
    "Test Button",
  );
});
});

