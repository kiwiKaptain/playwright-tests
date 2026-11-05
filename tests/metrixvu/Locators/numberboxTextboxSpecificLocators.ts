import { Page } from "@playwright/test";

export const NumberBoxTextboxLocators = {
  valueLabel: (page: Page) => page.getByTestId("prop-label-value"),
  value: (page: Page) => page.getByTestId("prop-input-value"),

  placeholderLabel: (page: Page) =>
    page.getByTestId("prop-label-placeholder"),
  placeholder: (page: Page) =>
    page.getByTestId("prop-input-placeholder"),

  borderVisibleLabel: (page: Page) =>
    page.getByTestId("prop-label-border-visible"),
  borderVisible: (page: Page) =>
    page.getByTestId("prop-input-border-visible"),

  borderColorLabel: (page: Page) =>
    page
      .locator("mi-runtime-number-box-general-settings")
      .getByTestId("prop-label-border-color"),
  borderColor: (page: Page) =>
    page
      .locator("mi-runtime-number-box-general-settings")
      .getByTestId("prop-input-border-color"),

  borderWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-border-width"),
  borderWidth: (page: Page) =>
    page.getByTestId("prop-input-border-width"),

  fontSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-font-size"),
  fontSize: (page: Page) =>
    page.getByTestId("prop-input-font-size"),

  textColorLabel: (page: Page) =>
    page.getByTestId("prop-label-text-color"),
  textColor: (page: Page) =>
    page.getByTestId("prop-input-text-color"),

  textAlignLabel: (page: Page) =>
    page.getByTestId("prop-label-text-align"),
  textAlign: (page: Page, alignment: string) =>
    page.getByTestId(`prop-control-text-align-${alignment}`),

  showSpinButtonsLabel: (page: Page) =>
    page.getByTestId("prop-label-show-spin-buttons"),
  showSpinButtons: (page: Page) =>
    page.getByTestId("prop-input-show-spin-buttons"),


  // ============================================================
  // DISPLAY Properties
  // ============================================================

  readOnlyLabel: (page: Page) =>
    page.getByTestId("prop-label-read-only"),
  readOnly: (page: Page) =>
    page.getByTestId("prop-input-read-only"),

  labelLabel: (page: Page) =>
    page.getByTestId("prop-label-label"),
  label: (page: Page) =>
    page.getByTestId("prop-input-label"),

  labelModeLabel: (page: Page) =>
    page.getByTestId("prop-label-label-mode"),
  labelMode: (page: Page) =>
    page.getByTestId("prop-input-label-mode"),
  labelModeControl: (page: Page) =>
    page.getByTestId("prop-control-label-mode"),
  labelModeOption: (page: Page, mode: string) =>
    page.getByText(mode, { exact: true }),

  stylingModeLabel: (page: Page) =>
    page.getByTestId("prop-label-styling-mode"),
  stylingMode: (page: Page) =>
    page.getByTestId("prop-input-styling-mode"),
  stylingModeControl: (page: Page) =>
    page.getByTestId("prop-control-styling-mode"),
  stylingModeOption: (page: Page, mode: string) =>
    page.getByText(mode, { exact: true }),

  hintLabel: (page: Page) =>
    page.getByTestId("prop-label-hint"),
  hint: (page: Page) =>
    page.getByTestId("prop-input-hint"),

  formatLabel: (page: Page) =>
    page.getByTestId("prop-label-format"),
  format: (page: Page) =>
    page.getByTestId("prop-input-format"),
  formatControl: (page: Page) =>
    page.getByTestId("prop-control-format"),
  formatOption: (page: Page, format: string) =>
    page.getByText(format, { exact: true }),

};

export const TextboxLocators = {
  // ============================================================
  // GENERAL Properties
  // ============================================================

  valueLabel: (page: Page) =>
    page.getByTestId("prop-label-value"),
  value: (page: Page) =>
    page.getByTestId("prop-input-value"),

  placeholderLabel: (page: Page) =>
    page.getByTestId("prop-label-placeholder"),
  placeholderInput: (page: Page) =>
    page.getByTestId("prop-input-placeholder"),

  maskLabel: (page: Page) =>
    page.getByTestId("prop-label-mask"),
  mask: (page: Page) =>
    page.getByTestId("prop-input-mask"),

  maskCharLabel: (page: Page) =>
    page.getByTestId("prop-label-mask-char"),
  maskChar: (page: Page) =>
    page.getByTestId("prop-input-mask-char"),

  borderVisibleLabel: (page: Page) =>
    page.getByTestId("prop-label-border-visible"),
  borderVisible: (page: Page) =>
    page.getByTestId("prop-input-border-visible"),

  borderColorLabel: (page: Page) =>
    page
      .locator("mi-runtime-general-settings")
      .getByTestId("prop-label-border-color"),
  borderColor: (page: Page) =>
    page
      .locator("mi-runtime-general-settings")
      .getByTestId("prop-input-border-color"),

  borderWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-border-width"),
  borderWidth: (page: Page) =>
    page.getByTestId("prop-input-border-width"),

  fontSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-font-size"),
  fontSize: (page: Page) =>
    page.getByTestId("prop-input-font-size"),

  textColorLabel: (page: Page) =>
    page
      .locator("mi-runtime-general-settings")
      .getByTestId("prop-label-text-color"),
  textColor: (page: Page) =>
    page
      .locator("mi-runtime-general-settings")
      .getByTestId("prop-input-text-color"),

  textAlignLabel: (page: Page) =>
    page.getByTestId("prop-label-text-align"),
  textAlign: (page: Page, alignment: string) =>
    page.getByTestId(`prop-control-text-align-${alignment}`),

  // ============================================================
  // DISPLAY Properties
  // ============================================================

  readOnlyLabel: (page: Page) =>
    page.getByTestId("prop-label-read-only"),
  readOnly: (page: Page) =>
    page.getByTestId("prop-input-read-only"),

  labelLabel: (page: Page) =>
    page.getByTestId("prop-label-label"),
  label: (page: Page) =>
    page.getByTestId("prop-input-label"),

  labelModeLabel: (page: Page) =>
    page.getByTestId("prop-label-label-mode"),
  labelMode: (page: Page) =>
    page.getByTestId("prop-input-label-mode"),
  labelModeControl: (page: Page) =>
    page.getByTestId("prop-control-label-mode"),
  labelModeOption: (page: Page, mode: string) =>
    page.getByText(mode, { exact: true }),

  stylingModeLabel: (page: Page) =>
    page.getByTestId("prop-label-styling-mode"),
  stylingMode: (page: Page) =>
    page.getByTestId("prop-input-styling-mode"),
  stylingModeControl: (page: Page) =>
    page.getByTestId("prop-control-styling-mode"),
  stylingModeOption: (page: Page, mode: string) =>
    page.getByText(mode, { exact: true }),

  hintLabel: (page: Page) =>
    page.getByTestId("prop-label-hint"),
  hint: (page: Page) =>
    page.getByTestId("prop-input-hint"),


    modeLabel: (page: Page) =>
    page.getByTestId("prop-label-mode"),
  modeInput: (page: Page) =>
    page.getByTestId("prop-input-mode"),
};