import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { setActionsProperties, setActionsToNone, setAppearance, setLayoutAndSpacing, setRunTimeFilter } from "../../CommonHelperFunctions/commonPropertiesHelpers";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import { getDroppedWidgetByUuid, resizeWidget } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { NumberBoxTextboxLocators, TextboxLocators } from "../../Locators/numberboxTextboxSpecificLocators";
import { SwitchLocators } from "../../Locators/switchSpecificLocators";


const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { SWITCH: "mi-switch" } as const;
test.describe("PROPERTIES - SWITCH Widget", () => {
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

 test("1.User can change LAYOUT & SPACING properties for Switch widget", async ({
     page,
   }) => {
     const targetWidget  = await getDroppedWidgetByUuid(page, WIDGETS.SWITCH);
 

   
           // Update Layout & Spacing
         
     await setLayoutAndSpacing(page, "10", "15", "20", "25");
     // Switch to Viewer
     await page.locator("label").filter({ hasText: "Viewer" }).click();
 
     // Save
     await page.getByRole("button", { name: "Save", exact: true }).click();
 
     const targetWidgetContent = targetWidget .locator(".grid-stack-item-content");
     await expect(targetWidgetContent).toHaveCSS("padding-top", "10px");
     await expect(targetWidgetContent).toHaveCSS("padding-right", "15px");
     //await expect(targetWidgetContent).toHaveCSS("padding-bottom", "20px");
     await expect(targetWidgetContent).toHaveCSS("padding-left", "25px");
   });




   test("2 .User can change APPEARANCE properties for Switch widget", async ({
        page,
      }) => {
            
           await setAppearance(page, "rgb(229, 214, 73)"); 
          
      await setRunTimeFilter (page);
   // Switch to Viewer
   await page.locator("label").filter({ hasText: "Viewer" }).click();
   
   // Save
   await page.getByRole("button", { name: "Save", exact: true }).click();
   
   
   const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SWITCH);
        
   
     // Verify background color - look for the container with the background
     const bgContainer = targetWidget.locator(".mi-switch-container");
     
     // Wait for the container to be visible
     await bgContainer.waitFor({ state: "visible" });
     
     // Check the background color 
     await expect(bgContainer).toHaveCSS("background-color", "rgb(229, 214, 73)");
   
   // Verify runtime filter is visible
     const runtimeFilter = targetWidget.locator('[title="Filter"]');
   
     await expect(runtimeFilter).toBeVisible();
   
   });




test("3. User can change Switch ON Text properties for Switch widget", async ({
  page,
}) => {

// Switch Style
await SwitchLocators.switchStyleLabel(page).click();
await SwitchLocators.switchStyle(page).click();
await SwitchLocators.switchStyleOption(page, "Neon Glow Slider").click();

// Switched ON Text
await SwitchLocators.switchedOnTextLabel(page).click();
await SwitchLocators.switchedOnText(page).fill("Active");



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

  const switchContainer = targetWidget.locator(".switch-neon-glow");

  try {
    await expect(switchContainer).toBeVisible({
      timeout: 10000,
    });
  } catch {
    throw new Error(
      "Switch style 'Neon Glow Slider' was not applied correctly in Viewer."
    );
  }

    // ============================================================
  // Verify Active Text
  // ============================================================

  const activeText = switchContainer.locator("span").nth(0);

  try {
    await expect(activeText).toHaveText("Active");
    await expect(activeText).toHaveClass(/opacity-100/);
  } catch {
    console.log("Active text:", await activeText.textContent());
    console.log("Active class:", await activeText.getAttribute("class"));

    throw new Error(
      "Switch ON text 'Active' is missing or not visible in Viewer."
    );
  }

});


test("4. User can change Switch OFF Text & Switch State value properties for Switch widget", async ({
  page,
}) => {
  // ============================================================
  // Value
  // ============================================================
// Switch Style
await SwitchLocators.switchStyleLabel(page).click();
await SwitchLocators.switchStyle(page).click();
await SwitchLocators.switchStyleOption(page, "Neon Glow Slider").click();

// Switched OFF Text
await SwitchLocators.switchedOffTextLabel(page).click();
await SwitchLocators.switchedOffText(page).fill("Stop");

// Switched off state value input
await SwitchLocators.switchStateValueLabel(page).click();
await SwitchLocators.switchStateValueInput(page).click();
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

  const switchContainer = targetWidget.locator(".switch-neon-glow");

  try {
    await expect(switchContainer).toBeVisible({
      timeout: 10000,
    });
  } catch {
    throw new Error(
      "Switch style 'Neon Glow Slider' was not applied correctly in Viewer."
    );
  }

    // ============================================================
  // Verify Stop Text
  // ============================================================

  const inactiveText = switchContainer.locator("span").nth(1);

  try {
    await expect(inactiveText).toHaveText("Stop");
    await expect(inactiveText).toHaveClass(/opacity-100/);
  } catch {
    

    throw new Error(
      "Switch OFF text 'Stop' is missing or not visible in Viewer."
    );
  }

});

test("5. User can change Switch Style -Switch Dual Segment properties for Switch widget", async ({
  page,
}) => {

// Switch Style
await SwitchLocators.switchStyleLabel(page).click();
await SwitchLocators.switchStyle(page).click();
await SwitchLocators.switchStyleOption(page, "Dual Segment (ON | OFF)").click();
 


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

  try {
    await expect(switchContainer).toBeVisible({
      timeout: 10000,
    });
  } catch {
    throw new Error(
      "Switch style 'Switch Dual Segment' was not applied correctly in Viewer."
    );
  }

});


test("6. User can update READ only Images to ON state  for Switch widget", async ({
  page,
}) => {
 
// Switch Style
await SwitchLocators.switchStyleLabel(page).click();
await SwitchLocators.switchStyle(page).click();
await SwitchLocators.switchStyleOption(page, "Neon Glow Slider").click();






// ============================================================
// Read Only
// ============================================================

await SwitchLocators.readOnlyLabel(page).click();
await SwitchLocators.readOnly(page).click();

// Upload Read Only State Image
await page.getByTestId("prop-label-switch-state1-image").click();



await page
  .getByTestId("prop-container-switch-state1-image")
  .locator('input[type="file"]')
  .setInputFiles("tests\\metrixvu\\SampleImages\\sample1.jpg");

// Image Fit
await page.getByTestId("prop-label-switch-state-image-fit").click();

await page
  .getByTestId("prop-control-switch-state-image-fit")
  .getByRole("button", { name: "Select" })
  .click();

await page.getByText("fill", { exact: true }).click();




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

  // ============================================================
// Verify Read Only Image in Viewer
// ============================================================

const readOnlyImage = targetWidget.locator(
  ".mi-switch-container img"
);

try {
  await expect(readOnlyImage).toBeVisible({
    timeout: 10000,
  });

  const imageSrc = await readOnlyImage.getAttribute("src");

  expect(
    imageSrc,
    "Read Only state image was not uploaded or has an empty src."
  ).toBeTruthy();

  await expect(readOnlyImage).toHaveCSS(
    "object-fit",
    "fill"
  );

} catch {
  throw new Error(
    "Read Only state image was not displayed correctly in Viewer. " +
    "Please verify image upload and Image Fit settings."
  );
}
   


});

test("7 .User can change Link Dashboard via ACTIONS properties for  Switch widget", async ({
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
    const targetWidget = await getDroppedWidgetByUuid(page, WIDGETS.SWITCH);
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
  test("8. User can set the action type to NONE for  Switch widget", async ({
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
          WIDGETS.SWITCH,
        );
        await cardWidget.click();
    
        // Verify the None Action
        await expect(
          page.locator('//p[contains(@class,"truncate")]'),
        ).toContainText(TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting);
      });
});