import { Page } from "@playwright/test";

// =====================================================================
// BUTTON LOCATORS
// =====================================================================

export const ButtonLocators = {
  /**
   * Common / Runtime Filter properties
   */
  runtimeFilterLabel: (page: Page) =>
    page.getByTestId("prop-label-common-runtime-filter-required"),

  runtimeFilterInput: (page: Page) =>
    page.getByTestId("prop-input-common-runtime-filter-required"),

  /**
   * Layout & Spacing properties
   *
   * These are handled by the common LayoutAndSpacing locators/helper.
   */

   /**
   * Appearance properties
   */
  backgroundColorLabel: (page: Page) =>
    page.getByTestId("prop-label-common-background-color-button"),

  backgroundColorControl: (page: Page) =>
    page.getByTestId("prop-control-common-background-color-button"),

  /**
   * Background Color Popup
   */
  backgroundColorPopup: (page: Page) =>
    page.locator(".dx-popup-content").filter({
      has: page.getByText("Widget Preview"),
    }),

  gradientRow: (page: Page) =>
    ButtonLocators.backgroundColorPopup(page).locator(".gradient-row").first(),

  primaryColorInput: (page: Page) =>
    ButtonLocators.gradientRow(page)
      .locator(".col-color input.dx-colorbox-input")
      .nth(0),

  secondaryColorInput: (page: Page) =>
    ButtonLocators.gradientRow(page)
      .locator(".col-color input.dx-colorbox-input")
      .nth(1),

  gradientAngleInput: (page: Page) =>
    ButtonLocators.gradientRow(page).locator(
      ".angle-input input.dx-texteditor-input",
    ),
     /**
   * General Settings - Border
   */
  borderVisibleLabel: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-border-visible"),

  borderVisibleInput: (page: Page) =>
    page.getByTestId("prop-input-mi-widget-settings-border-visible"),

  borderColorLabel: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-border-color"),

  borderColorInput: (page: Page) =>
    page.getByTestId("prop-input-mi-widget-settings-border-color"),

  borderWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-border-width"),

  borderWidthInput: (page: Page) =>
    page.getByTestId("prop-input-mi-widget-settings-border-width"),

  /**
   * General Settings - Font
   */
  fontSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-font-size"),

  fontSizeInput: (page: Page) =>
    page.getByTestId("prop-input-mi-widget-settings-font-size"),

  textColorLabel: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-text-color"),

  textColorInput: (page: Page) =>
    page.getByTestId("prop-input-mi-widget-settings-text-color"),

  textAlignLabel: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-text-align"),

  textAlignRight: (page: Page) =>
    page.getByTestId("prop-control-mi-widget-settings-text-align-right"),

  /**
   * Display properties
   */
  visibleLabel: (page: Page) =>
    page.getByTestId("prop-label-visible"),

  visibleInput: (page: Page) =>
    page.getByTestId("prop-input-visible"),

  textLabel: (page: Page) =>
    page.getByTestId("prop-label-text"),

  textInput: (page: Page) =>
    page.getByTestId("prop-input-text"),

  iconLabel: (page: Page) =>
    page.getByTestId("prop-label-icon"),

  iconInput: (page: Page) =>
    page.getByTestId("prop-input-icon"),

  hintLabel: (page: Page) =>
    page.getByTestId("prop-label-hint"),

  hintInput: (page: Page) =>
    page.getByTestId("prop-input-hint"),

 
  
};
