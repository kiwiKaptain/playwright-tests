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
  // Start Angle
  const startAngleLabel = GaugeShapeLocators.startAngleLabel(page);
  const startSlider = GaugeShapeLocators.startAngle(page);

  if ((await startAngleLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-geometry-start-angle' not found.",
    );
  }

  if ((await startSlider.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-geometry-start-angle' not found.",
    );
  }

  await startAngleLabel.click();

  await startSlider.click();
  await startSlider.press("Home");

  for (let i = 0; i < startAngle; i++) {
    await startSlider.press("ArrowRight");
  }

  // End Angle
  const endAngleLabel = GaugeShapeLocators.endAngleLabel(page);
  const endSlider = GaugeShapeLocators.endAngle(page);

  if ((await endAngleLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-geometry-end-angle' not found.",
    );
  }

  if ((await endSlider.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-geometry-end-angle' not found.",
    );
  }

  await endAngleLabel.click();

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
    const typeLabel = GaugeValueIndicatorLocators.typeLabel(page);
    const typeInput = GaugeValueIndicatorLocators.typeInput(page);

    if ((await typeLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-value-indicator-type' not found.",
      );
    }

    if ((await typeInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-value-indicator-type' not found.",
      );
    }

    await typeLabel.click();
    await typeInput.click();

    await page.getByText(options.type, { exact: true }).click();
  }

  // Offset
  if (options.offset !== undefined) {
    const offsetLabel = GaugeValueIndicatorLocators.offsetLabel(page);
    const offsetInput = GaugeValueIndicatorLocators.offsetInput(page);

    if ((await offsetLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-value-indicator-offset' not found.",
      );
    }

    if ((await offsetInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-value-indicator-offset' not found.",
      );
    }

    await offsetLabel.click();

    await offsetInput.click();
    await offsetInput.press("ControlOrMeta+a");
    await offsetInput.fill(options.offset);
    await offsetInput.press("Enter");
  }

  // Size
  if (options.size !== undefined) {
    const sizeLabel = GaugeValueIndicatorLocators.sizeLabel(page);
    const sizeInput = GaugeValueIndicatorLocators.sizeInput(page);

    if ((await sizeLabel.count()) === 0) {
      throw new Error(
        "Test ID 'prop-label-value-indicator-size' not found.",
      );
    }

    if ((await sizeInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-value-indicator-size' not found.",
      );
    }

    await sizeLabel.click();

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
  // Font Color
  const fontColorLabel = ScaleLabelLocators.labelFontColorLabel(page);
  const fontColorInput = ScaleLabelLocators.labelFontColor(page);

  if ((await fontColorLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-scale-label-font-color not found.",
    );
  }

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-scale-label-font-color not found.",
    );
  }

  await fontColorLabel.click();

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeLabel = ScaleLabelLocators.labelFontSizeLabel(page);
  const fontSizeInput = ScaleLabelLocators.labelFontSize(page);

  if ((await fontSizeLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-scale-label-font-size not found.",
    );
  }

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-scale-label-font-size not found.",
    );
  }

  await fontSizeLabel.click();

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightLabel = ScaleLabelLocators.labelFontWeightLabel(page);
  const fontWeightInput = ScaleLabelLocators.labelFontWeight(page);

  if ((await fontWeightLabel.count()) === 0) {
    throw new Error(
      "Test ID prop-label-scale-label-font-weight not found.",
    );
  }

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID prop-input-scale-label-font-weight not found.",
    );
  }

  await fontWeightLabel.click();

  await fontWeightInput.click();

  await ScaleLabelLocators.labelFontWeightOption(
    page,
    fontWeight,
  ).click();

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

    if ((await startValueInput.count()) === 0) {
      throw new Error(
        "Test ID prop-input-scale-start-value not found.",
      );
    }

    await startValueInput.click();
    await startValueInput.press("ControlOrMeta+a");
    await startValueInput.fill(options.startValue);
    await startValueInput.press("Enter");
  }

  // End Value
  if (options.endValue !== undefined) {
    const endValueInput = ScaleRangeLocators.endValue(page);

    if ((await endValueInput.count()) === 0) {
      throw new Error(
        "Test ID prop-input-scale-end-value not found.",
      );
    }

    await endValueInput.click();
    await endValueInput.press("ControlOrMeta+a");
    await endValueInput.fill(options.endValue);
    await endValueInput.press("Enter");
  }

  // Range Container Offset
  if (options.offset !== undefined) {
    const offsetInput = ScaleRangeLocators.offset(page);

    if ((await offsetInput.count()) === 0) {
      throw new Error(
        "Test ID prop-input-range-container-offset not found.",
      );
    }

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
