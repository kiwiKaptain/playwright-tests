import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setLayoutAndSpacing } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import {  getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { ImageLocators } from "../../Locators/imageSpecificLocators";


const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { IMAGE: "mi-image" } as const;
test.describe("PROPERTIES - IMAGE Widget", () => {
  test.beforeEach(async ({ page }) => {
     test.setTimeout(120000);
    await login(page);
    const setupDashboard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, setupDashboard);

    // Drop a single IMAGE widget on the canvas
    await dragAndDropWidget(page, WIDGETS.IMAGE);

    const droppedWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);
    try {
      await droppedWidget.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Dropped IMAGE widget is not visible on the canvas.");
      console.error(error);
      throw error;
    }

    // Resize widget
    const resizeHandle = droppedWidget.locator(".ui-resizable-se");
    try {
      await resizeHandle.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Resize handle is not visible for the IMAGE widget.");
      console.error(error);
      throw error;
    }
    await resizeWidget(page, droppedWidget, resizeHandle, 150, 150);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1.User can change LAYOUT & SPACING properties for IMAGE widget", async ({
    page,
  }) => {
    const imageWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);

    // Upload image 
    await page.locator('input[type="file"]').setInputFiles("tests\\metrixvu\\SampleImages\\sample1.jpg");
    // Update Layout & Spacing

     await setLayoutAndSpacing(page, "10", "15", "20", "25");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const imageContent = imageWidget.locator(".grid-stack-item-content");
  const ContentStyle = await imageContent.getAttribute('style');
  expect(ContentStyle).toContain('padding: 10px 15px 20px 25px');
  });
// Test for JPG format
test("2. User can upload JPG format in IMAGE widget", async ({ page }) => {
  const imageWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);

 await page.locator('input[type="file"]').setInputFiles("tests\\metrixvu\\SampleImages\\sample1.jpg");

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const imageElement = await imageWidget.locator('mi-image img'); 
  await expect(imageElement).toHaveAttribute('src', expect.stringContaining('data:image/jpg')); 
});

// Test for png format
test("3. User can upload png format in IMAGE widget", async ({ page }) => {
  const imageWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);

  await page.locator('input[type="file"]').setInputFiles("tests\\metrixvu\\SampleImages\\sample2.png");
  
  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const imageElement = await imageWidget.locator('mi-image img'); 
  await expect(imageElement).toHaveAttribute('src', expect.stringContaining('data:image/png')); 
});

// Test for PNG format
test("4. User can upload jpeg format in IMAGE widget", async ({ page }) => {
  const imageWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);

  await page.locator('input[type="file"]').setInputFiles("tests\\metrixvu\\SampleImages\\sample3.jpeg");
  
  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const imageElement = await imageWidget.locator('mi-image img'); 
  await expect(imageElement).toHaveAttribute('src', expect.stringContaining('data:image/jpeg')); 
});


//  test("5 .User can change APPEARANCE properties for IMAGE widget", async ({
//     page,
//   }) => {
//     const imageWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);

//     // Upload image 

//     await page.locator('input[type="file"]').setInputFiles("test-data/sample1.jpg");
//     // Update Appearance
// await page.getByTestId('prop-label-image-fit').click();
// await page.getByTestId('prop-input-image-fit').click();
// await page.getByText('scale-down').click();
// await page.getByTestId('prop-label-image-border-radius').click();
// await page.getByTestId('prop-input-image-border-radius').click();
// await page.getByTestId('prop-input-image-border-radius').press('ControlOrMeta+a');
// await page.getByTestId('prop-input-image-border-radius').fill('12');
// await page.getByTestId('prop-input-image-border-radius').press('Enter');
// await page.getByTestId('prop-label-image-background-color').click();
// await page.getByTestId('prop-input-image-background-color').click();
// await page.getByTestId('prop-input-image-background-color').press('ControlOrMeta+a');
// await page.getByTestId('prop-input-image-background-color').fill('rgb(229, 214, 73)');
// await page.getByTestId('prop-input-image-background-color').press('Enter');
//    await page.getByText('Rotate', { exact: true }).click();
//     await page.getByRole('button', { name: 'Rotate left' }).click();
//     // Switch to Viewer
//     await page.locator("label").filter({ hasText: "Viewer" }).click();

//     // Save
//     await page.getByRole("button", { name: "Save", exact: true }).click();

//      // Get the image element within the widget using UUID
//     const imageElement = imageWidget.locator('mi-image img');
//     const containerDiv = imageWidget.locator('mi-image div.mi-image-root');

//     // VERIFICATION SECTION

//     //  Object-fit property
//     await expect(imageElement).toHaveCSS('object-fit', 'scale-down');

//     //  Rotation validation
//     const styleAttr = await imageElement.getAttribute('style');
//     expect(styleAttr).toContain('rotate(270deg)');

//     // Border radius
//     await expect(containerDiv).toHaveCSS('border-radius', '12px');

//     //  Background color
//     await expect(containerDiv).toHaveCSS('background-color', 'rgb(229, 214, 73)');

   
 
//   });
test("5. User can change APPEARANCE properties for IMAGE widget", async ({
  page,
}) => {
  const imageWidget = await getDroppedWidgetByUuid(page, WIDGETS.IMAGE);

  // ============================================================
  // Upload Image
  // ============================================================

  await page
    .locator('input[type="file"]')
    .setInputFiles("tests\\metrixvu\\SampleImages\\sample1.jpg");

  // ============================================================
  // Image Fit
  // ============================================================

  const imageFitLabel = ImageLocators.imageFitLabel(page);

  if ((await imageFitLabel.count()) === 0) {
    throw new Error("Test ID prop-label-image-fit not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await imageFitLabel.click();

  const imageFitInput = ImageLocators.imageFitInput(page);

  if ((await imageFitInput.count()) === 0) {
    throw new Error("Test ID prop-input-image-fit not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await imageFitInput.click();

  const scaleDownOption = page.getByText("scale-down");

  if ((await scaleDownOption.count()) === 0) {
    throw new Error("Image fit option 'scale-down' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await scaleDownOption.click();

  // ============================================================
  // Border Radius
  // ============================================================

  const imageBorderRadiusLabel =
    ImageLocators.imageBorderRadiusLabel(page);

  if ((await imageBorderRadiusLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-image-border-radius not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await imageBorderRadiusLabel.click();

  const imageBorderRadiusInput =
    ImageLocators.imageBorderRadiusInput(page);

  if ((await imageBorderRadiusInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-image-border-radius not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await imageBorderRadiusInput.click();
  await imageBorderRadiusInput.press("ControlOrMeta+A");
  await imageBorderRadiusInput.fill("12");
  await imageBorderRadiusInput.press("Enter");

  // ============================================================
  // Background Color
  // ============================================================

  const imageBackgroundColorLabel =
    ImageLocators.imageBackgroundColorLabel(page);

  if ((await imageBackgroundColorLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-image-background-color not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await imageBackgroundColorLabel.click();

  const imageBackgroundColorInput =
    ImageLocators.imageBackgroundColorInput(page);

  if ((await imageBackgroundColorInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-image-background-color not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await imageBackgroundColorInput.click();
  await imageBackgroundColorInput.press("ControlOrMeta+A");
  await imageBackgroundColorInput.fill("rgb(229, 214, 73)");
  await imageBackgroundColorInput.press("Enter");

  // ============================================================
  // Rotate Image
  // ============================================================

  const rotateOption = page.getByText("Rotate", { exact: true });

  if ((await rotateOption.count()) === 0) {
    throw new Error("Rotate option not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await rotateOption.click();

  const rotateLeftButton = page.getByRole("button", {
    name: "Rotate left",
  });

  if ((await rotateLeftButton.count()) === 0) {
    throw new Error("Rotate left button not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await rotateLeftButton.click();

  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", {
    name: "Save",
    exact: true,
  }).click();

  // ============================================================
  // Get Image Elements
  // ============================================================

  const imageElement = imageWidget.locator("mi-image img");
  const containerDiv = imageWidget.locator("mi-image div.mi-image-root");

  // ============================================================
  // VERIFICATION
  // ============================================================

  // Object-fit property
  await expect(imageElement).toHaveCSS(
    "object-fit",
    "scale-down",
  );

  // Rotation validation
  const styleAttr = await imageElement.getAttribute("style");

  expect(styleAttr).toContain("rotate(270deg)");

  // Border radius
  await expect(containerDiv).toHaveCSS(
    "border-radius",
    "12px",
  );

  // Background color
  await expect(containerDiv).toHaveCSS(
    "background-color",
    "rgb(229, 214, 73)",
  );
});
});
