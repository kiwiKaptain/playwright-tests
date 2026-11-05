
import { Page } from "@playwright/test";

export const SwitchLocators = {
  // ============================================================
  // GENERAL Properties
  // ============================================================

  switchStyleLabel: (page: Page) =>
    page.getByTestId("prop-label-switch-style"),
  switchStyle: (page: Page) =>
    page.getByTestId("prop-input-switch-style"),
  switchStyleOption: (page: Page, style: string) =>
    page.getByText(style, { exact: true }),

  switchedOnTextLabel: (page: Page) =>
    page.getByTestId("prop-label-switched-on-text"),
  switchedOnText: (page: Page) =>
    page.getByTestId("prop-input-switched-on-text"),

  switchedOffTextLabel: (page: Page) =>
    page.getByTestId("prop-label-switched-off-text"),
  switchedOffText: (page: Page) =>
    page.getByTestId("prop-input-switched-off-text"),

    switchStateValueLabel: (page: Page) =>
    page.getByTestId("prop-label-value"),
  switchStateValueInput: (page: Page) =>
    page.getByTestId("prop-input-value"),

  // ============================================================
  // DISPLAY Properties
  // ============================================================

  disabledLabel: (page: Page) =>
    page.getByTestId("prop-label-disabled"),
  disabled: (page: Page) =>
    page.getByTestId("prop-input-disabled"),

  readOnlyLabel: (page: Page) =>
    page.getByTestId("prop-label-read-only"),
  readOnly: (page: Page) =>
    page.getByTestId("prop-input-read-only"),
};
