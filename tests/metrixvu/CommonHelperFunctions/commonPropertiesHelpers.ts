import { expect, Page } from "@playwright/test";
import { ActionLocators, ColorThemeLocators, GaugeShapeLocators, GaugeValueIndicatorLocators, GeneralSettingsLocators, playwrightLocators, RangeContainerLocators, RangeWidthLocators, RunTimeFilterLocators, ScaleLabelLocators, ScaleMinorTickLocators, ScaleRangeLocators, ScaleTickLocators } from "../Locators/commonLocators";

export async function setLayoutAndSpacing(
  page: Page,
  top: string,
  right: string,
  bottom: string,
  left: string
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
  const selectedWidget = page.locator(".grid-stack-item-content").filter({
    visible: true,
  }).last();

  await selectedWidget.click();
}

export async function setAppearance(
  page: Page,
  color: string
) {
  const backgroundColor =
    playwrightLocators.Appearance.backgroundColor(page);

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
  horizontalAlignment: "left" | "center" | "right"
) {
  const titleText = playwrightLocators.Title.text(page);

  await titleText.click();
  await titleText.press("ControlOrMeta+a");
  await titleText.fill(text);
  await titleText.press("Enter");

  const fontColorInput = playwrightLocators.Title.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  const fontSizeInput = playwrightLocators.Title.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  const fontWeightInput = playwrightLocators.Title.fontWeight(page);

  await fontWeightInput.click();
  await playwrightLocators.Title
    .fontWeightOption(page, fontWeight)
    .click();
  await fontWeightInput.press("Enter");

  await playwrightLocators.Title
    .verticalAlignment(page, verticalAlignment)
    .click();

  await playwrightLocators.Title
    .horizontalAlignment(page, horizontalAlignment)
    .click();
}


export async function setSubtitleProperties(
  page: Page,
  text: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string
) {
  const subtitleText = playwrightLocators.Subtitle.text(page);

  await subtitleText.click();
  await subtitleText.press("ControlOrMeta+a");
  await subtitleText.fill(text);
  await subtitleText.press("Enter");

  const fontColorInput =
    playwrightLocators.Subtitle.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  const fontSizeInput =
    playwrightLocators.Subtitle.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  const fontWeightInput =
    playwrightLocators.Subtitle.fontWeight(page);

  await fontWeightInput.click();

  await playwrightLocators.Subtitle
    .fontWeightOption(page, fontWeight)
    .click();

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
  backgroundColor?: string ,
  position?: string,
  orientation?: string,
) {
  // Legend Visible
  const visibleInput =
    playwrightLocators.Legend.visible(page);

  await visibleInput.click();

  // Legend Border Visible
  const borderVisibleInput =
    playwrightLocators.Legend.borderVisible(page);

  await borderVisibleInput.click();

  // Border Color
  const borderColorInput =
    playwrightLocators.Legend.borderColor(page);

  await borderColorInput.click();
  await borderColorInput.press("ControlOrMeta+a");
  await borderColorInput.fill(borderColor);
  await borderColorInput.press("Enter");

  // Horizontal Alignment
  await playwrightLocators.Legend
    .horizontalAlignment(page, horizontalAlignment)
    .click();

  // Vertical Alignment
  await playwrightLocators.Legend
    .verticalAlignment(page, verticalAlignment)
    .click();
// Orientation - only applicable for some widgets
if (orientation) {
  const orientationInput =
    playwrightLocators.Legend.orientation(page);

  await orientationInput.click();

  await playwrightLocators.Legend
    .orientationWeightOption(page, orientation)
    .click();

  await orientationInput.press("Enter");

    
}
 // Legend Position - only applicable for some widgets

  if (position) {
    const positionInput =
      playwrightLocators.Legend.position(page);

    await positionInput.click();

    await playwrightLocators.Legend
      .positionOption(page, position)
      .click();

    await positionInput.press("Enter");
  }
  // const positionInput =
  //   playwrightLocators.Legend.position(page);

  // await positionInput.click();

  // await playwrightLocators.Legend
  //   .positionOption(page, position)
  //   .click();

  // Item Text Position
  const itemTextPositionInput =
    playwrightLocators.Legend.itemTextPosition(page);

  await itemTextPositionInput.click();

  await playwrightLocators.Legend
    .itemTextPositionOption(page, itemTextPosition)
    .click();

  // Font Color
  const fontColorInput =
    playwrightLocators.Legend.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput =
    playwrightLocators.Legend.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput =
    playwrightLocators.Legend.fontWeight(page);

  await fontWeightInput.click();

  await playwrightLocators.Legend
    .fontWeightOption(page, fontWeight)
    .click();

  await fontWeightInput.press("Enter");

  // Background Color
   if (backgroundColor) {
  const backgroundColorInput =
    playwrightLocators.Legend.backgroundColor(page);

  await backgroundColorInput.click();
  await backgroundColorInput.press("ControlOrMeta+a");
  await backgroundColorInput.fill(backgroundColor);
  await backgroundColorInput.press("Enter");}
}
export async function setTooltipProperties(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string,
  color: string
) {
  // Tooltip Enabled
  await playwrightLocators.Tooltip.enabled(page).click();

  // Font Color
  const fontColorInput =
    playwrightLocators.Tooltip.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput =
    playwrightLocators.Tooltip.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput =
    playwrightLocators.Tooltip.fontWeight(page);

  await fontWeightInput.click();

  await playwrightLocators.Tooltip
    .fontWeightOption(page, fontWeight)
    .click();

  await fontWeightInput.press("Enter");

  // Tooltip Background Color
  const colorInput =
    playwrightLocators.Tooltip.color(page);

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
  fontWeight: string
) {
  // X-Axis Title Text
  const textInput =
    playwrightLocators.XAxisTitle.text(page);

  await textInput.click();
  await textInput.fill(text);
  await textInput.press("Enter");

  // Font Color
  const fontColorInput =
    playwrightLocators.XAxisTitle.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput =
    playwrightLocators.XAxisTitle.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

 
  // Font Weight
  const fontWeightInput =
    playwrightLocators.XAxisTitle.fontWeight(page);

  await fontWeightInput.click();
  await playwrightLocators.XAxisTitle
    .fontWeightOption(page, fontWeight)
    .click();
  await fontWeightInput.press("Enter");


}
export async function setYAxisTitleProperties(
  page: Page,
  text: string,
  fontColor: string,
  fontSize: string,
  fontWeight: string
) {
  // Y-Axis Visible
  // const visibleInput =
  //   playwrightLocators.YAxisTitle.visible(page);

  // await visibleInput.click();

  // Y-Axis Title Text
  const textInput =
    playwrightLocators.YAxisTitle.text(page);

  await textInput.click();
  await textInput.fill(text);
  await textInput.press("Enter");

  // Font Color
  const fontColorInput =
    playwrightLocators.YAxisTitle.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  // Font Size
  const fontSizeInput =
    playwrightLocators.YAxisTitle.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  // Font Weight
  const fontWeightInput =
    playwrightLocators.YAxisTitle.fontWeight(page);

  await fontWeightInput.click();

  await playwrightLocators.YAxisTitle
    .fontWeightOption(page, fontWeight)
    .click();

  await fontWeightInput.press("Enter");
}


export async function setXAxisLabelProperties(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string
) {
  await playwrightLocators.XAxisLabel
    .visible(page)
    .click();
 await playwrightLocators.XAxisLabel
    .visible(page)
    .click();

  const fontColorInput =
    playwrightLocators.XAxisLabel.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  const fontSizeInput =
    playwrightLocators.XAxisLabel.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  const fontWeightInput =
    playwrightLocators.XAxisLabel.fontWeight(page);

  await fontWeightInput.click();

  await playwrightLocators.XAxisLabel
    .fontWeightOption(page, fontWeight)
    .click();

  await fontWeightInput.press("Enter");
}


export async function setYAxisLabelProperties(
  page: Page,
  fontColor: string,
  fontSize: string,
  fontWeight: string
) {
  await playwrightLocators.YAxisLabel
    .visible(page)
    .click();
 await playwrightLocators.YAxisLabel
    .visible(page)
    .click();

  const fontColorInput =
    playwrightLocators.YAxisLabel.fontColor(page);

  await fontColorInput.click();
  await fontColorInput.press("ControlOrMeta+a");
  await fontColorInput.fill(fontColor);
  await fontColorInput.press("Enter");

  const fontSizeInput =
    playwrightLocators.YAxisLabel.fontSize(page);

  await fontSizeInput.click();
  await fontSizeInput.press("ControlOrMeta+a");
  await fontSizeInput.fill(fontSize);
  await fontSizeInput.press("Enter");

  const fontWeightInput =
    playwrightLocators.YAxisLabel.fontWeight(page);

  await fontWeightInput.click();

  await playwrightLocators.YAxisLabel
    .fontWeightOption(page, fontWeight)
    .click();

  await fontWeightInput.press("Enter");
}
export async function setXAxisTickProperties(
  page: Page,
  color: string
) {
 
  const colorInput =
    playwrightLocators.XAxisTick.color(page);

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setYAxisTickProperties(
  page: Page,
  color: string
) {
 

  const colorInput =
    playwrightLocators.YAxisTick.color(page);

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setXAxisGridProperties(
  page: Page,
  color: string
) {
  await playwrightLocators.XAxisGrid
    .visible(page)
    .click();

  const colorInput =
    playwrightLocators.XAxisGrid.color(page);

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setYAxisGridProperties(
  page: Page,
  color: string
) {
  await playwrightLocators.YAxisGrid
    .visible(page)
    .click();

  const colorInput =
    playwrightLocators.YAxisGrid.color(page);

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}
export async function setMinorGridProperties(
  page: Page,
  color: string
) {
  await playwrightLocators.MinorGrid
    .visible(page)
    .click();

  const colorInput =
    playwrightLocators.MinorGrid.color(page);

  await colorInput.click();
  await colorInput.press("ControlOrMeta+a");
  await colorInput.fill(color);
  await colorInput.press("Enter");
}

export async function setActionsProperties(
  page: Page,
  dashboardName: string
) {
   const settingTypeInput = ActionLocators.clickSettingTypeInput(page);

  // Verify Action setting type input exists
  if ((await settingTypeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mi-widget-settings-click-setting-type' or 'prop-label-mi-widget-settings-click-setting-type' for Action setting type input not found.",
    );
  }
  // Click Action setting type
  await ActionLocators
    .clickSettingType(page)
    .click();

  // Open setting type dropdown
  await ActionLocators
    .clickSettingTypeInput(page)
    .click();

  // Select Link To
  await page.getByText("Link To", { exact: true }).click();

  // Confirm selection
  await ActionLocators
    .clickSettingTypeInput(page)
    .press("Enter");

  // Open dashboard selection
  await page
    .getByRole("button", { name: "preferences" })
    .click();

  // Select dashboard
  await page
    .getByText(dashboardName, { exact: true })
    .click();

  // Save Action settings
  await page
    .getByRole("button", { name: "Save", exact: true })
    .click();

  // Wait until Action dialog closes
  await expect(
    page.getByRole("dialog")
  ).toBeHidden();
}

export async function setActionsToNone(
  page: Page

) {
   const settingTypeInput = ActionLocators.clickSettingTypeInput(page);

  // Verify Action setting type input exists
  if ((await settingTypeInput.count()) === 0) {
    throw new Error(
      "Test ID 'prop-input-mi-widget-settings-click-setting-type' or 'prop-label-mi-widget-settings-click-setting-type' for Action setting type input not found.",
    );
  }
  // Click Action setting type
  await ActionLocators
    .clickSettingType(page)
    .click();

  // Open setting type dropdown
  await ActionLocators
    .clickSettingTypeInput(page)
    .click();

  // Select Link To
  await page.getByText("None", { exact: true }).click();

  
}
export async function setColorTheme(
  page: Page,
  palette: string,
) {
  await ColorThemeLocators.paletteLabel(page).click();

  const paletteInput = ColorThemeLocators.palette(page);
  await paletteInput.click();

  await ColorThemeLocators.paletteOption(page, palette).click();
}

export async function setRunTimeFilter(
  page: Page,

) {
 // await RunTimeFilterLocators.runTimeFilter(page).click();
   const runTimeFilter = RunTimeFilterLocators.runTimeFilter(page);

  if ((await runTimeFilter.count()) === 0) {
    throw new Error(
      'Test ID prop-input-common-runtime-filter-required not found.',
    );
  }

  const isChecked =
    (await runTimeFilter.getAttribute("aria-checked")) === "true";

  if (!isChecked) {
    await runTimeFilter.click();
  }
}


export async function setSeriesType(
  page: Page,
  seriesType: string,
) {
 
  await GeneralSettingsLocators.seriesTypeInput(page).click();
  await page.getByText(seriesType, { exact: true }).click();
}

export async function setWidgetWidth(
  page: Page,
  widthInput: string,
) {
  
  const widgetWidthInput =
    GeneralSettingsLocators.widgetWidthInput(page);

  await widgetWidthInput.click();
  await widgetWidthInput.press("ControlOrMeta+a");
  await widgetWidthInput.fill(widthInput);
  await widgetWidthInput.press("Enter");
}


export async function setGradient(
  page: Page,
) {
  await GeneralSettingsLocators.gradientLabel(page).click();
  await GeneralSettingsLocators.gradientInput(page).click();
}

export async function setRotated(
  page: Page,
) {
  await GeneralSettingsLocators.rotatedLabel(page).click();
  await GeneralSettingsLocators.rotatedInput(page).click();
}

export async function setMaxInstantaneousPoints(
  page: Page,
  value: string,
) {
  await GeneralSettingsLocators.maxInstantaneousPointsLabel(page).click();

  const maxPointsInput =
    GeneralSettingsLocators.maxInstantaneousPointsInput(page);

  await maxPointsInput.click();
  await maxPointsInput.press("ControlOrMeta+a");
  await maxPointsInput.fill(value);
  await maxPointsInput.press("Enter");
}

/// GAUGE RELATED COMMON PROPERTIES

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

        await page
            .getByText(options.type, { exact: true })
            .click();
    }

    // Offset
    if (options.offset !== undefined) {
        await GaugeValueIndicatorLocators.offsetLabel(page).click();

        const offsetInput =
            GaugeValueIndicatorLocators.offsetInput(page);

        await offsetInput.click();
        await offsetInput.press("ControlOrMeta+a");
        await offsetInput.fill(options.offset);
        await offsetInput.press("Enter");
    }

    // Size
    if (options.size !== undefined) {
        await GaugeValueIndicatorLocators.sizeLabel(page).click();

        const sizeInput =
            GaugeValueIndicatorLocators.sizeInput(page);

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

  await ScaleLabelLocators
    .labelFontWeightOption(page, fontWeight)
    .click();

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

        const visibleInput =
            ScaleMinorTickLocators.scaleMinorTickVisible(page);

        if ((await visibleInput.isChecked()) !== options.visible) {
            await visibleInput.click();
        }
    }

    // Color
    if (options.color !== undefined) {
        await ScaleMinorTickLocators.scaleMinorTickColorLabel(page).click();

        const colorInput =
            ScaleMinorTickLocators.scaleMinorTickColor(page);

        await colorInput.click();
        await colorInput.press("ControlOrMeta+a");
        await colorInput.fill(options.color);
        await colorInput.press("Enter");
    }

    // Width
    if (options.width !== undefined) {
        await ScaleMinorTickLocators.scaleMinorTickWidthLabel(page).click();

        const widthInput =
            ScaleMinorTickLocators.scaleMinorTickWidth(page);

        await widthInput.click();
        await widthInput.press("ControlOrMeta+a");
        await widthInput.fill(options.width);
        await widthInput.press("Enter");
    }

    // Length
    if (options.length !== undefined) {
        await ScaleMinorTickLocators.scaleMinorTickLengthLabel(page).click();

        const lengthInput =
            ScaleMinorTickLocators.scaleMinorTickLength(page);

        await lengthInput.click();
        await lengthInput.press("ControlOrMeta+a");
        await lengthInput.fill(options.length);
        await lengthInput.press("Enter");
    }

    // Interval
    if (options.interval !== undefined) {
        await ScaleMinorTickLocators.scaleMinorTickIntervalLabel(page).click();

        const intervalInput =
            ScaleMinorTickLocators.scaleMinorTickInterval(page);

        await intervalInput.click();
        await intervalInput.press("ControlOrMeta+a");
        await intervalInput.fill(options.interval);
        await intervalInput.press("Enter");
    }
}



export async function setGaugeRangeWidth(
    page: Page,
    rangeWidth: number,
) {
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
export async function deleteGaugeRange(
    page: Page,
    index: number,
) {
    // Select range
    await RangeContainerLocators.rangeItem(page, index).click();

    // Delete Range
    await RangeContainerLocators.rangeDelete(page).click();

    // Confirm deletion
    await page.getByText('Confirm Range Deletion').click();
  await page.getByRole('button', { name: 'Delete' }).click();
}
