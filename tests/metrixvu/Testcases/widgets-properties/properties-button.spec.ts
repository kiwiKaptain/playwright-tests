import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setLayoutAndSpacing, setRunTimeFilter } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";

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
test("2.User can change APPEARANCE properties for Button widget", async ({
    page,
  }) => {
    
    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
 await setRunTimeFilter (page);
// Background Color

await page.getByTestId('prop-label-common-background-color-button').click();
 await page.getByTestId('prop-control-common-background-color-button').click();

const popup = page.locator(".dx-popup-content").filter({
  has: page.getByText("Widget Preview"),
});

const gradientRow = popup.locator(".gradient-row").first();

// Primary Color
const primaryColor = gradientRow.locator(".col-color input.dx-colorbox-input").nth(0);
const secondaryColor = gradientRow.locator(".col-color input.dx-colorbox-input").nth(1);
const angleInput = gradientRow.locator(".angle-input input.dx-texteditor-input");

// Gradient Angle

await primaryColor.click();
await primaryColor.press("ControlOrMeta+A");
await primaryColor.fill("rgb(57, 213, 237)");
await primaryColor.press("Enter");

// Secondary Color
await secondaryColor.click();
await secondaryColor.press("ControlOrMeta+A");
await secondaryColor.fill("rgb(228, 237, 57)");
await secondaryColor.press("Enter");

await angleInput.press("ControlOrMeta+A");
await angleInput.fill("45");
await angleInput.press("Enter");



    
    await page.getByRole('button', { name: 'Save' }).click();
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Get the button element by its ID within the widget
  const buttonElement = targetWidget.locator('#mi-button');
  
  // Get the widget UUID for logging
  const widgetUuid = await targetWidget.getAttribute('data-widget-uuid');
  console.log('Verifying button in widget:', widgetUuid);
  
  // Verify button exists and is visible
  await expect(buttonElement).toBeVisible();
  
  // Verify gradient background
  const style = await buttonElement.getAttribute('style');
  expect(style).toContain('linear-gradient(45deg, rgb(57, 213, 237) 0%, rgb(228, 237, 57) 100%)');
  
 // Verify runtime filter is visible
  const runtimeFilter = targetWidget.locator('[title="Filter"]');

  await expect(runtimeFilter).toBeVisible();

  });



   test("3.User can change GENERAL SETTINGS properties for Button widget", async ({
      page,
    }) => {
      const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
      // Update GENERAL SETTINGS

        await page.getByTestId('prop-label-mi-widget-settings-border-visible').click();
        await page.getByTestId('prop-input-mi-widget-settings-border-visible').click();
        await page.getByTestId('prop-input-mi-widget-settings-border-visible').click();

        await page.getByTestId('prop-label-mi-widget-settings-border-color').click();
        await page.getByTestId('prop-input-mi-widget-settings-border-color').click();
        await page.getByTestId('prop-input-mi-widget-settings-border-color').press('ControlOrMeta+a');
        await page.getByTestId('prop-input-mi-widget-settings-border-color').fill('rgb(102, 217, 92)');
        await page.getByTestId('prop-input-mi-widget-settings-border-color').press('Enter');

        await page.getByTestId('prop-label-mi-widget-settings-border-width').click();
        await page.getByTestId('prop-input-mi-widget-settings-border-width').click();
        await page.getByTestId('prop-input-mi-widget-settings-border-width').press('ControlOrMeta+a');
        await page.getByTestId('prop-input-mi-widget-settings-border-width').fill('12');
        await page.getByTestId('prop-input-mi-widget-settings-border-width').press('Enter');


        await page.getByTestId('prop-label-mi-widget-settings-font-size').click();
        await page.getByTestId('prop-input-mi-widget-settings-font-size').click();
        await page.getByTestId('prop-input-mi-widget-settings-font-size').press('ControlOrMeta+a');
        await page.getByTestId('prop-input-mi-widget-settings-font-size').fill('18');
        await page.getByTestId('prop-input-mi-widget-settings-font-size').press('Enter');


        await page.getByTestId('prop-label-mi-widget-settings-text-color').click();
        await page.getByTestId('prop-input-mi-widget-settings-text-color').click();
        await page.getByTestId('prop-input-mi-widget-settings-text-color').press('ControlOrMeta+a');
        await page.getByTestId('prop-input-mi-widget-settings-text-color').fill('rgb(233, 154, 36)');
        await page.getByTestId('prop-input-mi-widget-settings-text-color').press('Enter');



        await page.getByTestId('prop-label-mi-widget-settings-text-align').click();
          await page.getByTestId('prop-control-mi-widget-settings-text-align-right').click();
   
        // await page.getByText('Border Color:').click();
        // await page.getByRole('combobox').first().click();
        // await page.getByRole('combobox').first().press('ControlOrMeta+a');
        // await page.getByRole('combobox').first().fill('rgb(102, 217, 92)');
        // await page.getByText('Border Width:').click();
        // await page.getByRole('spinbutton').nth(4).press('ControlOrMeta+a');
        // await page.getByRole('spinbutton').nth(4).fill('12');
        // await page.getByText('Text Size:').click();
        // await page.getByRole('spinbutton').nth(5).click();
        // await page.getByRole('spinbutton').nth(5).fill('18');
        // await page.getByText('Text Color:').click();
        // await page.getByRole('combobox').nth(1).click();
        // await page.getByRole('combobox').nth(1).press('ControlOrMeta+a');
        // await page.getByRole('combobox').nth(1).fill('rgb(233, 154, 36)');
        // await page.getByText('Text Align:').click();
        //   await page.locator('button:has(svg g[id="align-right"])').click();

       
        // await page.getByText('Select Function:').click();
        // await page.locator('mi-general-settings').getByRole('button', { name: 'Select' }).click();
        // await page.getByText('Dashboard Navigation').click();
        // await page.getByText('Dashboard Name:').click();
        // await page.getByRole('button', { name: 'edit' }).click();
        // await page.getByText('TestingCardWidget').click();
 
        //  await page.locator('dx-button.dashboard-link-save-btn').click();

      // Switch to Viewer
      await page.locator("label").filter({ hasText: "Viewer" }).click();
  
      // Save
 
// Dashboard Save
await page.locator('button.bg-blue-600').click();
    

  
  // ===== EXPECTATIONS =====
  
   // Get the button element by its ID within the widget
  const buttonElement = targetWidget.locator('#mi-button');
  
  // Get the widget UUID for logging
  const widgetUuid = await targetWidget.getAttribute('data-widget-uuid');
  console.log('Verifying button in widget:', widgetUuid);
  
  // ===== EXPECTATIONS =====
  const buttonContainer = targetWidget.locator(".mi-button-container");

await expect(buttonContainer).toHaveAttribute(
  "style",
  expect.stringContaining("--btn-font-size: 18px")
);

await expect(buttonContainer).toHaveAttribute(
  "style",
  expect.stringContaining("--textbox-text-color: rgba(233, 154, 36, 1)")
);

await expect(buttonContainer).toHaveAttribute(
  "style",
  expect.stringContaining("--textbox-border-color: rgba(102, 217, 92, 1)")
);

await expect(buttonContainer).toHaveAttribute(
  "style",
  expect.stringContaining("--textbox-border-width: 12px")
);

await expect(buttonContainer).toHaveAttribute(
  "style",
  expect.stringContaining("--textbox-text-align: right")
);
    });
    test("4. User can change DISPLAY properties for Button widget", async ({
  page,
}) => {
  const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.BUTTON);
    await page.getByTestId('prop-label-visible').click();
    await page.getByTestId('prop-input-visible').click();
    await page.getByTestId('prop-input-visible').click();
    await page.getByTestId('prop-label-text').click();
    await page.getByTestId('prop-input-text').click();
    await page.getByTestId('prop-input-text').press('ControlOrMeta+a');
    await page.getByTestId('prop-input-text').fill('Test Button');
    await page.getByTestId('prop-input-text').press('Enter');
    await page.getByTestId('prop-label-icon').click();
    await page.getByTestId('prop-input-icon').click();
    await page.getByText('airplane').click();
    await page.getByTestId('prop-label-hint').click();
    await page.getByTestId('prop-input-hint').click();
    await page.getByTestId('prop-input-hint').press('ControlOrMeta+a');
    await page.getByTestId('prop-input-hint').fill('Sample Test Hint');
    await page.getByTestId('prop-input-hint').press('Enter');

  
  // Switch to Viewer
  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // Save
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Get the button element
  const buttonElement = targetWidget.locator("#mi-button");

  // ===== EXPECTATIONS =====
  
  // 1. Verify button is visible
  await expect(buttonElement).toBeVisible();

  // 2. Verify button text is "Test Button"
  await expect(buttonElement).toHaveText('Test Button');

  // 3. Verify button has airplane icon
  const iconElement = buttonElement.locator('.dx-icon-airplane');
  await expect(iconElement).toBeVisible();

  // 4. Verify button has hint/title attribute
  await expect(buttonElement).toHaveAttribute('title', 'Sample Test Hint');

  // 5. Verify button has aria-label
  await expect(buttonElement).toHaveAttribute('aria-label', 'Test Button');

  
 
});
});

