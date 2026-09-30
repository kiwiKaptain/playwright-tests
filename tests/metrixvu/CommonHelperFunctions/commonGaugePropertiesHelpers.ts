/// GAUGE RELATED COMMON PROPERTIES
import type { Page } from "@playwright/test";
import {
  GaugeShapeLocators,
  GaugeValueIndicatorLocators,
  RangeContainerLocators,
  RangeWidthLocators,
  ScaleLabelLocators,
  ScaleMinorTickLocators,
  ScaleTickLocators,
} from "../Locators/commonGaugeLocators";
import { ScaleRangeLocators } from "../Locators/commonLocators";

export async function setGaugeShape(
  page: Page,
  startAngle: number,
  endAngle: number,
) {
  await GaugeShapeLocators.startAngleLabel(page).click();

  const startSlider = GaugeShapeLocators.startAngle(page);
  await startSlider.click();
  await startSlider.press("Home");

  for (let i = 0; i < startAngle; i++) {
    await startSlider.press("ArrowRight");
  }

  await GaugeShapeLocators.endAngleLabel(page).click();

  const endSlider = GaugeShapeLocators.endAngle(page);
  await endSlider.click();
  await endSlider.press("Home");

  for (let i = 0; i < endAngle; i++) {
    await endSlider.press("ArrowRight");
  }
}

export async function setGaugeValueIndicatorProperties(
  page: Page,
  options: {
    gapSpacing?: string;
    type?: string;
    offset?: string;
    size?: string;
  },
) {
  // Type
  if (options.type !== undefined) {
    await GaugeValueIndicatorLocators.typeLabel(page).click();
    await GaugeValueIndicatorLocators.typeInput(page).click();

    await page.getByText(options.type, { exact: true }).click();
  }

  // Offset
  if (options.offset !== undefined) {
    await GaugeValueIndicatorLocators.offsetLabel(page).click();

    const offsetInput = GaugeValueIndicatorLocators.offsetInput(page);

    await offsetInput.click();
    await offsetInput.press("ControlOrMeta+a");
    await offsetInput.fill(options.offset);
    await offsetInput.press("Enter");
  }

  // Size
  if (options.size !== undefined) {
    await GaugeValueIndicatorLocators.sizeLabel(page).click();

    const sizeInput = GaugeValueIndicatorLocators.sizeInput(page);

    await sizeInput.click();
    await sizeInput.press("ControlOrMeta+a");
    await sizeInput.fill(options.size);
    await sizeInput.press("Enter");
  }
}
export async function setGaugeScaleLabel(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
) {
  const fontColorInput = ScaleLabelLocators.labelFontColor(page);
  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  await ScaleLabelLocators.labelFontSizeLabel(page).click();

  const fontSizeInput = ScaleLabelLocators.labelFontSize(page);
  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  await ScaleLabelLocators.labelFontWeightLabel(page).click();

  const fontWeightInput = ScaleLabelLocators.labelFontWeight(page);
  await fontWeightInput.click();

  await ScaleLabelLocators.labelFontWeightOption(page, fontWeight).click();

  await fontWeightInput.press("Enter");
}

export async function setGaugeScaleRange(
  page: Page,
  options: {
    startValue?: string;
    endValue?: string;
    offset?: string;
  },
) {
  // Start Value
  if (options.startValue !== undefined) {
    const startValueInput = ScaleRangeLocators.startValue(page);

    await startValueInput.click();
    await startValueInput.press("ControlOrMeta+a");
    await startValueInput.fill(options.startValue);
    await startValueInput.press("Enter");
  }

  // End Value
  if (options.endValue !== undefined) {
    const endValueInput = ScaleRangeLocators.endValue(page);

    await endValueInput.click();
    await endValueInput.press("ControlOrMeta+a");
    await endValueInput.fill(options.endValue);
    await endValueInput.press("Enter");
  }

  // Range Container Offset
  if (options.offset !== undefined) {
    const offsetInput = ScaleRangeLocators.offset(page);

    await offsetInput.click();
    await offsetInput.press("ControlOrMeta+a");
    await offsetInput.fill(options.offset);
    await offsetInput.press("Enter");
  }
}
export async function setGaugeScaleTickProperties(
  page: Page,
  options: {
    visible?: boolean;
    color?: string;
    width?: string;
    length?: string;
    interval?: string;
  },
) {
  // Visible
  if (options.visible !== undefined) {
    await ScaleTickLocators.scaleTickVisibleLabel(page).click();

    const visibleInput = ScaleTickLocators.scaleTickVisible(page);
    await visibleInput.click();
    await visibleInput.click();
  }

  // Color
  if (options.color !== undefined) {
    await ScaleTickLocators.scaleTickColorLabel(page).click();

    const colorInput = ScaleTickLocators.scaleTickColor(page);
    await colorInput.click();
    await colorInput.press("ControlOrMeta+a");
    await colorInput.fill(options.color);
    await colorInput.press("Enter");
  }

  // Width
  if (options.width !== undefined) {
    await ScaleTickLocators.scaleTickWidthLabel(page).click();

    const widthInput = ScaleTickLocators.scaleTickWidth(page);
    await widthInput.click();
    await widthInput.press("ControlOrMeta+a");
    await widthInput.fill(options.width);
    await widthInput.press("Enter");
  }

  // Length
  if (options.length !== undefined) {
    await ScaleTickLocators.scaleTickLengthLabel(page).click();

    const lengthInput = ScaleTickLocators.scaleTickLength(page);
    await lengthInput.click();
    await lengthInput.press("ControlOrMeta+a");
    await lengthInput.fill(options.length);
    await lengthInput.press("Enter");
  }

  // Interval
  if (options.interval !== undefined) {
    await ScaleTickLocators.scaleTickIntervalLabel(page).click();

    const intervalInput = ScaleTickLocators.scaleTickInterval(page);
    await intervalInput.click();
    await intervalInput.press("ControlOrMeta+a");
    await intervalInput.fill(options.interval);
    await intervalInput.press("Enter");
  }
}

export async function setGaugeScaleMinorTickProperties(
  page: Page,
  options: {
    visible?: boolean;
    color?: string;
    width?: string;
    length?: string;
    interval?: string;
  },
) {
  // Visible
  if (options.visible !== undefined) {
    await ScaleMinorTickLocators.scaleMinorTickVisibleLabel(page).click();

    const visibleInput = ScaleMinorTickLocators.scaleMinorTickVisible(page);

    if ((await visibleInput.isChecked()) !== options.visible) {
      await visibleInput.click();
    }
  }

  // Color
  if (options.color !== undefined) {
    await ScaleMinorTickLocators.scaleMinorTickColorLabel(page).click();

    const colorInput = ScaleMinorTickLocators.scaleMinorTickColor(page);

    await colorInput.click();
    await colorInput.press("ControlOrMeta+a");
    await colorInput.fill(options.color);
    await colorInput.press("Enter");
  }

  // Width
  if (options.width !== undefined) {
    await ScaleMinorTickLocators.scaleMinorTickWidthLabel(page).click();

    const widthInput = ScaleMinorTickLocators.scaleMinorTickWidth(page);

    await widthInput.click();
    await widthInput.press("ControlOrMeta+a");
    await widthInput.fill(options.width);
    await widthInput.press("Enter");
  }

  // Length
  if (options.length !== undefined) {
    await ScaleMinorTickLocators.scaleMinorTickLengthLabel(page).click();

    const lengthInput = ScaleMinorTickLocators.scaleMinorTickLength(page);

    await lengthInput.click();
    await lengthInput.press("ControlOrMeta+a");
    await lengthInput.fill(options.length);
    await lengthInput.press("Enter");
  }

  // Interval
  if (options.interval !== undefined) {
    await ScaleMinorTickLocators.scaleMinorTickIntervalLabel(page).click();

    const intervalInput = ScaleMinorTickLocators.scaleMinorTickInterval(page);

    await intervalInput.click();
    await intervalInput.press("ControlOrMeta+a");
    await intervalInput.fill(options.interval);
    await intervalInput.press("Enter");
  }
}

export async function setGaugeRangeWidth(page: Page, rangeWidth: number) {
  await RangeWidthLocators.rangeWidthLabel(page).click();

  const widthSlider = RangeWidthLocators.rangeWidth(page);

  await widthSlider.click();
  await widthSlider.press("Home");

  for (let i = 0; i < rangeWidth; i++) {
    await widthSlider.press("ArrowRight");
  }
}

export async function addGaugeRange(page: Page) {
  await RangeContainerLocators.rangeAdd(page).click();
}

export async function updateGaugeRange(
  page: Page,
  options: {
    index: number;
    startValue?: string;
    endValue?: string;
    gradient?: boolean;
  },
) {
  // Select range
  await RangeContainerLocators.rangeItem(page, options.index).click();

  // Start Value
  if (options.startValue !== undefined) {
    const startValueInput = RangeContainerLocators.rangeStartValue(
      page,
      options.index,
    );

    await startValueInput.click();
    await startValueInput.press("ControlOrMeta+a");
    await startValueInput.fill(options.startValue);
    await startValueInput.press("Enter");
  }

  // End Value
  if (options.endValue !== undefined) {
    const endValueInput = RangeContainerLocators.rangeEndValue(
      page,
      options.index,
    );

    await endValueInput.click();
    await endValueInput.press("ControlOrMeta+a");
    await endValueInput.fill(options.endValue);
    await endValueInput.press("Enter");
  }

  // Gradient
  if (options.gradient !== undefined) {
    const gradientInput = RangeContainerLocators.rangeGradient(
      page,
      options.index,
    );

    const isChecked = await gradientInput.isChecked();

    if (isChecked !== options.gradient) {
      await gradientInput.click();
    }
  }
}
export async function deleteGaugeRange(page: Page, index: number) {
  // Select range
  await RangeContainerLocators.rangeItem(page, index).click();

  // Delete Range
  await RangeContainerLocators.rangeDelete(page).click();

  // Confirm deletion
  await page.getByText("Confirm Range Deletion").click();
  await page.getByRole("button", { name: "Delete" }).click();
}
