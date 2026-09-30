import { Page } from "@playwright/test";
// =====================================================================
// CARD LOCATORS
// =====================================================================

export const CardLocators = {
  /**
   * Title text properties
   */
  titleTextLabel: (page: Page) => page.getByTestId("prop-label-title-text"),
  titleTextInput: (page: Page) => page.getByTestId("prop-input-title-text"),

  /**
   * Title description properties
   */
  titleDescriptionLabel: (page: Page) =>
    page.getByTestId("prop-label-title-description-text"),
  titleDescriptionInput: (page: Page) =>
    page.getByTestId("prop-input-title-description-text"),
  titleDescriptionFontSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-title-description-font-size"),
  titleDescriptionFontSizeInput: (page: Page) =>
    page.getByTestId("prop-input-title-description-font-size"),

  /**
   * Title unit properties
   */
  titleUnitTextLabel: (page: Page) =>
    page.getByTestId("prop-label-title-unit-text"),
  titleUnitTextInput: (page: Page) =>
    page.getByTestId("prop-input-title-unit-text"),

  /**
   * Value properties
   */
  valueFontSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-value-font-size"),
  valueFontSizeInput: (page: Page) =>
    page.getByTestId("prop-input-value-font-size"),

  /**
   * Icon settings properties
   */
  iconShowIconLabel: (page: Page) =>
    page.getByTestId("prop-label-icon-show-icon"),
  iconShowIconInput: (page: Page) =>
    page.getByTestId("prop-input-icon-show-icon"),

  iconNameLabel: (page: Page) => page.getByTestId("prop-label-icon-name"),
  iconNameSelect: (page: Page) =>
    page.getByTestId("prop-control-icon-name").getByRole("button", {
      name: "Select",
    }),

  iconSizeLabel: (page: Page) => page.getByTestId("prop-label-icon-size"),
  iconSizeInput: (page: Page) => page.getByTestId("prop-input-icon-size"),

  iconBackgroundColorLabel: (page: Page) =>
    page.getByTestId("prop-label-icon-bg-color"),
  iconBackgroundColorInput: (page: Page) =>
    page.getByTestId("prop-input-icon-bg-color"),


    /**
   * Trend settings properties
   */
  trendShowLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-show"),
  trendShowInput: (page: Page) =>
    page.getByTestId("prop-input-trend-show"),

  trendSourceLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-source"),
  trendSourceInput: (page: Page) =>
    page.getByTestId("prop-input-trend-source"),
  trendSourceSelect: (page: Page) =>
    page.getByTestId("prop-control-trend-source").getByRole("button", {
      name: "Select",
    }),

  trendValueLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-value"),
  trendValueInput: (page: Page) =>
    page.getByTestId("prop-input-trend-value"),

  trendDirectionLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-direction"),
  trendDirectionInput: (page: Page) =>
    page.getByTestId("prop-input-trend-direction"),

  trendBadgeStyleLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-badge-style"),
  trendBadgeStyleInput: (page: Page) =>
    page.getByTestId("prop-input-trend-badge-style"),

  trendColorLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-color"),
  trendColorInput: (page: Page) =>
    page.getByTestId("prop-input-trend-color"),

  trendBackgroundColorLabel: (page: Page) =>
    page.getByTestId("prop-label-trend-bg-color"),
  trendBackgroundColorInput: (page: Page) =>
    page.getByTestId("prop-input-trend-bg-color"),



    /**
   * Card layout properties
   */
  cardLayoutOption6: (page: Page) =>
    page.getByTestId("card-design-option-6"),




    /**
   * Appearance properties
   */
 

  borderWidthInput: (page: Page) =>
    page.getByTestId("prop-input-border-width"),

  borderRadiusLabel: (page: Page) =>
    page.getByTestId("prop-label-border-radius"),
  borderRadiusInput: (page: Page) =>
    page.getByTestId("prop-input-border-radius"),

  borderStyleLabel: (page: Page) =>
    page.getByTestId("prop-label-border-style"),
  borderStyleInput: (page: Page) =>
    page.getByTestId("prop-input-border-style"),

  borderColorLabel: (page: Page) =>
    page.getByTestId("prop-label-border-color"),
  borderColorInput: (page: Page) =>
    page.getByTestId("prop-input-border-color"),

  titleColorLabel: (page: Page) =>
    page.getByTestId("prop-label-title-color"),
  titleColorInput: (page: Page) =>
    page.getByTestId("prop-input-title-color"),

  valueColorLabel: (page: Page) =>
    page.getByTestId("prop-label-value-color"),
  valueColorInput: (page: Page) =>
    page.getByTestId("prop-input-value-color"),

  titleDescriptionColorLabel: (page: Page) =>
    page.getByTestId("prop-label-title-description-color"),
  titleDescriptionColorInput: (page: Page) =>
    page.getByTestId("prop-input-title-description-color"),

  titleUnitColorLabel: (page: Page) =>
    page.getByTestId("prop-label-title-unit-color"),
  titleUnitColorInput: (page: Page) =>
    page.getByTestId("prop-input-title-unit-color"),



    /**
   * Background properties
   */
  backgroundDegreeLabel: (page: Page) =>
    page.getByTestId("prop-label-background-degree"),
  backgroundDegreeInput: (page: Page) =>
    page.getByTestId("prop-input-background-degree"),

  backgroundPrimaryColorLabel: (page: Page) =>
    page.getByTestId("prop-label-background-primary-color"),
  backgroundPrimaryColorInput: (page: Page) =>
    page.getByTestId("prop-input-background-primary-color"),
  backgroundPrimaryColorStopLabel: (page: Page) =>
    page.getByTestId("prop-label-background-primary-color-stop"),

  backgroundSecondaryColorLabel: (page: Page) =>
    page.getByTestId("prop-label-background-secondary-color"),
  backgroundSecondaryColorInput: (page: Page) =>
    page.getByTestId("prop-input-background-secondary-color"),
  backgroundSecondaryColorStopLabel: (page: Page) =>
    page.getByTestId("prop-label-background-secondary-color-stop"),
};
