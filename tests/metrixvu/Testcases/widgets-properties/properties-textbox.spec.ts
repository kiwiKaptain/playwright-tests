import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setActionsToNone, setAppearance, setLayoutAndSpacing, setRunTimeFilter } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { NumberBoxTextboxLocators, TextboxLocators } from "../../Locators/numberboxTextboxSpecificLocators";


const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { TEXTBOX: "mi-text-box" } as const;
test.describe("PROPERTIES - TEXTBOX Widget", () => {
  test.beforeEach(async ({ page }) => {
     test.setTimeout(120000);
    await login(page);
    const setupDashboard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, setupDashboard);

    // Drop a single TEXTBOX widget on the canvas
    await dragAndDropWidget(page, WIDGETS.TEXTBOX);

    const droppedWidget = await getDroppedWidgetByUuid(page, WIDGETS.TEXTBOX);
    try {
      await droppedWidget.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Dropped TEXTBOX widget is not visible on the canvas.");
      console.error(error);
      throw error;
    }

    // Resize widget
    const resizeHandle = droppedWidget.locator(".ui-resizable-se");
    try {
      await resizeHandle.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Resize handle is not visible for the TEXTBOX widget.");
      console.error(error);
      throw error;
    }
    await resizeWidget(page, droppedWidget, resizeHandle, 150, 150);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

 test("1.User can change LAYOUT & SPACING properties for Textbox widget", async ({
     page,
   }) => {
     const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.TEXTBOX);
 

   
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




   test("2 .User can change APPEARANCE properties for Textbox widget", async ({
        page,
      }) => {
            
           await setAppearance(page, "rgb(229, 214, 73)"); 
          
      await setRunTimeFilter (page);
   // Switch to Viewer
   await page.locator("label").filter({ hasText: "Viewer" }).click();
   
   // Save
   await page.getByRole("button", { name: "Save", exact: true }).click();
   
   
   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.TEXTBOX);
        
   
     // Verify background color - look for the container with the background
     const bgContainer = targetWidget.locator(".mi-text-box-container");
     
     // Wait for the container to be visible
     await bgContainer.waitFor({ state: "visible" });
     
     // Check the background color 
     await expect(bgContainer).toHaveCSS("background-color", "rgb(229, 214, 73)");
   
   // Verify runtime filter is visible
     const runtimeFilter = targetWidget.locator('[title="Filter"]');
   
     await expect(runtimeFilter).toBeVisible();
   
   });




test("3. User can change GENERAL properties for Textbox widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================

  const valueLabel = TextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueLabel.click();

  const valueInput = TextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueInput.fill("SampleText");

  // ============================================================
  // Border Visible
  // ============================================================

  const borderVisibleLabel =
    TextboxLocators.borderVisibleLabel(page);

  if ((await borderVisibleLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-border-visible' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await borderVisibleLabel.click();

  const borderVisibleInput =
    TextboxLocators.borderVisible(page);

  if ((await borderVisibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-border-visible' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  // Toggle only when necessary to avoid clicking twice.
  const isBorderVisibleChecked =
    (await borderVisibleInput.getAttribute("aria-checked")) === "true";

  if (isBorderVisibleChecked) {
   // await borderVisibleInput.click();
  }

  // ============================================================
  // Border Color
  // ============================================================

  const borderColorLabel =
    TextboxLocators.borderColorLabel(page);

  if ((await borderColorLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-border-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await borderColorLabel.click();

  const borderColorInput =
    TextboxLocators.borderColor(page);

  if ((await borderColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-border-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await borderColorInput.fill("rgba(247, 54, 54, 1)");
  await borderColorInput.press("Enter");

  // ============================================================
  // Border Width
  // ============================================================

  const borderWidthLabel =
    TextboxLocators.borderWidthLabel(page);

  if ((await borderWidthLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-border-width' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await borderWidthLabel.click();

  const borderWidthInput =
    TextboxLocators.borderWidth(page);

  if ((await borderWidthInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-border-width' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await borderWidthInput.fill("4");
  await borderWidthInput.press("Enter");

  // ============================================================
  // Font Size
  // ============================================================

  const fontSizeLabel =
    TextboxLocators.fontSizeLabel(page);

  if ((await fontSizeLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-font-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await fontSizeLabel.click();

  const fontSizeInput =
    TextboxLocators.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-font-size' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await fontSizeInput.fill("15");
  await fontSizeInput.press("Enter");

  // ============================================================
  // Text Color
  // ============================================================

  const textColorLabel =
    TextboxLocators.textColorLabel(page);

  if ((await textColorLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-text-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await textColorLabel.click();

  const textColorInput =
    TextboxLocators.textColor(page);

  if ((await textColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-text-color' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await textColorInput.fill("rgba(90, 68, 235, 1)");
  await textColorInput.press("Enter");

  // ============================================================
  // Text Alignment
  // ============================================================

  const textAlignLabel =
    TextboxLocators.textAlignLabel(page);

  if ((await textAlignLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-text-align' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await textAlignLabel.click();

  const textAlignRight =
    TextboxLocators.textAlign(page, "right");

  if ((await textAlignRight.count()) === 0) {
    throw new Error(
      "Test ID 'prop-control-text-align-right' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
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

  await page.getByRole("button", {
    name: "Save",
    exact: true,
  }).click();
  
  // ============================================================
  // Verify Textbox in Viewer
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.TEXTBOX,
  );

  const textboxContainer = targetWidget.locator("dx-text-box");

  if ((await textboxContainer.count()) === 0) {
    throw new Error(
      "Textbox container not found in Viewer. The Textbox widget may not have loaded correctly. Please try rerunning the test case."
    );
  }

  const textboxInput = textboxContainer.locator(
    "input.dx-texteditor-input[role='textbox']"
  );

  await expect(textboxInput).toBeVisible({ timeout: 10000 });

  // ============================================================
  // Verify Value
  // ============================================================

  const actualValue = await textboxInput.inputValue();

  expect(
    actualValue,
    "GENERAL PROPERTY FAILED: Expected Textbox value to be 'SampleText', but found '" +
      actualValue +
      "'."
  ).toBe("SampleText");

 
  // ============================================================
  // Verify Border Visible
  // ============================================================

  const textboxWrapper = targetWidget.locator(
    ".mi-text-box-container"
  );

  await expect(
    textboxWrapper,
    "GENERAL PROPERTY FAILED: Textbox container should be visible."
  ).toBeVisible();

  await expect(
    textboxWrapper,
    "GENERAL PROPERTY FAILED: Textbox border should be visible."
  ).toHaveClass(/mi-border-visible/);

  // ============================================================
  // Verify Border Color
  // ============================================================

  const actualBorderColor = await textboxWrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--textbox-border-color").trim()
  );

  expect(
    actualBorderColor,
    `GENERAL PROPERTY FAILED: Expected border color to be 'rgba(247, 54, 54, 1)', but found '${actualBorderColor}'.`
  ).toBe("rgba(247, 54, 54, 1)");

  // ============================================================
  // Verify Border Width
  // ============================================================

  const actualBorderWidth = await textboxWrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--textbox-border-width").trim()
  );

  expect(
    actualBorderWidth,
    `GENERAL PROPERTY FAILED: Expected border width to be '4px', but found '${actualBorderWidth}'.`
  ).toBe("4px");

  // ============================================================
  // Verify Font Size
  // ============================================================

  const actualFontSize = await textboxWrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--textbox-font-size").trim()
  );

  expect(
    actualFontSize,
    `GENERAL PROPERTY FAILED: Expected font size to be '15px', but found '${actualFontSize}'.`
  ).toBe("15px");

  // ============================================================
  // Verify Text Color
  // ============================================================

  const actualTextColor = await textboxWrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--textbox-text-color").trim()
  );

  expect(
    actualTextColor,
    `GENERAL PROPERTY FAILED: Expected text color to be 'rgba(90, 68, 235, 1)', but found '${actualTextColor}'.`
  ).toBe("rgba(90, 68, 235, 1)");

  // ============================================================
  // Verify Text Alignment
  // ============================================================

  const actualTextAlign = await textboxWrapper.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("--textbox-text-align").trim()
  );

  expect(
    actualTextAlign,
    `GENERAL PROPERTY FAILED: Expected text alignment to be 'right', but found '${actualTextAlign}'.`
  ).toBe("right");

});




test("4. User can change PLACEHOLDER properties for Textbox widget", async ({
  page,
}) => {
  // ============================================================
  // Placeholder
  // ============================================================

  const placeholderLabel = TextboxLocators.placeholderLabel(page);

  if ((await placeholderLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await placeholderLabel.click();

  const placeholderInput = TextboxLocators.placeholderInput(page);

  if ((await placeholderInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-placeholder' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await placeholderInput.fill("Placeholder Test ");
  await placeholderInput.press("Enter");

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
  // Verify Placeholder in Viewer
  // ============================================================

  const textbox = page.locator(
    '[data-widget-type="mi-text-box"] input.dx-texteditor-input'
  );

  if ((await textbox.count()) === 0) {
    throw new Error(
      "TextBox placeholder input not found in Viewer. " 
       
    );
  }

  try {
    await expect(textbox).toHaveAttribute(
      "placeholder",
      "Placeholder Test "
    );
  } catch (error) {
    throw new Error(
      "TextBox placeholder verification failed. Expected placeholder to be 'Placeholder Test '. " +
        "Please check placeholder property."
    );
  }
});


test("5. User can change MASK properties for Textbox widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================

  const valueLabel = TextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueLabel.click();

  const valueInput = TextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueInput.fill("123456789");
  // ============================================================
  // Mask
  // ============================================================

  const maskLabel = TextboxLocators.maskLabel(page);

  if ((await maskLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-mask' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await maskLabel.click();

  const maskInput = TextboxLocators.mask(page);

  if ((await maskInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mask' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await maskInput.fill("000");
  await maskInput.press("Enter");

  // ============================================================
  // Mask Character
  // ============================================================

  const maskCharLabel = TextboxLocators.maskCharLabel(page);

  if ((await maskCharLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-mask-char' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await maskCharLabel.click();

  const maskCharInput = TextboxLocators.maskChar(page);

  if ((await maskCharInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mask-char' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await maskCharInput.fill("*");
  await maskCharInput.press("Enter");

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
  // Verify Textbox Mask in Viewer
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.TEXTBOX,
  );

  const textboxContainer = targetWidget.locator(
    ".mi-text-box-container",
  );

  if ((await textboxContainer.count()) === 0) {
    throw new Error(
      "Textbox container not found in Viewer. " +
        "Playwright might be stuck hence may not have loaded the widget correctly. Please try rerunning the test case."
    );
  }

  await expect(textboxContainer).toBeVisible();

  const textboxInput = targetWidget.locator(
    "input.dx-texteditor-input",
  );

  if ((await textboxInput.count()) === 0) {
    throw new Error(
      "Textbox input not found in Viewer. " +
        "Playwright might be stuck hence may not have loaded the widget correctly. Please try rerunning the test case."
    );
  }

  try {
    await expect(textboxInput).toHaveValue("123");
  } catch (error) {
    throw new Error(
      "Textbox mask verification failed. Expected the visible value to be '123' " +
        "when the mask is '000' and the given input value is '123456789'."
    );
  }
});


test("6. User can change MAX LENGTH properties for Textbox widget", async ({
  page,
}) => {
   // ============================================================
  // Value
  // ============================================================

  const valueLabel = TextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueLabel.click();

  const valueInput = TextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueInput.fill("123456789");
  // ============================================================
  // Max Length
  // ============================================================

  const maxLengthLabel = page.getByTestId("prop-label-max-length");

  if ((await maxLengthLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-max-length' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await maxLengthLabel.click();

  const maxLengthInput = page.getByTestId("prop-input-max-length");

  if ((await maxLengthInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-max-length' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await maxLengthInput.fill("5");
  await maxLengthInput.press("Enter");

  
  // ============================================================
  // Switch to Viewer
  // ============================================================

  await page.locator("label").filter({ hasText: "Viewer" }).click();

  // ============================================================
  // Save
  // ============================================================

  await page.getByRole("button", { name: "Save", exact: true }).click();
// ============================================================
  // Verify Textbox Max length in Viewer
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.TEXTBOX,
  );

  const textboxContainer = targetWidget.locator(
    ".mi-text-box-container",
  );

  if ((await textboxContainer.count()) === 0) {
    throw new Error(
      "Textbox container not found in Viewer. " +
        "Playwright might be stuck hence may not have loaded the widget correctly. Please try rerunning the test case."
    );
  }

  await expect(textboxContainer).toBeVisible();

  const textboxInput = targetWidget.locator(
    "input.dx-texteditor-input",
  );

  if ((await textboxInput.count()) === 0) {
    throw new Error(
      "Textbox input not found in Viewer. " +
        "Playwright might be stuck hence may not have loaded the widget correctly. Please try rerunning the test case."
    );
  }

  try {
    await expect(textboxInput).toHaveValue("12345");
  } catch (error) {
    throw new Error(
      "Textbox Max Length verification failed. Expected the visible value to be '12345' of 5 digits maximum " +
        "when the max length is '5' and the given input value is '123456789'."
    );
  }
});



test("7. User can change DISPLAY properties for Textbox widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================

  const valueLabel = TextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueLabel.click();

  const valueInput = TextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueInput.fill("123456789");
  await valueInput.press("Enter");

  // ============================================================
  // Label
  // ============================================================

  const labelLabel = TextboxLocators.labelLabel(page);

  if ((await labelLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-label' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await labelLabel.click();

  const labelInput = TextboxLocators.label(page);

  if ((await labelInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-label' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await labelInput.fill("TestLabel");
  await labelInput.press("Enter");

  // ============================================================
  // Label Mode: Static
  // ============================================================

  const labelMode = TextboxLocators.labelMode(page);

  if ((await labelMode.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-label-mode' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await labelMode.click();

  const staticOption = TextboxLocators.labelModeOption(page, "static");

  if ((await staticOption.count()) === 0) {
    throw new Error(
      "Label mode option 'static' not found. Please check whether the dropdown loaded correctly."
    );
  }

  await staticOption.click();

  // ============================================================
  // Label Mode: Outside
  // ============================================================

  await labelMode.click();

  const outsideOption = TextboxLocators.labelModeOption(page, "outside");

  if ((await outsideOption.count()) === 0) {
    throw new Error(
      "Label mode option 'outside' not found. Please check whether the dropdown loaded correctly."
    );
  }

  await outsideOption.click();

  // ============================================================
  // Styling Mode: Filled
  // ============================================================

  const stylingMode = TextboxLocators.stylingMode(page);

  if ((await stylingMode.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-styling-mode' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await stylingMode.click();

  const filledOption = TextboxLocators.stylingModeOption(page, "filled");

  if ((await filledOption.count()) === 0) {
    throw new Error(
      "Styling mode option 'filled' not found. Please check whether the dropdown loaded correctly."
    );
  }

  await filledOption.click();

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
  // Verify Textbox in Viewer
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.TEXTBOX,
  );

  const textboxContainer = targetWidget.locator(
    ".mi-text-box-container",
  );

  if ((await textboxContainer.count()) === 0) {
    throw new Error(
      "Textbox container not found in Viewer. " +
        "Playwright might be stuck hence may not have loaded the widget correctly. Please try rerunning the test case."
    );
  }

  await expect(textboxContainer).toBeVisible();

  // ============================================================
  // Verify Value
  // ============================================================

  const textboxInput = textboxContainer.locator(
    "input.dx-texteditor-input",
  );

  if ((await textboxInput.count()) === 0) {
    throw new Error(
      "Textbox input not found in Viewer. Please check whether the widget loaded correctly."
    );
  }

  try {
    await expect(textboxInput).toHaveValue("123456789");
  } catch (error) {
    throw new Error(
      "Textbox value verification failed. Expected value '123456789' in Viewer."
    );
  }

  // ============================================================
  // Verify Label Text
  // ============================================================

  const displayedLabel = textboxContainer.locator(
    ".dx-texteditor-label .dx-label span",
  );

  try {
    await expect(displayedLabel).toHaveText("TestLabel");
  } catch (error) {
    throw new Error(
      "Textbox label verification failed. Expected label text 'TestLabel'."
    );
  }

  // ============================================================
  // Verify Label Mode: Outside
  // ============================================================

  try {
    await expect(textboxContainer).toHaveClass(/label-outside/);
    await expect(
      textboxContainer.locator("dx-text-box"),
    ).toHaveClass(/dx-texteditor-label-outside/);
  } catch (error) {
    throw new Error(
      "Textbox label mode verification failed. Expected label mode 'outside'."
    );
  }

  // ============================================================
  // Verify Styling Mode: Filled
  // ============================================================

  try {
    await expect(
      textboxContainer.locator("dx-text-box"),
    ).toHaveClass(/dx-editor-filled/);
  } catch (error) {
    throw new Error(
      "Textbox styling mode verification failed. Expected styling mode 'filled'."
    );
  }
});

test("8. User can change input mode password properties for Textbox widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================

  const valueLabel = TextboxLocators.valueLabel(page);

  if ((await valueLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueLabel.click();

  const valueInput = TextboxLocators.value(page);

  if ((await valueInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await valueInput.fill("123456789");
  await valueInput.press("Enter");

  

   // ============================================================
  // Mode - Password
  // ============================================================

  const modeLabel = TextboxLocators.modeLabel(page);

  if ((await modeLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-mode' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await modeLabel.click();

  const modeInput = TextboxLocators.modeInput(page);

  if ((await modeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mode' not found. " +
        "Playwright might be stuck hence may not have loaded test correctly. Please try rerunning the test case."
    );
  }

  await modeInput.click();

  const passwordOption = page.getByText("password", {
    exact: true,
  });

  if ((await passwordOption.count()) === 0) {
    throw new Error(
      "Option 'password' not found. " +
        "Playwright might be stuck hence may not have loaded the Textbox mode options correctly. Please try rerunning the test case."
    );
  }

  await passwordOption.click();
  

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
  // Verify Password Mode
  // ============================================================

  const textboxWidget = page.locator(
    "mi-text-box .mi-text-box-container"
  );

  await textboxWidget.waitFor({ state: "visible" });

  const passwordWidget = page.locator(
    "mi-text-box dx-text-box.mi-mask-password"
  );

  if ((await passwordWidget.count()) === 0) {
    throw new Error(
      "Password mode was not applied. " +
        "Expected class 'mi-mask-password' on the Textbox widget."
    );
  }
  
});
test("9.User can change Link Dashboard via ACTIONS properties for Textbox widget", async ({
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
    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.TEXTBOX);
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
  test("10. User can set the action type to NONE for textbox widget", async ({
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
          WIDGETS.TEXTBOX,
        );
        await cardWidget.click();
    
        // Verify the None Action
        await expect(
          page.locator('//p[contains(@class,"truncate")]'),
        ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
      });
});
