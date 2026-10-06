import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import { login, ensureDashboardExists, openEditorAndClearCanvas, goToHomeAndVerify } from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import {  selectWidgetsOnCanvas, setupWidgets,  } from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { AlignmentLocators } from "../../Locators/commonLocators";
import { expectAllValuesEqual, expectWidgetsNotOverlapping, getCenter, getWidgetAttributeValues } from "../../CommonHelperFunctions/commonAlignmentHelpers";
import { dragAndDropWidgetWithTouchingEdges } from "../../CommonHelperFunctions/commonDragDropHelpers";
const WIDGETS = { BUTTON: "mi-button" } as const;
const CardWidgetCssSelector = '.grid-stack-item[data-widget-type="mi-button"]';
const dashboardName = TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;

test.describe("ALIGNMENT - BUTTON Widget", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    const setupDashboard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, setupDashboard);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1. User can change LEFT alignment for Button  widgets .Expected: all selected widgets should have the same left alignment.", async ({
    page,
  }) => {
 
   const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
     await selectWidgetsOnCanvas(page, uuids);
// await AlignmentLocators.alignLeft(page).click();
   const alignLeft = AlignmentLocators.alignLeft(page);

  if ((await alignLeft.count()) === 0) {
    throw new Error(
      "Test ID 'prop-control-align-left' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await alignLeft.click();
   
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const selectedWidgets = page.locator(CardWidgetCssSelector);
    const leftPositions = await getWidgetAttributeValues(selectedWidgets, "gs-x");
    console.log("Widget left positions (gs-x):", leftPositions);
    expectAllValuesEqual(leftPositions, "left position (gs-x)");
  });

test("2. User can change LEFT alignment for Button  widgets arranged with touching edges .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
  // await AlignmentLocators.alignLeft(page).click();
   const alignLeft = AlignmentLocators.alignLeft(page);

  if ((await alignLeft.count()) === 0) {
    throw new Error(
      "Test ID 'prop-control-align-left' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await alignLeft.click();

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const leftPositions = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-x",
  );

  console.log("Widget left positions (gs-x):", leftPositions);

  expectAllValuesEqual(
    leftPositions,
    "left position (gs-x)",
  );

  // Verify widgets are not overlapping
  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("3. User can change MIDDLE alignment for Button  widgets  .Expected: all selected widgets should have the same middle alignment.", async ({
    page,
  }) => {
   
      const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,2);
            await selectWidgetsOnCanvas(page, uuids);
         //  await AlignmentLocators.alignCenterHorizontal(page).click();
const alignCenterHorizontal = AlignmentLocators.alignCenterHorizontal(page);

if ((await alignCenterHorizontal.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-center-horizontal' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignCenterHorizontal.click();
    await page.waitForTimeout(500);

    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Get widgets by UUID
    const widget1 = page.locator(`.grid-stack [data-widget-uuid="${uuids[0]}"]`);
    const widget2 = page.locator(`.grid-stack [data-widget-uuid="${uuids[1]}"]`);


    const refCenterX = await getCenter(widget1, "x");
    const widget2CenterX = await getCenter(widget2, "x");


    console.log("Reference Centre X:", refCenterX);
    console.log("Widget2 Centre X:", widget2CenterX);
   

    expect(Math.abs(widget2CenterX - refCenterX)).toBeLessThanOrEqual(2);
 
  });

test("4. User can change MIDDLE alignment for Button  widgets arranged with touching edges  .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    2,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
  await AlignmentLocators.alignCenterHorizontal(page).click();

  await page.waitForTimeout(500);

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);

  const widget1 = page.locator(
    `.grid-stack [data-widget-uuid="${uuids[0]}"]`,
  );
  const widget2 = page.locator(
    `.grid-stack [data-widget-uuid="${uuids[1]}"]`,
  );


  const refCenterX = await getCenter(widget1, "x");
  const widget2CenterX = await getCenter(widget2, "x");
  

  expect(Math.abs(widget2CenterX - refCenterX)).toBeLessThanOrEqual(2);


  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const xPositions = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-x",
  );

  // Make sure they were not originally all in the same column.
  expect(new Set(xPositions).size).toBeGreaterThan(1);

  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("5. User can change RIGHT alignment for Button  widgets  .Expected: all selected widgets should have the same right alignment.", async ({
    page,
  }) => {

  const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
     await selectWidgetsOnCanvas(page, uuids);
const alignRight = AlignmentLocators.alignRight(page);

//await AlignmentLocators.alignRight(page).click();
if ((await alignRight.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-right' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignRight.click();
   
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const selectedWidgets = page.locator(CardWidgetCssSelector);
    const count = await selectedWidgets.count();

    const rightPositions: number[] = [];
    for (let i = 0; i < count; i++) {
      const widget = selectedWidgets.nth(i);
      const gsX = await widget.getAttribute("gs-x");
      const gsW = await widget.getAttribute("gs-w");
      if (gsX && gsW) rightPositions.push(parseInt(gsX) + parseInt(gsW));
    }
    console.log("Widget right edge positions:", rightPositions);
    expectAllValuesEqual(rightPositions, "right edge (gs-x + gs-w)");
  });

test("6. User can change RIGHT alignment for Button  widgets arranged with touching edges  .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
  const alignRight = AlignmentLocators.alignRight(page);

//await AlignmentLocators.alignRight(page).click();
if ((await alignRight.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-right' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignRight.click();

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const rightPositions: number[] = [];

  const count = await selectedWidgets.count();

  for (let i = 0; i < count; i++) {
    const widget = selectedWidgets.nth(i);
    const gsX = await widget.getAttribute("gs-x");
    const gsW = await widget.getAttribute("gs-w");

    if (gsX && gsW) {
      rightPositions.push(
        parseInt(gsX) + parseInt(gsW),
      );
    }
  }

  console.log("Widget right edge positions:", rightPositions);

  expectAllValuesEqual(
    rightPositions,
    "right edge (gs-x + gs-w)",
  );

  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("7. User can change TOP alignment for Button  widgets  .Expected: all selected widgets should have the same top alignment.", async ({
    page,
  }) => {


  const { uuids } = await setupWidgets(page,WIDGETS.BUTTON,3);
  await selectWidgetsOnCanvas(page, uuids);
 // await AlignmentLocators.alignTop(page).click();
const alignTop = AlignmentLocators.alignTop(page);

if ((await alignTop.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-top' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignTop.click();
  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", {name: "Save",exact: true,}).click();
  const selectedWidgets =page.locator(CardWidgetCssSelector);
  const topPositions = await getWidgetAttributeValues(selectedWidgets,"gs-y", );
  expectAllValuesEqual( topPositions,"top position (gs-y)",);
  });

 test("8. User can change TOP alignment for Button widgets are placed arranged with touching edges  .Expected: widgets should not overlap each other.", async ({
    page,
  }) => {


  //const { uuids } = await setupWidgetsWithTouchingEdges(page,WIDGETS.BUTTON,3);
  const { uuids } = await setupWidgets(
  page,
  WIDGETS.BUTTON,
  3,
  dragAndDropWidgetWithTouchingEdges,
);
  await selectWidgetsOnCanvas(page, uuids);
 // await AlignmentLocators.alignTop(page).click();
const alignTop = AlignmentLocators.alignTop(page);

if ((await alignTop.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-top' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignTop.click();
  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", {name: "Save",exact: true,}).click();
 const selectedWidgets = page.locator(CardWidgetCssSelector);
const xPositions = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-x",
  );

  // Verify widgets are NOT all in the same column
  expect(new Set(xPositions).size).toBeGreaterThan(1);

  await expectWidgetsNotOverlapping(selectedWidgets);
});


  test("9. User can change CENTER alignment for Button  widgets  .Expected: all selected widgets should have the same center alignment.", async ({
    page,
  }) => {
    
      const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
     
            await selectWidgetsOnCanvas(page, uuids);
        
       //await AlignmentLocators.alignCenterVertical(page).click();
const alignCenterVertical = AlignmentLocators.alignCenterVertical(page);

if ((await alignCenterVertical.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-center-vertical' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignCenterVertical.click();
    
    await page.waitForTimeout(500);

    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    // Get widgets by UUID
    const widget1 = page.locator(`.grid-stack [data-widget-uuid="${uuids[0]}"]`);
    const widget2 = page.locator(`.grid-stack [data-widget-uuid="${uuids[1]}"]`);
    const widget3 = page.locator(`.grid-stack [data-widget-uuid="${uuids[2]}"]`);

    const refCenterY = await getCenter(widget1, "y");
    const widget2CenterY = await getCenter(widget2, "y");
    const widget3CenterY = await getCenter(widget3, "y");

    expect(Math.abs(widget2CenterY - refCenterY)).toBeLessThanOrEqual(2);
    expect(Math.abs(widget3CenterY - refCenterY)).toBeLessThanOrEqual(2);
  });
  
test("10. User can change CENTER alignment for Button  widgets arranged with touching edges .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
 //await AlignmentLocators.alignCenterVertical(page).click();
const alignCenterVertical = AlignmentLocators.alignCenterVertical(page);

if ((await alignCenterVertical.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-center-vertical' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignCenterVertical.click();

  await page.waitForTimeout(500);

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);

  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const yPositions = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-y",
  );

  expect(new Set(yPositions).size).toBeGreaterThan(1);

  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("11. User can change BOTTOM alignment for Button  widgets  .Expected: all selected widgets should have the same bottom alignment.", async ({
    page,
  }) => {
  
 const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
 
   // await selectThreeWidgets(page, uuids);
  await selectWidgetsOnCanvas(page, uuids);


  
  //await AlignmentLocators.alignBottom(page).click();
const alignBottom = AlignmentLocators.alignBottom(page);

if ((await alignBottom.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-bottom' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignBottom.click();
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const selectedWidgets = page.locator(CardWidgetCssSelector);
    const count = await selectedWidgets.count();

    const bottomPositions: number[] = [];
    for (let i = 0; i < count; i++) {
      const widget = selectedWidgets.nth(i);
      const gsY = await widget.getAttribute("gs-y");
      const gsH = await widget.getAttribute("gs-h");
      if (gsY && gsH) bottomPositions.push(parseInt(gsY) + parseInt(gsH));
    }
    console.log("Widget bottom edge positions:", bottomPositions);
    expectAllValuesEqual(bottomPositions, "bottom edge (gs-y + gs-h)");
  });

test("12. User can change BOTTOM alignment for Button  widgets arranged with touching edges .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
  //await AlignmentLocators.alignBottom(page).click();
const alignBottom = AlignmentLocators.alignBottom(page);

if ((await alignBottom.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-align-bottom' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await alignBottom.click();

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const selectedWidgets = page.locator(CardWidgetCssSelector);
  const count = await selectedWidgets.count();

  const bottomPositions: number[] = [];

  for (let i = 0; i < count; i++) {
    const widget = selectedWidgets.nth(i);
    const gsY = await widget.getAttribute("gs-y");
    const gsH = await widget.getAttribute("gs-h");

    if (gsY && gsH) {
      bottomPositions.push(
        parseInt(gsY) + parseInt(gsH),
      );
    }
  }

  console.log("Widget bottom edge positions:", bottomPositions);

 
  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("13. User can apply SAME SIZE for Button  widgets  .Expected: all selected widgets should have the same size alignment.", async ({ page }) => {
 
const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
 
    await selectWidgetsOnCanvas(page, uuids);

  //await AlignmentLocators.resizeAll(page).click();
const resizeAll = AlignmentLocators.resizeAll(page);

if ((await resizeAll.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-resize-all' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await resizeAll.click();
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const selectedWidgets = page.locator(CardWidgetCssSelector);
    const widths = await getWidgetAttributeValues(selectedWidgets, "gs-w");
    const heights = await getWidgetAttributeValues(selectedWidgets, "gs-h");
    expectAllValuesEqual(widths, "width (gs-w)");
    expectAllValuesEqual(heights, "height (gs-h)");
  });

test("14. User can apply SAME SIZE for Button  widgets arranged with touching edges .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
  //await AlignmentLocators.resizeAll(page).click();
const resizeAll = AlignmentLocators.resizeAll(page);

if ((await resizeAll.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-resize-all' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await resizeAll.click();

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const widths = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-w",
  );

  const heights = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-h",
  );

  expectAllValuesEqual(widths, "width (gs-w)");
  expectAllValuesEqual(heights, "height (gs-h)");

  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("15. User can apply SAME WIDTH  for Button  widgets  .Expected: all selected widgets should have the same width alignment.", async ({ page }) => {

 const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
   
    await selectWidgetsOnCanvas(page, uuids);
  //await AlignmentLocators.resizeWidth(page).click();
const resizeWidth = AlignmentLocators.resizeWidth(page);

if ((await resizeWidth.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-resize-width' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await resizeWidth.click();
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const selectedWidgets = page.locator(CardWidgetCssSelector);
    const widths = await getWidgetAttributeValues(selectedWidgets, "gs-w");
    expectAllValuesEqual(widths, "width (gs-w)");
  });

test("16. User can apply SAME WIDTH for Button  widgets arranged with touching edges .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
  //await AlignmentLocators.resizeWidth(page).click();
const resizeWidth = AlignmentLocators.resizeWidth(page);

if ((await resizeWidth.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-resize-width' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await resizeWidth.click();

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const widths = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-w",
  );

  expectAllValuesEqual(widths, "width (gs-w)");

  await expectWidgetsNotOverlapping(selectedWidgets);
});
  test("17. User can apply SAME HEIGHT  for Button  widgets  .Expected: all selected widgets should have the same height alignment.", async ({ page }) => {

 const { uuids } = await setupWidgets(page, WIDGETS.BUTTON,3);
//   const { uuids } = await setupWidgets(page,WIDGETS.BUTTON,3,cardPositions,);
    await selectWidgetsOnCanvas(page, uuids);

// await AlignmentLocators.resizeHeight(page).click();
const resizeHeight = AlignmentLocators.resizeHeight(page);

if ((await resizeHeight.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-resize-height' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await resizeHeight.click();
    await page.locator("label").filter({ hasText: "Viewer" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const selectedWidgets = page.locator(CardWidgetCssSelector);
    const heights = await getWidgetAttributeValues(selectedWidgets, "gs-h");
    expectAllValuesEqual(heights, "height (gs-h)");
  });


test("18. User can apply SAME HEIGHT for Button  widgets arranged with touching edges .Expected: widgets should not overlap each other.", async ({
  page,
}) => {
  const { uuids } = await setupWidgets(
    page,
    WIDGETS.BUTTON,
    3,
    dragAndDropWidgetWithTouchingEdges,
  );

  await selectWidgetsOnCanvas(page, uuids);
 // await AlignmentLocators.resizeHeight(page).click();
const resizeHeight = AlignmentLocators.resizeHeight(page);

if ((await resizeHeight.count()) === 0) {
  throw new Error(
    "Test ID 'prop-control-resize-height' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
  );
}

await resizeHeight.click();

  await page.locator("label").filter({ hasText: "Viewer" }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const selectedWidgets = page.locator(CardWidgetCssSelector);

  const heights = await getWidgetAttributeValues(
    selectedWidgets,
    "gs-h",
  );

  expectAllValuesEqual(heights, "height (gs-h)");

  await expectWidgetsNotOverlapping(selectedWidgets);
});


});



