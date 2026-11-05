import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setActionsToNone, setAppearance, setLayoutAndSpacing, setRunTimeFilter } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { NumberBoxTextboxLocators, TextboxLocators } from "../../Locators/numberboxTextboxSpecificLocators";
import { SwitchLocators } from "../../Locators/switchSpecificLocators";
import { ActionLocators } from "../../Locators/commonLocators";


const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { SWITCH: "mi-switch" } as const;
test.describe("BUGS TESTCASES - SWITCH Widget", () => {
  test.beforeEach(async ({ page }) => {
     test.setTimeout(120000);
    await login(page);
    const setupDashboard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, setupDashboard);

    // Drop a single SWITCH widget on the canvas
    await dragAndDropWidget(page, WIDGETS.SWITCH);

    const droppedWidget = await getDroppedWidgetByUuid(page, WIDGETS.SWITCH);
    try {
      await droppedWidget.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Dropped SWITCH widget is not visible on the canvas.");
      console.error(error);
      throw error;
    }

    // Resize widget
    const resizeHandle = droppedWidget.locator(".ui-resizable-se");
    try {
      await resizeHandle.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Resize handle is not visible for the SWITCH widget.");
      console.error(error);
      throw error;
    }
    await resizeWidget(page, droppedWidget, resizeHandle, 150, 150);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });


test("1. Check if on clicking reset, default white background is applied for Switch widget", async ({
  page,
}) => {
  const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SWITCH);

  const switchContainer = targetWidget.locator(".mi-switch-container");

  // Verify background color is white BEFORE Reset
  try {
    await expect(switchContainer).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  } catch (error) {
    console.error(
      "Switch widget background color is not white before Appearance Reset."
    );
    throw error;
  }

  // Reset Appearance properties
  await page.getByRole("button", {
    name: "Reset",
    description: "Reset appearance setting to default",
  }).click();

  // Verify background color is still white AFTER Reset
  try {
    await expect(switchContainer).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );

    // Verify background is not transparent
    const backgroundColor = await switchContainer.evaluate(
      (element) => getComputedStyle(element).backgroundColor
    );

    expect(
      backgroundColor,
      "Switch widget background became transparent after Appearance Reset."
    ).not.toBe("rgba(0, 0, 0, 0)");

  } catch (error) {
    console.error(
      "Switch widget background color is not properly restored after Appearance Reset."
    );
    throw error;
  }
});




test("2. Check if text is properly visible in Light Mode when Pill Toggle Slider style is applied to the Switch widget", async ({
  page,
}) => {

// Switch Style
await SwitchLocators.switchStyleLabel(page).click();
await SwitchLocators.switchStyle(page).click();
await SwitchLocators.switchStyleOption(page, "Pill Toggle Slider").click();
 


// Disabled
await SwitchLocators.disabledLabel(page).click();
await SwitchLocators.disabled(page).click();

// // Read Only
await SwitchLocators.readOnlyLabel(page).click();
await SwitchLocators.readOnly(page).click();
  
  
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
  // Verify Switch in Viewer
  // ============================================================

  const targetWidget = await getDroppedWidgetByUuid(
    page,
    WIDGETS.SWITCH,
  );

  const switchContainer = targetWidget.locator(".switch-dual-segment");

 // ============================================================
  // Verify ON text color in Light Mode
  // ============================================================

  const onText = switchContainer.locator("span").filter({
    hasText: /^ON$/,
  });

  try {
    await expect(onText).not.toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
      {
        timeout: 5000,
      }
    );
  } catch {
    throw new Error(
      "ON text color is white in Light Mode. Switch ON text should not be white."
    );
  }
});




test("3. Check if gear icon is visible for settings Switch widget", async ({
    page,
  }) => {



    const settingTypeInput = ActionLocators.clickSettingTypeInput(page);
    
      // Verify Action setting type input exists
      if ((await settingTypeInput.count()) === 0) {
        throw new Error(
          "Test ID 'prop-input-mi-widget-settings-click-setting-type' or 'prop-label-mi-widget-settings-click-setting-type' for Action setting type input not found. " +
        "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",
        );
      }
      // Click Action setting type
      await ActionLocators.clickSettingType(page).click();
    
      // Open setting type dropdown
      await ActionLocators.clickSettingTypeInput(page).click();
    
      // Select Link To
      await page.getByText("Link To", { exact: true }).click();
    
      // Confirm selection
      await ActionLocators.clickSettingTypeInput(page).press("Enter");
    
      // Open dashboard selection
      //await page.getByRole("button", { name: "preferences" }).click();
      // Open dashboard selection
      try {
        const preferencesButton = page.getByRole("button", {
          name: "preferences",
        });
    
        await expect(preferencesButton).toBeVisible({ timeout: 5000 });
        await preferencesButton.click();
      } catch (error) {
        throw new Error(
          "Settings button not found or could not be clicked while selecting the dashboard. " +
          "Playwright might be stuck or the Action settings dialog might not have loaded correctly. " +
          "Please verify the UI and try rerunning the test case."
        );
      }
   
  });


  
});
