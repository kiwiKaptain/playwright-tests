import { test, expect, Page, Locator } from "@playwright/test";
import { TEST_DATA } from "../../testData";
import {
  setActionsProperties,
  setActionsToNone,
  setLayoutAndSpacing,
  setRunTimeFilter,
} from "../../CommonHelperFunctions/commonPropertiesHelpers";
import {
  login,
  ensureDashboardExists,
  openEditorAndClearCanvas,
  goToHomeAndVerify,
} from "../../CommonHelperFunctions/commonDashboardSetupHelpers";
import {
  getDroppedWidgetByUuid,
  resizeWidget,
} from "../../CommonHelperFunctions/commonWidgetSetupHelpers";
import { dragAndDropWidget } from "../../CommonHelperFunctions/commonDragDropHelpers";
import { CardLocators } from "../../Locators/cardSpecificLocators";

const dashboardName =
  TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting;
const WIDGETS = { CARD: "mi-card" } as const;
test.describe("PROPERTIES - CARD Widget", () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    const dashboardCard = await ensureDashboardExists(page, dashboardName);
    await openEditorAndClearCanvas(page, dashboardCard);

    // Drop a single Card widget on the canvas
    await dragAndDropWidget(page, WIDGETS.CARD);

    const droppedCardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);
    try {
      await droppedCardWidget.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Dropped Card widget is not visible on the canvas.");
      console.error(error);
      throw error;
    }

    // Resize widget
    const resizeHandle = droppedCardWidget.locator(".ui-resizable-se");
    try {
      await resizeHandle.waitFor({ state: "visible", timeout: 10000 });
    } catch (error) {
      console.error("Resize handle is not visible for the Card widget.");
      console.error(error);
      throw error;
    }
    await resizeWidget(page, droppedCardWidget, resizeHandle, 150, 150);
  });

  test.afterEach(async ({ page }) => {
    await goToHomeAndVerify(page, dashboardName);
  });

  test("1.User can change LAYOUT & SPACING properties for Card widget", async ({
    page,
  }) => {
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);

    // Update Layout & Spacing

    await setLayoutAndSpacing(page, "10", "15", "20", "25");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const cardContent = cardWidget.locator(".grid-stack-item-content");
    await expect(cardContent).toHaveCSS("padding-top", "10px");
    await expect(cardContent).toHaveCSS("padding-right", "15px");
    await expect(cardContent).toHaveCSS("padding-bottom", "20px");
    await expect(cardContent).toHaveCSS("padding-left", "25px");
  });

  test("2.User can change GENERAL SETTINGS properties for Card widget", async ({
    page,
  }) => {
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);
    // Update GENERAL SETTINGS

    await CardLocators.titleTextLabel(page).click();
    await CardLocators.titleTextInput(page).click();
    await CardLocators.titleTextInput(page).press("ControlOrMeta+a");
    await CardLocators.titleTextInput(page).fill("CardTitleCheck");

    await CardLocators.titleDescriptionLabel(page).click();
    await CardLocators.titleDescriptionInput(page).click();
    await CardLocators.titleDescriptionInput(page).fill("To");
    await CardLocators.titleDescriptionInput(page).press("ControlOrMeta+a");
    await CardLocators.titleDescriptionInput(page).fill("Tomorrow");

    await CardLocators.titleDescriptionFontSizeLabel(page).click();
    await CardLocators.titleDescriptionFontSizeInput(page).click();
    await CardLocators.titleDescriptionFontSizeInput(page).press(
      "ControlOrMeta+a",
    );
    await CardLocators.titleDescriptionFontSizeInput(page).fill("24");

    await CardLocators.titleUnitTextLabel(page).click();
    await CardLocators.titleUnitTextInput(page).click();
    await CardLocators.titleUnitTextInput(page).fill("C");

    await CardLocators.valueFontSizeLabel(page).click();
    await CardLocators.valueFontSizeInput(page).click();
    await CardLocators.valueFontSizeInput(page).press("ControlOrMeta+a");
    await CardLocators.valueFontSizeInput(page).fill("30");
    await setRunTimeFilter(page);
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const cardRoot = (await getDroppedWidgetByUuid(page, WIDGETS.CARD)).locator(
      "#mi-card",
    );

    // Title
    const title = cardRoot.locator("span.font-semibold.text-lg");
    // Description
    const description = cardRoot.locator("div.text-xs");
    // Value
    const value = cardRoot.locator("div.font-semibold");
    // Unit
    const unit = cardRoot.locator("div.text-sm");

    // ---------- Verify Card Title, Description, Unit ----------
    await expect(title).toHaveText("CardTitleCheck");
    await expect(description).toHaveText("Tomorrow");
    await expect(unit).toHaveText("C");

    // ---------- Verify CSS ----------

    // Value font size (changed to 30)
    await expect(value).toHaveCSS("font-size", "30px");

    // Description font size (changed to 24)
    await expect(description).toHaveCSS("font-size", "24px");
    // Verify runtime filter is visible
    const runtimeFilter = cardRoot.locator('[title="Filter"]');

    await expect(runtimeFilter).toBeVisible();
  });
  test("3.User can change ICON SETTINGS properties for Card widget", async ({
    page,
  }) => {
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);

    // Update ICON SETTINGS
    await CardLocators.iconShowIconLabel(page).click();
    await CardLocators.iconShowIconInput(page).click();
    await CardLocators.iconShowIconInput(page).click();

    await CardLocators.iconNameLabel(page).click();
    await CardLocators.iconNameSelect(page).click();
    await page.getByText("Cart").click();

    await CardLocators.iconSizeLabel(page).click();
    await CardLocators.iconSizeInput(page).click();
    await CardLocators.iconSizeInput(page).press("ControlOrMeta+a");
    await CardLocators.iconSizeInput(page).fill("36");
    await CardLocators.iconSizeInput(page).press("Enter");

    await CardLocators.iconBackgroundColorLabel(page).click();
    await CardLocators.iconBackgroundColorInput(page).click();
    await CardLocators.iconBackgroundColorInput(page).press("ControlOrMeta+a");
    await CardLocators.iconBackgroundColorInput(page).fill(
      "rgba(76, 130, 237, 1)",
    );
    await CardLocators.iconBackgroundColorInput(page).press("Enter");
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const cardRoot = (await getDroppedWidgetByUuid(page, WIDGETS.CARD)).locator(
      "#mi-card",
    );

    // Verify icon
    const icon = cardRoot.locator('img[src*="cart.svg"]');

    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("src", /cart\.svg$/);

    // Verify icon size
    await expect(icon).toHaveCSS("width", "36px");
    await expect(icon).toHaveCSS("height", "36px");

    // Verify icon background color
    const iconContainer = icon.locator("..");

    await expect(iconContainer).toHaveCSS(
      "background-color",
      "rgb(76, 130, 237)",
    );

    // Verify circular icon container
    await expect(iconContainer).toHaveCSS("border-radius", "9999px");
  });
  test("4. User can change TREND AND PERCENTAGE properties for Card widget", async ({
    page,
  }) => {
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);

    // Update TREND SETTINGS
    await CardLocators.trendShowLabel(page).click();
    await CardLocators.trendShowInput(page).click();

    await CardLocators.trendSourceLabel(page).click();
    await CardLocators.trendSourceInput(page).click();
    await CardLocators.trendSourceSelect(page).click();
    await CardLocators.trendSourceSelect(page).click();
    await page.getByText("Manual Custom Value").click();

    await CardLocators.trendValueLabel(page).click();
    await CardLocators.trendValueInput(page).click();
    await CardLocators.trendValueInput(page).press("ControlOrMeta+a");
    await CardLocators.trendValueInput(page).fill("24.5%");

    await CardLocators.trendDirectionLabel(page).click();
    await CardLocators.trendDirectionInput(page).click();
    await page.getByText("Up (▲)").click();

    await CardLocators.trendBadgeStyleLabel(page).click();
    await CardLocators.trendBadgeStyleInput(page).click();
    await page.getByText("Pill Badge").click();

    await CardLocators.trendColorLabel(page).click();
    await CardLocators.trendColorInput(page).click();
    await CardLocators.trendColorInput(page).press("ControlOrMeta+a");
    await CardLocators.trendColorInput(page).fill("rgba(55, 37, 219, 1)");
    await CardLocators.trendColorInput(page).press("Enter");

    await CardLocators.trendBackgroundColorLabel(page).click();
    await CardLocators.trendBackgroundColorInput(page).click();
    await CardLocators.trendBackgroundColorInput(page).press("ControlOrMeta+a");
    await CardLocators.trendBackgroundColorInput(page).fill(
      "rgba(240, 223, 151, 1)",
    );
    await CardLocators.trendBackgroundColorInput(page).press("Enter");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const cardRoot = (await getDroppedWidgetByUuid(page, WIDGETS.CARD)).locator(
      "#mi-card",
    );

    // Verify icon
    const icon = cardRoot.locator('img[src*="cart.svg"]');
    // Verify trend badge
    const trendBadge = cardRoot.locator(
      "div.inline-flex.items-center.rounded-full",
    );

    await expect(trendBadge).toBeVisible();

    // Verify percentage value
    await expect(trendBadge.locator("span").first()).toHaveText("24.5%");

    // Verify trend direction
    await expect(trendBadge.locator("span").nth(1)).toHaveText("▲");

    // Verify text color
    await expect(trendBadge).toHaveCSS("color", "rgb(55, 37, 219)");

    // Verify background color
    await expect(trendBadge).toHaveCSS(
      "background-color",
      "rgb(240, 223, 151)",
    );

    // Verify Pill Badge style
    await expect(trendBadge).toHaveCSS("border-radius", "9999px");
  });
  test("5.User can change CARD LAYOUT properties for Card widget", async ({
    page,
  }) => {
    // Update CARD LAYOUT
    await CardLocators.cardLayoutOption6(page).click();
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);
    const cardRoot = cardWidget.locator("#mi-card");

    // This is the actual card layout container inside #mi-card
    const cardLayout = cardRoot
      .locator("> div.flex.flex-col.justify-between.rounded-md.p-4.h-full")
      .first();

    // -------- Verify Layout Structure --------

    // 1. Verify the main container has correct flex layout
    await expect(cardLayout).toHaveClass(/flex-col/);
    await expect(cardLayout).toHaveClass(/justify-between/);
    await expect(cardLayout).toHaveClass(/rounded-md/);
    await expect(cardLayout).toHaveClass(/p-4/);
    await expect(cardLayout).toHaveClass(/h-full/);

    // 2. Verify first row (header with title + icon)
    const headerRow = cardLayout
      .locator("> div.flex.items-start.justify-between.w-full")
      .first();
    await expect(headerRow).toBeVisible();

    // 2a. Verify title section (left side)
    const titleSection = headerRow.locator("> div.flex.flex-col").first();
    await expect(titleSection).toBeVisible();

    // 3. Verify middle section (value display)
    const valueSection = cardLayout
      .locator("> div.flex.items-baseline.justify-between.w-full.my-auto")
      .first();
    await expect(valueSection).toBeVisible();

    // Value
    const value = valueSection.locator(
      "span.font-bold.text-3xl.tracking-tight",
    );
    await expect(value).toHaveText("87.6");

    // 4. Verify progress bar section (bottom)
    const progressBarContainer = cardLayout
      .locator("> div.w-full.bg-gray-200.rounded-full.h-2.overflow-hidden.mt-1")
      .first();
    await expect(progressBarContainer).toBeVisible();

    // Progress bar fill
    const progressFill = progressBarContainer.locator(
      "> div.h-full.rounded-full.transition-all.duration-500",
    );
    await expect(progressFill).toBeVisible();
    await expect(progressFill).toHaveCSS(
      "background-color",
      "rgb(59, 130, 246)",
    );
  });

  test("6. User can change APPEARANCE properties for Card widget", async ({
    page,
  }) => {
    // Update APPEARANCE

    await CardLocators.iconBackgroundColorLabel(page).click();
    await CardLocators.iconBackgroundColorInput(page).click();
    await CardLocators.iconBackgroundColorInput(page).press("ControlOrMeta+a");
    await CardLocators.iconBackgroundColorInput(page).fill(
      "rgba(57,117,237,1)",
    );

    await CardLocators.borderWidthInput(page).click();
    await CardLocators.borderWidthInput(page).press("ControlOrMeta+a");
    await CardLocators.borderWidthInput(page).fill("6");

    await CardLocators.borderRadiusLabel(page).click();
    await CardLocators.borderRadiusInput(page).click();
    await CardLocators.borderRadiusInput(page).press("ControlOrMeta+a");
    await CardLocators.borderRadiusInput(page).fill("12");

    await CardLocators.borderStyleLabel(page).click();
    await CardLocators.borderStyleInput(page).click();
    await page.getByText("Dashed").click();

    await CardLocators.borderColorLabel(page).click();
    await CardLocators.borderColorInput(page).click();
    await CardLocators.borderColorInput(page).press("ControlOrMeta+a");
    await CardLocators.borderColorInput(page).fill("rgb(237,237,31)");
    await CardLocators.borderColorInput(page).press("Enter");

    await CardLocators.titleColorLabel(page).click();
    await CardLocators.titleColorInput(page).click();
    await CardLocators.titleColorInput(page).press("ControlOrMeta+a");
    await CardLocators.titleColorInput(page).fill("rgb(237, 113, 31)");
    await CardLocators.titleColorInput(page).press("Enter");

    await CardLocators.valueColorLabel(page).click();
    await CardLocators.valueColorInput(page).click();
    await CardLocators.valueColorInput(page).press("ControlOrMeta+a");
    await CardLocators.valueColorInput(page).fill("rgb(183,34,242)");
    await CardLocators.valueColorInput(page).press("Enter");

    await CardLocators.titleDescriptionColorLabel(page).click();
    await CardLocators.titleDescriptionColorInput(page).click();
    await CardLocators.titleDescriptionColorInput(page).press(
      "ControlOrMeta+a",
    );
    await CardLocators.titleDescriptionColorInput(page).fill("rgb(19,240,19)");
    await CardLocators.titleDescriptionColorInput(page).press("Enter");

    await CardLocators.titleUnitColorLabel(page).click();
    await CardLocators.titleUnitColorInput(page).click();
    await CardLocators.titleUnitColorInput(page).press("ControlOrMeta+a");
    await CardLocators.titleUnitColorInput(page).fill("rgb(32,232,212)");
    await CardLocators.titleUnitColorInput(page).press("Enter");

    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Fetch the parent container widget using the dynamic helper function
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);

    const cardMainContainer = cardWidget
      .locator("div.flex.items-center.rounded-md")
      .first();

    // Verify Border Width is applied (6px)
    await expect(cardMainContainer).toHaveCSS("border-width", "6px");

    // Verify Border Radius is applied (12px)
    await expect(cardMainContainer).toHaveCSS("border-radius", "12px");

    // Verify Border Style is applied (dashed)
    await expect(cardMainContainer).toHaveCSS("border-style", "dashed");

    // Verify Border Color is applied
    await expect(cardMainContainer).toHaveCSS(
      "border-color",
      "rgb(237, 237, 31)",
    );

    // Verify Title Text Color
    const titleText = cardMainContainer.locator("span.font-semibold.text-lg");
    await expect(titleText).toHaveCSS("color", "rgb(237, 113, 31)");

    // Verify Description Text Color
    const descriptionText = cardMainContainer.locator("div.text-xs");
    await expect(descriptionText).toHaveCSS("color", "rgb(19, 240, 19)");

    // Verify Value Text Color ("87.6")
    const valueText = cardMainContainer.locator("div.font-semibold");
    await expect(valueText).toHaveCSS("color", "rgb(183, 34, 242)");

    // Verify Unit Text Color ("%")
    const unitText = cardMainContainer.locator("div.text-sm.ml-1");
    await expect(unitText).toHaveCSS("color", "rgb(32, 232, 212)");
  });

  test("7. User can change LINEAR GRADIENT properties for Card widget", async ({
    page,
  }) => {
    // Update LINEAR GRADIENT

    await CardLocators.backgroundDegreeLabel(page).click();
    await CardLocators.backgroundDegreeInput(page).click();
    await page.getByText("90").click();

    await CardLocators.backgroundPrimaryColorLabel(page).click();
    await CardLocators.backgroundPrimaryColorInput(page).click();
    await CardLocators.backgroundPrimaryColorInput(page).press(
      "ControlOrMeta+a",
    );
    await CardLocators.backgroundPrimaryColorInput(page).fill("rgb(70,39,245)");
    await CardLocators.backgroundPrimaryColorInput(page).press("Enter");

    await CardLocators.backgroundPrimaryColorStopLabel(page).click();
    await page.locator(".dx-trackbar-container").first().click();

    await CardLocators.backgroundSecondaryColorLabel(page).click();
    await CardLocators.backgroundSecondaryColorInput(page).click();
    await CardLocators.backgroundSecondaryColorInput(page).press(
      "ControlOrMeta+a",
    );
    await CardLocators.backgroundSecondaryColorInput(page).fill(
      "rgb(253, 242, 89)",
    );
    await CardLocators.backgroundSecondaryColorInput(page).press("Enter");

    await CardLocators.backgroundSecondaryColorStopLabel(page).click();
    // Switch to Viewer
    await page.locator("label").filter({ hasText: "Viewer" }).click();

    // Save
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Fetch the parent container widget using the dynamic helper function
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);

    // Locate the outermost styled card container
    const cardContainer = cardWidget
      .locator("div.flex.items-center.rounded-md.p-4.h-full")
      .first();

    // Verify Linear Gradient CSS
    await expect(cardContainer).toHaveCSS(
      "background-image",
      "linear-gradient(90deg, rgb(70, 39, 245) 49%, rgb(253, 242, 89) 100%)",
    );
  });

  test("8. User can change Link Dashboard via ACTIONS properties for Card widget", async ({
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
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
    // Fetch the parent container widget using the dynamic helper function
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);
    await cardWidget.click();

    // Verify the linked dashboard is opened
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(TEST_DATA.dashboards.dashboardNameForActionPropertyTesting);
  });

  test("9. User can set the action type to NONE for Card widget", async ({
    page,
  }) => {
    // Update ACTIONS to None
    await setActionsToNone(page);

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
    const cardWidget = await getDroppedWidgetByUuid(page, WIDGETS.CARD);
    await cardWidget.click();

    // Verify the None Action
    await expect(
      page.locator('//p[contains(@class,"truncate")]'),
    ).toContainText(
      TEST_DATA.dashboards.dashboardNameForWidgetPropertiesTesting,
    );
  });
});
