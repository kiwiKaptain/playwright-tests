import { expect, Page } from "@playwright/test";
import {
  ActionLocators,
  ColorThemeLocators,
  GeneralSettingsLocators,
  playwrightLocators,
  RunTimeFilterLocators,
  
} from "../Locators/commonLocators";

export async function setLayoutAndSpacing(
  page: Page,
  top: string,
  right: string,
  bottom: string,
  left: string,
) {
  const margins = [
    [playwrightLocators.LayoutAndSpacing.marginTop(page), top],
    [playwrightLocators.LayoutAndSpacing.marginRight(page), right],
    [playwrightLocators.LayoutAndSpacing.marginBottom(page), bottom],
    [playwrightLocators.LayoutAndSpacing.marginLeft(page), left],
  ] as const;

  for (const [locator, value] of margins) {
    await locator.click();
    await locator.press("ControlOrMeta+a");
    await locator.fill(value);
    await locator.press("Enter");
  }

  // Click the widget on the canvas after updating all margins
  const selectedWidget = page
    .locator(".grid-stack-item-content")
    .filter({
      visible: true,
    })
    .last();

  await selectedWidget.click();
}

export async function setAppearance(page: Page, color: string) {
    const backgroundColor =
    playwrightLocators.Appearance.backgroundColor(page);

  if ((await backgroundColor.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-common-background-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }
  await backgroundColor.click();
  await backgroundColor.press("ControlOrMeta+a");
  await backgroundColor.fill(color);
  await backgroundColor.press("Enter");
}

export async function setTitleProperties(
  page: Page,
  text: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
  verticalAlignment: "top" | "middle" | "bottom",
  horizontalAlignment: "left" | "center" | "right",
) {
  // ============================================================
  // Title Text
  // ============================================================
  const titleText = playwrightLocators.Title.text(page);

  if ((await titleText.count()) === 0) {
    throw new Error("Test ID 'prop-input-title-text' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await titleText.click();
  await titleText.press("ControlOrMeta+a");
  await titleText.fill(text);
  await titleText.press("Enter");

  // ============================================================
  // Title Font Color
  // ============================================================
  const fontColorInput = playwrightLocators.Title.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // ============================================================
  // Title Font Size
  // ============================================================
  const fontSizeInput = playwrightLocators.Title.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // ============================================================
  // Title Font Weight
  // ============================================================
  const fontWeightInput = playwrightLocators.Title.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  const fontWeightOption = playwrightLocators.Title.fontWeightOption(
    page,
    fontWeight,
  );

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `Title font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();
  await fontWeightInput.press("Enter");

  // ============================================================
  // Title Vertical Alignment
  // ============================================================
  const verticalAlignmentControl =
    playwrightLocators.Title.verticalAlignment(
      page,
      verticalAlignment,
    );

  const verticalAlignmentTestId =
    `prop-control-title-vertical-alignment-${verticalAlignment}`;

  if ((await verticalAlignmentControl.count()) === 0) {
    throw new Error(
      `Test ID '${verticalAlignmentTestId}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await verticalAlignmentControl.click();

  // ============================================================
  // Title Horizontal Alignment
  // ============================================================
  const horizontalAlignmentControl =
    playwrightLocators.Title.horizontalAlignment(
      page,
      horizontalAlignment,
    );

  const horizontalAlignmentTestId =
    `prop-control-title-horizontal-alignment-${horizontalAlignment}`;

  if ((await horizontalAlignmentControl.count()) === 0) {
    throw new Error(
      `Test ID '${horizontalAlignmentTestId}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await horizontalAlignmentControl.click();
}

export async function setSubtitleProperties(
  page: Page,
  text: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
) {
  // ============================================================
  // Subtitle Text
  // ============================================================
  const subtitleText = playwrightLocators.Subtitle.text(page);

  if ((await subtitleText.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-subtitle-text' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await subtitleText.click();
  await subtitleText.press("ControlOrMeta+a");
  await subtitleText.fill(text);
  await subtitleText.press("Enter");

  // ============================================================
  // Subtitle Font Color
  // ============================================================
  const fontColorInput = playwrightLocators.Subtitle.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-subtitle-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // ============================================================
  // Subtitle Font Size
  // ============================================================
  const fontSizeInput = playwrightLocators.Subtitle.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-subtitle-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // ============================================================
  // Subtitle Font Weight
  // ============================================================
  const fontWeightInput = playwrightLocators.Subtitle.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-title-subtitle-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  // Font Weight Option
  const fontWeightOption =
    playwrightLocators.Subtitle.fontWeightOption(page, fontWeight);

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `Subtitle font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();
  await fontWeightInput.press("Enter");
}
export async function setLegendProperties(
  page: Page,
  visible: boolean,
  borderVisible: boolean,
  borderColor: string,
  horizontalAlignment: "left" | "center" | "right",
  verticalAlignment: "top" | "middle" | "bottom",
  itemTextPosition: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
  backgroundColor?: string,
  position?: string,
  orientation?: string,
) {
  // Legend Visible
  const visibleInput = playwrightLocators.Legend.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error("Test ID 'prop-input-legend-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await visibleInput.click();

  // Legend Border Visible
  const borderVisibleInput = playwrightLocators.Legend.borderVisible(page);

  if ((await borderVisibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-legend-border-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await borderVisibleInput.click();

  // Border Color
  const borderColorInput = playwrightLocators.Legend.borderColor(page);

  if ((await borderColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-legend-border-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await borderColorInput.click();
  await borderColorInput.press("ControlOrMeta+a");
  await borderColorInput.fill(borderColor);
  await borderColorInput.press("Enter");

  // Horizontal Alignment
  const horizontalAlignmentInput =
    playwrightLocators.Legend.horizontalAlignment(
      page,
      horizontalAlignment,
    );

  if ((await horizontalAlignmentInput.count()) === 0) {
    throw new Error(
      `Test ID 'prop-control-legend-horizontal-alignment-${horizontalAlignment}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await horizontalAlignmentInput.click();

  // Vertical Alignment
  const verticalAlignmentInput =
    playwrightLocators.Legend.verticalAlignment(
      page,
      verticalAlignment,
    );

  if ((await verticalAlignmentInput.count()) === 0) {
    throw new Error(
      `Test ID 'prop-control-legend-vertical-alignment-${verticalAlignment}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await verticalAlignmentInput.click();

  // Orientation - only applicable for some widgets
  if (orientation) {
    const orientationInput = playwrightLocators.Legend.orientation(page);

    if ((await orientationInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-legend-orientation' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
      );
    }

    await orientationInput.click();

    const orientationWeightOption =
      playwrightLocators.Legend.orientationWeightOption(
        page,
        orientation,
      );

    if ((await orientationWeightOption.count()) === 0) {
      throw new Error(
        `Legend orientation option '${orientation}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
      );
    }

    await orientationWeightOption.click();

    await orientationInput.press("Enter");
  }

  // Legend Position - only applicable for some widgets
  if (position) {
    const positionInput = playwrightLocators.Legend.position(page);

    if ((await positionInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-legend-position' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
      );
    }

    await positionInput.click();

    const positionOption = playwrightLocators.Legend.positionOption(
      page,
      position,
    );

    if ((await positionOption.count()) === 0) {
      throw new Error(
        `Legend position option '${position}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
      );
    }

    await positionOption.click();

    await positionInput.press("Enter");
  }

  // Item Text Position
  const itemTextPositionInput =
    playwrightLocators.Legend.itemTextPosition(page);

  if ((await itemTextPositionInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-legend-item-text-position' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await itemTextPositionInput.click();

  const itemTextPositionOption =
    playwrightLocators.Legend.itemTextPositionOption(
      page,
      itemTextPosition,
    );

  if ((await itemTextPositionOption.count()) === 0) {
    throw new Error(
      `Legend item text position option '${itemTextPosition}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await itemTextPositionOption.click();

  // Font Color
  const fontColorInput = playwrightLocators.Legend.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-legend-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput = playwrightLocators.Legend.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-legend-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput = playwrightLocators.Legend.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-legend-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  const fontWeightOption = playwrightLocators.Legend.fontWeightOption(
    page,
    fontWeight,
  );

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `Legend font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();

  await fontWeightInput.press("Enter");

  // Background Color
  if (backgroundColor) {
    const backgroundColorInput =
      playwrightLocators.Legend.backgroundColor(page);

    if ((await backgroundColorInput.count()) === 0) {
      throw new Error(
        "Test ID 'prop-input-legend-background-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
      );
    }

    await backgroundColorInput.click();
    await backgroundColorInput.press("ControlOrMeta+a");
    await backgroundColorInput.fill(backgroundColor);
    await backgroundColorInput.press("Enter");
  }
}

export async function setTooltipProperties(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
  color: string,
) {
  // ============================================================
  // Tooltip Enabled
  // ============================================================
  const tooltipEnabled = playwrightLocators.Tooltip.enabled(page);

  if ((await tooltipEnabled.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-tooltip-enabled' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await tooltipEnabled.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await tooltipEnabled.click();
  }

  // ============================================================
  // Tooltip Font Color
  // ============================================================
  const fontColorInput = playwrightLocators.Tooltip.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-tooltip-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // ============================================================
  // Tooltip Font Size
  // ============================================================
  const fontSizeInput = playwrightLocators.Tooltip.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-tooltip-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // ============================================================
  // Tooltip Font Weight
  // ============================================================
  const fontWeightInput = playwrightLocators.Tooltip.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-tooltip-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  // Font Weight Option
  const fontWeightOption =
    playwrightLocators.Tooltip.fontWeightOption(page, fontWeight);

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `Tooltip font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();
  await fontWeightInput.press("Enter");

  // ============================================================
  // Tooltip Background Color
  // ============================================================
  const colorInput = playwrightLocators.Tooltip.color(page);

  if ((await colorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-tooltip-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setXAxisTitleProperties(
  page: Page,
  text: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
) {
  // X-Axis Title Text
  const textInput = playwrightLocators.XAxisTitle.text(page);

  if ((await textInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-title-text' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await textInput.click();
  await textInput.fill(text);
  await textInput.press("Enter");

  // Font Color
  const fontColorInput = playwrightLocators.XAxisTitle.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-title-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput = playwrightLocators.XAxisTitle.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-title-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput =
    playwrightLocators.XAxisTitle.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-title-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  const fontWeightOption =
    playwrightLocators.XAxisTitle.fontWeightOption(
      page,
      fontWeight,
    );

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `X-Axis title font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();
  await fontWeightInput.press("Enter");
}
export async function setYAxisTitleProperties(
  page: Page,
  text: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
) {
  // Y-Axis Visible
  const visibleInput = playwrightLocators.YAxisTitle.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  // Y-Axis Title Text
  const textInput = playwrightLocators.YAxisTitle.text(page);

  if ((await textInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-title-text' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await textInput.click();
  await textInput.fill(text);
  await textInput.press("Enter");

  // Font Color
  const fontColorInput = playwrightLocators.YAxisTitle.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-title-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput = playwrightLocators.YAxisTitle.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-title-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput =
    playwrightLocators.YAxisTitle.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-title-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  const fontWeightOption =
    playwrightLocators.YAxisTitle.fontWeightOption(
      page,
      fontWeight,
    );

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `Y-Axis title font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();

  await fontWeightInput.press("Enter");
}

export async function setXAxisLabelProperties(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
) {
  // X-Axis Label Visible
  const visibleInput = playwrightLocators.XAxisLabel.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-label-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  // Font Color
  const fontColorInput = playwrightLocators.XAxisLabel.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-label-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput = playwrightLocators.XAxisLabel.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-label-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput = playwrightLocators.XAxisLabel.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-label-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  const fontWeightOption =
    playwrightLocators.XAxisLabel.fontWeightOption(
      page,
      fontWeight,
    );

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `X-Axis label font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();

  await fontWeightInput.press("Enter");
}

export async function setYAxisLabelProperties(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
) {
  const visibleInput = playwrightLocators.YAxisLabel.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-label-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  const fontColorInput = playwrightLocators.YAxisLabel.fontColor(page);

  if ((await fontColorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-label-font-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  const fontSizeInput = playwrightLocators.YAxisLabel.fontSize(page);

  if ((await fontSizeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-label-font-size' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  const fontWeightInput = playwrightLocators.YAxisLabel.fontWeight(page);

  if ((await fontWeightInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-label-font-weight' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await fontWeightInput.click();

  const fontWeightOption =
    playwrightLocators.YAxisLabel.fontWeightOption(page, fontWeight);

  if ((await fontWeightOption.count()) === 0) {
    throw new Error(
      `Y-Axis label font weight option '${fontWeight}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`,
    );
  }

  await fontWeightOption.click();

  await fontWeightInput.press("Enter");
}
export async function setXAxisTickProperties(page: Page, color: string) {
  const visibleInput = playwrightLocators.XAxisTick.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-tick-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  const colorInput = playwrightLocators.XAxisTick.color(page);

  if ((await colorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-tick-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}

export async function setYAxisTickProperties(page: Page, color: string) {
  const visibleInput = playwrightLocators.YAxisTick.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-tick-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  const colorInput = playwrightLocators.YAxisTick.color(page);

  if ((await colorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-tick-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setXAxisGridProperties(page: Page, color: string) {
  const visibleInput = playwrightLocators.XAxisGrid.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-grid-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  const colorInput = playwrightLocators.XAxisGrid.color(page);

  if ((await colorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-argument-axis-grid-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}

export async function setYAxisGridProperties(page: Page, color: string) {
  const visibleInput = playwrightLocators.YAxisGrid.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-grid-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  const colorInput = playwrightLocators.YAxisGrid.color(page);

  if ((await colorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-grid-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setMinorGridProperties(page: Page, color: string) {
  const visibleInput = playwrightLocators.MinorGrid.visible(page);

  if ((await visibleInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-minor-grid-visible' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await visibleInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await visibleInput.click();
  }

  const colorInput = playwrightLocators.MinorGrid.color(page);

  if ((await colorInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-value-axis-0-minor-grid-color' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}

export async function setActionsProperties(page: Page, dashboardName: string) {
  const settingTypeInput = ActionLocators.clickSettingTypeInput(page);

  // Verify Action setting type input exists
  if ((await settingTypeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mi-widget-settings-click-setting-type' or 'prop-label-mi-widget-settings-click-setting-type' for Action setting type input not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }
  // Click Action setting type
  await ActionLocators.clickSettingType(page).click();

  // Open setting type dropdown
  await ActionLocators.clickSettingTypeInput(page).click();

  // Select Link To
  await page.getByText("Link To", { exact: true }).click();

  // Confirm selection
  await ActionLocators.clickSettingTypeInput(page).press("Enter");

  // Open dashboard selection
  await page.getByRole("button", { name: "preferences" }).click();

  // Select dashboard
  await page.getByText(dashboardName, { exact: true }).click();

  // Save Action settings
  await page.getByRole("button", { name: "Save", exact: true }).click();

  // Wait until Action dialog closes
  await expect(page.getByRole("dialog")).toBeHidden();
}

export async function setActionsToNone(page: Page) {
  const settingTypeInput = ActionLocators.clickSettingTypeInput(page);

  // Verify Action setting type input exists
  if ((await settingTypeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mi-widget-settings-click-setting-type' or 'prop-label-mi-widget-settings-click-setting-type' for Action setting type input not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }
  // Click Action setting type
  await ActionLocators.clickSettingType(page).click();

  // Open setting type dropdown
  await ActionLocators.clickSettingTypeInput(page).click();

  // Select Link To
  await page.getByText("None", { exact: true }).click();
}

export async function setColorTheme(page: Page, palette: string) {
  const paletteLabel = ColorThemeLocators.paletteLabel(page);

  if ((await paletteLabel.count()) === 0) {
    throw new Error("Test ID 'prop-label-palette' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await paletteLabel.click();

  const paletteInput = ColorThemeLocators.palette(page);

  if ((await paletteInput.count()) === 0) {
    throw new Error("Test ID 'prop-input-palette' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await paletteInput.click();

  const paletteOption = ColorThemeLocators.paletteOption(page, palette);

  if ((await paletteOption.count()) === 0) {
    throw new Error(`Palette option '${palette}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`);
  }

  await paletteOption.click();
}

export async function setRunTimeFilter(page: Page) {
  // await RunTimeFilterLocators.runTimeFilter(page).click();
  const runTimeFilter = RunTimeFilterLocators.runTimeFilter(page);

  if ((await runTimeFilter.count()) === 0) {
    throw new Error(
      "Test ID prop-input-common-runtime-filter-required not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  const isChecked =
    (await runTimeFilter.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await runTimeFilter.click();
  }
}

export async function setSeriesType(page: Page, seriesType: string) {
  const seriesTypeInput = GeneralSettingsLocators.seriesTypeInput(page);

  if ((await seriesTypeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-series-template-type' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await seriesTypeInput.click();

  const seriesTypeOption = page.getByText(seriesType, { exact: true });

  if ((await seriesTypeOption.count()) === 0) {
    throw new Error(`Series type option '${seriesType}' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",`);
  }

  await seriesTypeOption.click();
}

export async function setWidgetWidth(page: Page, widthInput: string) {
  const widgetWidthInput = GeneralSettingsLocators.widgetWidthInput(page);

  if ((await widgetWidthInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-series-template-customize-series-width' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await widgetWidthInput.click();
  await widgetWidthInput.press("ControlOrMeta+a");
  await widgetWidthInput.fill(widthInput);
  await widgetWidthInput.press("Enter");
}

export async function setGradient(page: Page) {
  const gradientLabel = GeneralSettingsLocators.gradientLabel(page);

  if ((await gradientLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-gradient-setting-gradient' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await gradientLabel.click();

  const gradientInput = GeneralSettingsLocators.gradientInput(page);

  if ((await gradientInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-gradient-setting-gradient' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await gradientInput.click();
}

export async function setRotated(page: Page) {
  const rotatedLabel = GeneralSettingsLocators.rotatedLabel(page);

  if ((await rotatedLabel.count()) === 0) {
    throw new Error("Test ID 'prop-label-rotated' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  await rotatedLabel.click();

  const rotatedInput = GeneralSettingsLocators.rotatedInput(page);

  if ((await rotatedInput.count()) === 0) {
    throw new Error("Test ID 'prop-input-rotated' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",");
  }

  const isChecked =
    (await rotatedInput.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await rotatedInput.click();
  }
}

export async function setMaxInstantaneousPoints(
  page: Page,
  value: string,
) {
  const maxPointsLabel =
    GeneralSettingsLocators.maxInstantaneousPointsLabel(page);

  if ((await maxPointsLabel.count()) === 0) {
    throw new Error(
      "Test ID 'prop-label-max-instantaneous-points' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await maxPointsLabel.click();

  const maxPointsInput =
    GeneralSettingsLocators.maxInstantaneousPointsInput(page);

  if ((await maxPointsInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-max-instantaneous-points' not found. " +
    "Playwright might be stuck hence may not have load test correctly. Please try rerunning the test case.",",
    );
  }

  await maxPointsInput.click();
  await maxPointsInput.press("ControlOrMeta+a");
  await maxPointsInput.fill(value);
  await maxPointsInput.press("Enter");
}
