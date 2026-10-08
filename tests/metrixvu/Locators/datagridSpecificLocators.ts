import { Page } from "@playwright/test";

// =====================================================================
// DATA GRID LOCATORS
// =====================================================================

export const DataGridLocators = {
  /**
   * Appearance properties
   */

  backgroundColorLabel: (page: Page) =>
    page.getByTestId("prop-label-background-color"),

  backgroundColorInput: (page: Page) =>
    page.getByTestId("prop-input-background-color"),

  showBordersLabel: (page: Page) =>
    page.getByTestId("prop-label-show-borders"),

  showBordersInput: (page: Page) =>
    page.getByTestId("prop-input-show-borders"),

  showRowLinesLabel: (page: Page) =>
    page.getByTestId("prop-label-show-row-lines"),

  showRowLinesInput: (page: Page) =>
    page.getByTestId("prop-input-show-row-lines"),

  showColumnLinesLabel: (page: Page) =>
    page.getByTestId("prop-label-show-column-lines"),

  showColumnLinesInput: (page: Page) =>
    page.getByTestId("prop-input-show-column-lines"),

  rowAlternationEnabledLabel: (page: Page) =>
    page.getByTestId("prop-label-row-alternation-enabled"),

  rowAlternationEnabledInput: (page: Page) =>
    page.getByTestId("prop-input-row-alternation-enabled"),

  columnAutoWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-column-auto-width"),

  columnAutoWidthInput: (page: Page) =>
    page.getByTestId("prop-input-column-auto-width"),

  wordWrapEnabledLabel: (page: Page) =>
    page.getByTestId("prop-label-word-wrap-enabled"),

  wordWrapEnabledInput: (page: Page) =>
    page.getByTestId("prop-input-word-wrap-enabled"),




    /**
   * Paging properties
   */

  pagingEnabledLabel: (page: Page) =>
    page.getByTestId("prop-label-paging-enabled"),

  pagingEnabledInput: (page: Page) =>
    page.getByTestId("prop-input-paging-enabled"),

  pagingPageSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-paging-page-size"),

  pagingPageSizeInput: (page: Page) =>
    page.getByTestId("prop-input-paging-page-size"),

  runtimeFilterRequiredLabel: (page: Page) =>
    page.getByTestId("prop-label-common-runtime-filter-required"),

  runtimeFilterRequiredInput: (page: Page) =>
    page.getByTestId("prop-input-common-runtime-filter-required"),



  /**
 * Sorting properties
 */

sortingVisibilityVisibleLabel: (page: Page) =>
  page.getByTestId("prop-label-sorting-visibility-visible"),

sortingVisibilityVisibleInput: (page: Page) =>
  page.getByTestId("prop-input-sorting-visibility-visible"),

allowColumnReorderingLabel: (page: Page) =>
  page.getByTestId("prop-label-allow-column-reordering"),

allowColumnReorderingInput: (page: Page) =>
  page.getByTestId("prop-input-allow-column-reordering"),

allowColumnResizingLabel: (page: Page) =>
  page.getByTestId("prop-label-allow-column-resizing"),

allowColumnResizingInput: (page: Page) =>
  page.getByTestId("prop-input-allow-column-resizing"),




/**
 * Filter Row properties
 */

filterRowVisibleLabel: (page: Page) =>
  page.getByTestId("prop-label-filter-row-visible"),

filterRowVisibleInput: (page: Page) =>
  page.getByTestId("prop-input-filter-row-visible"),

searchPanelVisibleLabel: (page: Page) =>
  page.getByTestId("prop-label-search-panel-visible"),

searchPanelVisibleInput: (page: Page) =>
  page.getByTestId("prop-input-search-panel-visible"),

searchPanelPlaceholderLabel: (page: Page) =>
  page.getByTestId("prop-label-search-panel-placeholder"),

searchPanelPlaceholderInput: (page: Page) =>
  page.getByTestId("prop-input-search-panel-placeholder"),



/**
 * Column Chooser properties
 */

columnChooserEnabledLabel: (page: Page) =>
  page.getByTestId("prop-label-column-chooser-enabled"),

columnChooserEnabledInput: (page: Page) =>
  page.getByTestId("prop-input-column-chooser-enabled"),

columnChooserModeLabel: (page: Page) =>
  page.getByTestId("prop-label-column-chooser-mode"),

columnChooserModeInput: (page: Page) =>
  page.getByTestId("prop-input-column-chooser-mode"),
};
