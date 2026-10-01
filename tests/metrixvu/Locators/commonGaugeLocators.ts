import { Page } from "@playwright/test";
export const GaugeShapeLocators = {
  startAngleLabel: (page: Page) =>
    page.getByTestId("prop-label-geometry-start-angle"),

  startAngle: (page: Page) =>
    page
      .getByTestId("prop-input-geometry-start-angle")
      .getByRole("slider", { name: "Slider" }),

  endAngleLabel: (page: Page) =>
    page.getByTestId("prop-label-geometry-end-angle"),

  endAngle: (page: Page) =>
    page
      .getByTestId("prop-input-geometry-end-angle")
      .getByRole("slider", { name: "Slider" }),
};

export const GaugeValueIndicatorLocators = {
  typeLabel: (page: Page) =>
    page.getByTestId("prop-label-value-indicator-type"),

  typeInput: (page: Page) =>
    page.getByTestId("prop-input-value-indicator-type"),

  offsetLabel: (page: Page) =>
    page.getByTestId("prop-label-value-indicator-offset"),

  offsetInput: (page: Page) =>
    page.getByTestId("prop-input-value-indicator-offset"),

  sizeLabel: (page: Page) =>
    page.getByTestId("prop-label-value-indicator-size"),

  sizeInput: (page: Page) =>
    page.getByTestId("prop-input-value-indicator-size"),

  gradientLabel: (page: Page) =>
    page.getByTestId("prop-label-gradient-setting-gradient"),

  gradientInput: (page: Page) =>
    page.getByTestId("prop-input-gradient-setting-gradient"),
};

export const ScaleLabelLocators = {
  labelVisibleLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-label-visible"),

  labelVisible: (page: Page) =>
    page.getByTestId("prop-input-scale-label-visible"),

  labelFontColorLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-label-font-color"),

  labelFontColor: (page: Page) =>
    page.getByTestId("prop-input-scale-label-font-color"),

  labelFontSizeLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-label-font-size"),

  labelFontSize: (page: Page) =>
    page.getByTestId("prop-input-scale-label-font-size"),

  labelFontWeightLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-label-font-weight"),

  labelFontWeight: (page: Page) =>
    page.getByTestId("prop-input-scale-label-font-weight"),

  labelFontWeightOption: (page: Page, fontWeight: string) =>
    page.getByRole("listbox").getByText(fontWeight),
};
export const ScaleTickLocators = {
  scaleTickVisibleLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-tick-visible"),

  scaleTickVisible: (page: Page) =>
    page.getByTestId("prop-input-scale-tick-visible"),

  scaleTickColorLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-tick-color"),

  scaleTickColor: (page: Page) =>
    page.getByTestId("prop-input-scale-tick-color"),

  scaleTickWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-tick-width"),

  scaleTickWidth: (page: Page) =>
    page.getByTestId("prop-input-scale-tick-width"),

  scaleTickLengthLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-tick-length"),

  scaleTickLength: (page: Page) =>
    page.getByTestId("prop-input-scale-tick-length"),

  scaleTickIntervalLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-tick-interval"),

  scaleTickInterval: (page: Page) =>
    page.getByTestId("prop-input-scale-tick-interval"),
};

export const ScaleMinorTickLocators = {
  scaleMinorTickVisibleLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-minor-tick-visible"),

  scaleMinorTickVisible: (page: Page) =>
    page.getByTestId("prop-input-scale-minor-tick-visible"),

  scaleMinorTickColorLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-minor-tick-color"),

  scaleMinorTickColor: (page: Page) =>
    page.getByTestId("prop-input-scale-minor-tick-color"),

  scaleMinorTickWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-minor-tick-width"),

  scaleMinorTickWidth: (page: Page) =>
    page.getByTestId("prop-input-scale-minor-tick-width"),

  scaleMinorTickLengthLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-minor-tick-length"),

  scaleMinorTickLength: (page: Page) =>
    page.getByTestId("prop-input-scale-minor-tick-length"),

  scaleMinorTickIntervalLabel: (page: Page) =>
    page.getByTestId("prop-label-scale-minor-tick-interval"),

  scaleMinorTickInterval: (page: Page) =>
    page.getByTestId("prop-input-scale-minor-tick-interval"),
};

export const RangeWidthLocators = {
  rangeWidthLabel: (page: Page) =>
    page.getByTestId("prop-label-range-container-width"),

  rangeWidth: (page: Page) =>
    page.getByTestId("prop-input-range-container-width"),
};

export const RangeContainerLocators = {
  // Range items
  rangeItem: (page: Page, index: number) =>
    page.getByTestId(`prop-container-range-item-${index}`),

  // Range values
  rangeStartValue: (page: Page, index: number) =>
    page.getByTestId(`prop-input-range-start-value-${index}`),

  rangeEndValue: (page: Page, index: number) =>
    page.getByTestId(`prop-input-range-end-value-${index}`),

  // Range gradient
  rangeGradient: (page: Page, index: number) =>
    page.getByTestId(`prop-input-range-gradient-${index}`),

  // Range actions
  rangeAdd: (page: Page) => page.getByTestId("prop-button-range-add"),

  rangeDelete: (page: Page) => page.getByTestId("prop-button-range-delete"),
};
export const ThresholdLocators = {
  enabledLabel: (page: Page) =>
    page.getByTestId("prop-label-threshold-enabled"),

  enabled: (page: Page) =>
    page.getByTestId("prop-input-threshold-enabled"),

  valueLabel: (page: Page) =>
    page.getByTestId("prop-label-threshold-value"),

  value: (page: Page) =>
    page.getByTestId("prop-input-threshold-value"),

  subvalueIndicatorType: (page: Page) =>
    page.getByTestId("prop-input-subvalue-indicator-type"),
};
