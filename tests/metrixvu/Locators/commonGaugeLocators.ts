import { Page } from "@playwright/test";

export const playwrightLocators = {
  LayoutAndSpacing: {
    marginTop: (page: Page) => page.getByTestId("prop-input-margin-top"),
    marginRight: (page: Page) => page.getByTestId("prop-input-margin-right"),
    marginBottom: (page: Page) => page.getByTestId("prop-input-margin-bottom"),
    marginLeft: (page: Page) => page.getByTestId("prop-input-margin-left"),
  },
  Appearance: {
    backgroundColor: (page: Page) =>
      page.getByTestId("prop-input-common-background-color"),
  },

  Title: {
    text: (page: Page) => page.getByTestId("prop-input-title-text"),
    fontColor: (page: Page) => page.getByTestId("prop-input-title-font-color"),
    fontSize: (page: Page) => page.getByTestId("prop-input-title-font-size"),
    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-title-font-weight"),
    verticalAlignment: (page: Page, alignment: string) =>
      page.getByTestId(`prop-control-title-vertical-alignment-${alignment}`),
    horizontalAlignment: (page: Page, alignment: string) =>
      page.getByTestId(`prop-control-title-horizontal-alignment-${alignment}`),
    fontWeightOption: (page: Page, weight: string) =>
      page.getByLabel("Items").getByText(weight),
  },
  Subtitle: {
    text: (page: Page) => page.getByTestId("prop-input-title-subtitle-text"),

    fontColor: (page: Page) =>
      page.getByTestId("prop-input-title-subtitle-font-color"),

    fontSize: (page: Page) =>
      page.getByTestId("prop-input-title-subtitle-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-title-subtitle-font-weight"),

    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),
  },
  Legend: {
    visible: (page: Page) => page.getByTestId("prop-input-legend-visible"),

    borderVisible: (page: Page) =>
      page.getByTestId("prop-input-legend-border-visible"),

    borderColor: (page: Page) =>
      page.getByTestId("prop-input-legend-border-color"),

    horizontalAlignment: (page: Page, alignment: string) =>
      page.getByTestId(`prop-control-legend-horizontal-alignment-${alignment}`),

    verticalAlignment: (page: Page, alignment: string) =>
      page.getByTestId(`prop-control-legend-vertical-alignment-${alignment}`),

    position: (page: Page) => page.getByTestId("prop-input-legend-position"),

    positionOption: (page: Page, position: string) =>
      page.getByText(position, { exact: true }),

    itemTextPosition: (page: Page) =>
      page.getByTestId("prop-input-legend-item-text-position"),

    itemTextPositionOption: (page: Page, position: string) =>
      page.getByText(position, { exact: true }),

    fontColor: (page: Page) => page.getByTestId("prop-input-legend-font-color"),

    fontSize: (page: Page) => page.getByTestId("prop-input-legend-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-legend-font-weight"),

    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),

    backgroundColor: (page: Page) =>
      page.getByTestId("prop-input-legend-background-color"),

    orientation: (page: Page) =>
      page.getByTestId("prop-input-legend-orientation"),

    orientationWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),
  },
  Tooltip: {
    enabled: (page: Page) => page.getByTestId("prop-input-tooltip-enabled"),

    fontColor: (page: Page) =>
      page.getByTestId("prop-input-tooltip-font-color"),

    fontSize: (page: Page) => page.getByTestId("prop-input-tooltip-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-tooltip-font-weight"),

    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),

    color: (page: Page) => page.getByTestId("prop-input-tooltip-color"),
  },
  XAxisTitle: {
    text: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-title-text"),

    fontColor: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-title-font-color"),

    fontSize: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-title-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-title-font-weight"),
    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),
    // fontWeightOption: (page: Page, weight: string) =>
    //   page.getByText(weight, { exact: true }),
  },
  YAxisTitle: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-visible"),

    text: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-title-text"),

    fontColor: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-title-font-color"),

    fontSize: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-title-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-title-font-weight"),

    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),
  },
  XAxisLabel: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-label-visible"),

    fontColor: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-label-font-color"),

    fontSize: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-label-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-label-font-weight"),

    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),
  },

  YAxisLabel: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-label-visible"),

    fontColor: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-label-font-color"),

    fontSize: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-label-font-size"),

    fontWeight: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-label-font-weight"),

    fontWeightOption: (page: Page, weight: string) =>
      page.getByRole("listbox").getByText(weight),
  },

  XAxisTick: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-tick-visible"),

    color: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-tick-color"),
  },

  YAxisTick: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-tick-visible"),

    color: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-tick-color"),
  },
  XAxisGrid: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-grid-visible"),

    color: (page: Page) =>
      page.getByTestId("prop-input-argument-axis-grid-color"),
  },

  YAxisGrid: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-grid-visible"),

    color: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-grid-color"),
  },

  MinorGrid: {
    visible: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-minor-grid-visible"),

    color: (page: Page) =>
      page.getByTestId("prop-input-value-axis-0-minor-grid-color"),
  },
};
// =====================================================================
// ALIGNMENT LOCATORS
// =====================================================================

export const AlignmentLocators = {
  /**
   * Alignment control buttons
   */
  alignLeft: (page: Page) => page.getByTestId("prop-control-align-left"),
  alignCenterHorizontal: (page: Page) =>
    page.getByTestId("prop-control-align-center-horizontal"),
  alignRight: (page: Page) => page.getByTestId("prop-control-align-right"),
  alignTop: (page: Page) => page.getByTestId("prop-control-align-top"),
  alignCenterVertical: (page: Page) =>
    page.getByTestId("prop-control-align-center-vertical"),
  alignBottom: (page: Page) => page.getByTestId("prop-control-align-bottom"),

  /**
   * Resize control buttons
   */
  resizeAll: (page: Page) => page.getByTestId("prop-control-resize-all"),
  resizeWidth: (page: Page) => page.getByTestId("prop-control-resize-width"),
  resizeHeight: (page: Page) => page.getByTestId("prop-control-resize-height"),
};

export const ActionLocators = {
  clickSettingType: (page: Page) =>
    page.getByTestId("prop-label-mi-widget-settings-click-setting-type"),

  clickSettingTypeInput: (page: Page) =>
    page.getByTestId("prop-input-mi-widget-settings-click-setting-type"),
};


export const ScaleRangeLocators = {
  startValue: (page: Page) => page.getByTestId("prop-input-scale-start-value"),

  endValue: (page: Page) => page.getByTestId("prop-input-scale-end-value"),

  offset: (page: Page) => page.getByTestId("prop-input-range-container-offset"),
};

export const ColorThemeLocators = {
  paletteLabel: (page: Page) => page.getByTestId("prop-label-palette"),

  palette: (page: Page) => page.getByTestId("prop-input-palette"),

  paletteOption: (page: Page, palette: string) =>
    page.getByText(palette, { exact: true }),
};

export const RunTimeFilterLocators = {
  runTimeFilterLabel: (page: Page) =>
    page.getByTestId("prop-label-common-runtime-filter-required"),

  runTimeFilter: (page: Page) =>
    page.getByTestId("prop-input-common-runtime-filter-required"),
  //below locator is used for 205
  //  runTimeFilter: (page: Page) =>
  //     page.getByTestId("prop-input-mi-widget-settings-runtime-filter-required"),
};

export const GeneralSettingsLocators = {
  seriesTypeLabel: (page: Page) =>
    page.getByTestId("prop-label-series-template-customize-series-type"),

  // seriesTypeInput: (page: Page) =>
  //   page.getByTestId("prop-input-series-template-customize-series-type"),
  seriesTypeInput: (page: Page) =>
    page.getByTestId("prop-input-series-template-type"),

  barWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-series-template-customize-series-bar-width"),

  // widgetWidthInput: (page: Page) =>
  //   page.getByTestId("prop-input-series-template-customize-series-bar-width"),
  widgetWidthInput: (page: Page) =>
    page.getByTestId("prop-input-series-template-customize-series-width"),

  paletteLabel: (page: Page) => page.getByTestId("prop-label-palette"),

  paletteInput: (page: Page) => page.getByTestId("prop-input-palette"),

  gradientLabel: (page: Page) =>
    page.getByTestId("prop-label-gradient-setting-gradient"),

  gradientInput: (page: Page) =>
    page.getByTestId("prop-input-gradient-setting-gradient"),

  rotatedLabel: (page: Page) => page.getByTestId("prop-label-rotated"),

  rotatedInput: (page: Page) => page.getByTestId("prop-input-rotated"),

  maxInstantaneousPointsLabel: (page: Page) =>
    page.getByTestId("prop-label-max-instantaneous-points"),

  maxInstantaneousPointsInput: (page: Page) =>
    page.getByTestId("prop-input-max-instantaneous-points"),
};

