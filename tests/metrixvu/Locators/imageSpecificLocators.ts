import { Page } from "@playwright/test";

// =====================================================================
// IMAGE LOCATORS
// =====================================================================

export const ImageLocators = {
  /**
   * Appearance properties
   */
  imageFitLabel: (page: Page) =>
    page.getByTestId("prop-label-image-fit"),

  imageFitInput: (page: Page) =>
    page.getByTestId("prop-input-image-fit"),

  imageBorderRadiusLabel: (page: Page) =>
    page.getByTestId("prop-label-image-border-radius"),

  imageBorderRadiusInput: (page: Page) =>
    page.getByTestId("prop-input-image-border-radius"),

  imageBackgroundColorLabel: (page: Page) =>
    page.getByTestId("prop-label-image-background-color"),

  imageBackgroundColorInput: (page: Page) =>
    page.getByTestId("prop-input-image-background-color"),
};