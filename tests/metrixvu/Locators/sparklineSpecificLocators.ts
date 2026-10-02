import { Page } from "@playwright/test";

// =====================================================================
// SPARKLINE LOCATORS
// =====================================================================

export const SparklineLocators = {
  /**
   * General properties
   */
  typeLabel: (page: Page) =>
    page.getByTestId("prop-label-type"),

  typeInput: (page: Page) =>
    page.getByTestId("prop-input-type"),

  lineWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-line-width"),

  lineWidthInput: (page: Page) =>
    page.getByTestId("prop-input-line-width"),

  gradientLabel: (page: Page) =>
    page.getByTestId("prop-label-gradient-setting-gradient"),

  gradientInput: (page: Page) =>
    page.getByTestId("prop-input-gradient-setting-gradient"),
 
  /**
   * Sparkline type options
   */
  winlossOption: (page: Page) =>
    page.getByText("winloss", { exact: true }),


  /**
   * Display properties
   */
  showMinMaxLabel: (page: Page) =>
    page.getByTestId("prop-label-show-min-max"),

  showMinMaxInput: (page: Page) =>
    page.getByTestId("prop-input-show-min-max"),

  pointSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-point-size"),

  pointSizeInput: (page: Page) =>
    page.getByTestId("prop-input-point-size"),

  pointColorLabel: (page: Page) =>
    page.getByTestId("prop-label-point-color"),

  pointColorInput: (page: Page) =>
    page.getByTestId("prop-input-point-color"),

  pointSymbolLabel: (page: Page) =>
    page.getByTestId("prop-label-point-symbol"),

  pointSymbolInput: (page: Page) =>
    page.getByTestId("prop-input-point-symbol"),

  lineColorLabel: (page: Page) =>
    page.getByTestId("prop-label-line-color"),

  lineColorInput: (page: Page) =>
    page.getByTestId("prop-input-line-color"),

  circleOption: (page: Page) =>
    page.getByText("circle", { exact: true }),


  squareOption: (page: Page) =>
  page.getByText("square", { exact: true }),
};

