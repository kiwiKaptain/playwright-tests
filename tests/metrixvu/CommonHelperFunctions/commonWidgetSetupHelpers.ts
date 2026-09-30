// import { test, expect, Page, Locator } from "@playwright/test";
// import { setTitleProperties } from "./commonPropertiesHelpers";
// import { dragAndDropWidget } from "./commonDragDropHelpers";
// type DragAndDropFunction = (
//   page: Page,
//   widgetType: string,
// ) => Promise<void>;

// // --- WIDGET LOCATOR HELPER ---
// export async function getDroppedWidgetByUuid(
//   page: Page,
//   widgetType: string,
// ): Promise<Locator> {

//   const widgets = page.locator(
//     `.grid-stack [data-widget-type="${widgetType}"]`,
//   );
//     await expect(widgets.last()).toBeVisible({
//     timeout: 10000,
//   });
//   const widgetUuid = await page
//     .locator(`.grid-stack [data-widget-type="${widgetType}"]`)
//     .last()
//     .getAttribute("data-widget-uuid");
//     if (!widgetUuid) {
//     throw new Error(
//       `Dropped ${widgetType} does not have data-widget-uuid.`,
//     );
//   }
//   return page.locator(`.grid-stack [data-widget-uuid="${widgetUuid}"]`);
// }

// export async function resizeWidget(
//   page: Page,
//   widget: Locator,
//   resizeHandle: Locator,
//   widthIncrease: number = 10,
//   heightIncrease: number = 10,
// ) {
//   const beforeBox = await widget.boundingBox();

//   if (!beforeBox) {
//     throw new Error("Unable to get widget dimensions before resize.");
//   }

//   await resizeHandle.scrollIntoViewIfNeeded();

//   await page.waitForTimeout(300);

//   const handleBox = await resizeHandle.boundingBox();

//   if (!handleBox) {
//     throw new Error("Unable to locate resize handle.");
//   }

//   const startX = handleBox.x + handleBox.width / 2;
//   const startY = handleBox.y + handleBox.height / 2;

//   await page.mouse.move(startX, startY);

//   await page.mouse.down();

//   await page.mouse.move(
//     startX + widthIncrease,
//     startY + heightIncrease,
//     { steps: 20 },
//   );

//   await page.mouse.up();

//   await page.waitForTimeout(300);

//   const afterBox = await widget.boundingBox();

//   if (!afterBox) {
//     throw new Error("Unable to get widget dimensions after resize.");
//   }


// }

// export async function selectWidgetsOnCanvas(page: Page, uuids: string[]) {

//   const gridStack = page.locator(".grid-stack");
//   await gridStack.click();
//   await page.keyboard.press("ControlOrMeta+A");
// }
// export async function getAllWidgetUuids(
//   page: Page,
//   widgetType: string
// ): Promise<string[]> {
//   const widgets = page.locator(
//     `.grid-stack [data-widget-type="${widgetType}"]`
//   );

//   const count = await widgets.count();
//   const uuids: string[] = [];

//   for (let i = 0; i < count; i++) {
//     const uuid = await widgets
//       .nth(i)
//       .getAttribute("data-widget-uuid");

//     if (uuid) {
//       uuids.push(uuid);
//     }
//   }

//   return uuids;
// }

// export async function setupWidgets(
//   page: Page,
//   widgetType: string,
//   numberOfWidgets: number = 2,
//   dragAndDropFunction: DragAndDropFunction = dragAndDropWidget,
//     resizeEnabled: boolean = true,
// ): Promise<{ widget: Locator; uuids: string[] }> {
//   const widgetUuids: string[] = [];

//   const titleWidgetTypes = [
//     "mi-area-chart",
//     "mi-bar-chart",
//     "mi-line-chart",
//   ];

//   const buttonWidgetTypes = ["mi-button"];
//   const cardWidgetTypes = ["mi-card"];
//    const imageWidgetTypes = ["mi-image"];

//   const widgetSizes = [
//     { width: 70, height: 30 },
//     { width: 5, height: 5 },
//     { width: 5, height: 20 },
//   ];
// // Different images for each widget
//   const widgetImages = [
//     "test-data/sample1.jpg",
//     "test-data/sample2.png",
//     "test-data/sample3.jpeg"
//   ];
//   // Different background colors for each widget
//   const widgetColors = [
//     "rgb(229, 214, 73)",
//     "rgb(94, 145, 247)",
//     "rgb(19, 240, 174)"
//   ];
//   for (let i = 0; i < numberOfWidgets; i++) {
//     // Drag widget using the required layout function
//     await dragAndDropFunction(page, widgetType);

//     // Get newly dropped widget
//     const droppedWidget = await getDroppedWidgetByUuid(
//       page,
//       widgetType,
//     );

//     // Store UUID
//     const uuid = await droppedWidget.getAttribute(
//       "data-widget-uuid",
//     );

//     if (uuid) {
//       widgetUuids.push(uuid);
//     }

//     // Wait for widget
//     await droppedWidget.waitFor({
//       state: "visible",
//       timeout: 10000,
//     });

//     await droppedWidget.click();
//     await page.waitForTimeout(300);
//     if(resizeEnabled) {
//     // Resize widget
//     const resizeHandle = droppedWidget.locator(
//       ".ui-resizable-se",
//     );

//     await resizeHandle.waitFor({
//       state: "visible",
//       timeout: 10000,
//     });

//     const size = widgetSizes[i];

//     if (!size) {
//       throw new Error(
//         `No widget size configured for widget ${i + 1}`,
//       );
//     }

//     await resizeWidget(
//       page,
//       droppedWidget,
//       resizeHandle,
//       size.width,
//       size.height,
//     );
  
//   }

//     // Chart widgets
//     if (titleWidgetTypes.includes(widgetType)) {
//       await setTitleProperties(
//         page,
//         `Widget ${i + 1}`,
//         "rgb(36, 32, 232)",
//         "24",
//         "500",
//         "top",
//         "left",
//       );
//     }

//     // Button widget
//     if (buttonWidgetTypes.includes(widgetType)) {
//       await page.getByTestId("prop-label-text").click();

//       const textInput = page.getByTestId("prop-input-text");

//       await textInput.click();
//       await textInput.press("ControlOrMeta+a");
//       await textInput.fill(` ${i + 1}`);
//       await textInput.press("Enter");

//       await page
//         .getByTestId(
//           "prop-label-mi-widget-settings-text-color",
//         )
//         .click();

//       const textColorInput = page.getByTestId(
//         "prop-input-mi-widget-settings-text-color",
//       );

//       await textColorInput.click();
//       await textColorInput.press("ControlOrMeta+a");
//       await textColorInput.fill("rgb(41, 40, 39)");
//       await textColorInput.press("Enter");
//     }

//     // Card widget
//     if (cardWidgetTypes.includes(widgetType)) {
//       await page.getByTestId("prop-label-title-text").click();

//       const titleInput = page.getByTestId(
//         "prop-input-title-text",
//       );

//       await titleInput.click();
//       await titleInput.press("ControlOrMeta+a");
//       await titleInput.fill(`Widget ${i + 1}`);

//       await page.waitForTimeout(200);

//       const borderWidthInput = page.getByTestId(
//         "prop-input-border-width",
//       );

//       await borderWidthInput.click();
//       await borderWidthInput.press("ControlOrMeta+a");
//       await borderWidthInput.fill("3");

//       await page.getByTestId("prop-label-border-color").click();

//       const borderColorInput = page.getByTestId(
//         "prop-input-border-color",
//       );

//       await borderColorInput.click();
//       await borderColorInput.press("ControlOrMeta+a");
//       await borderColorInput.fill("rgb(94, 94, 93)");
//       await borderColorInput.press("Enter");
//     }

//      // Image widget
//    if (imageWidgetTypes.includes(widgetType)) {
//   // Upload a different image for each widget
//   await page.locator('input[type="file"]').setInputFiles(widgetImages[i]);
//   await page.waitForTimeout(500);

//   // Set background color
//   await page.getByTestId("prop-label-image-background-color").click();

//   const backgroundColorInput = page.getByTestId(
//     "prop-input-image-background-color",
//   );

//   await backgroundColorInput.click();
//   await backgroundColorInput.press("ControlOrMeta+a");
//   await backgroundColorInput.fill(widgetColors[i]);
//   await backgroundColorInput.press("Enter");

//   await page.waitForTimeout(300);
// }
//   }

//   const widgetLocator = page.locator(
//     `.grid-stack [data-widget-type="${widgetType}"]`,
//   );

//   await expect(widgetLocator).toHaveCount(numberOfWidgets);

//   return {
//     widget: widgetLocator.first(),
//     uuids: widgetUuids,
//   };
// }



import { test, expect, Page, Locator } from "@playwright/test";
import { setTitleProperties } from "./commonPropertiesHelpers";
import { dragAndDropWidget } from "./commonDragDropHelpers";
import { TEST_DATA } from "../testData";
const imagePath = TEST_DATA.app.imagePathUrl;

type DragAndDropFunction = (
  page: Page,
  widgetType: string,
) => Promise<void>;

// --- WIDGET LOCATOR HELPER ---
export async function getDroppedWidgetByUuid(
  page: Page,
  widgetType: string,
): Promise<Locator> {

  const widgets = page.locator(
    `.grid-stack [data-widget-type="${widgetType}"]`,
  );
    await expect(widgets.last()).toBeVisible({
    timeout: 10000,
  });
  const widgetUuid = await page
    .locator(`.grid-stack [data-widget-type="${widgetType}"]`)
    .last()
    .getAttribute("data-widget-uuid");
    if (!widgetUuid) {
    throw new Error(
      `Dropped ${widgetType} does not have data-widget-uuid.`,
    );
  }
  return page.locator(`.grid-stack [data-widget-uuid="${widgetUuid}"]`);
}

export async function resizeWidget(
  page: Page,
  widget: Locator,
  resizeHandle: Locator,
  widthIncrease: number = 10,
  heightIncrease: number = 10,
) {
  const beforeBox = await widget.boundingBox();

  if (!beforeBox) {
    throw new Error("Unable to get widget dimensions before resize.");
  }

  await resizeHandle.scrollIntoViewIfNeeded();

  await page.waitForTimeout(300);

  const handleBox = await resizeHandle.boundingBox();

  if (!handleBox) {
    throw new Error("Unable to locate resize handle.");
  }

  const startX = handleBox.x + handleBox.width / 2;
  const startY = handleBox.y + handleBox.height / 2;

  await page.mouse.move(startX, startY);

  await page.mouse.down();

  await page.mouse.move(
    startX + widthIncrease,
    startY + heightIncrease,
    { steps: 20 },
  );

  await page.mouse.up();

  await page.waitForTimeout(300);

  const afterBox = await widget.boundingBox();

  if (!afterBox) {
    throw new Error("Unable to get widget dimensions after resize.");
  }


}

export async function selectWidgetsOnCanvas(page: Page, uuids: string[]) {

  const gridStack = page.locator(".grid-stack");
  await gridStack.click();
  await page.keyboard.press("ControlOrMeta+A");
}
export async function getAllWidgetUuids(
  page: Page,
  widgetType: string
): Promise<string[]> {
  const widgets = page.locator(
    `.grid-stack [data-widget-type="${widgetType}"]`
  );

  const count = await widgets.count();
  const uuids: string[] = [];

  for (let i = 0; i < count; i++) {
    const uuid = await widgets
      .nth(i)
      .getAttribute("data-widget-uuid");

    if (uuid) {
      uuids.push(uuid);
    }
  }

  return uuids;
}

export async function setupWidgets(
  page: Page,
  widgetType: string,
  numberOfWidgets: number = 2,
  dragAndDropFunction: DragAndDropFunction = dragAndDropWidget,
    resizeEnabled: boolean = true,
): Promise<{ widget: Locator; uuids: string[] }> {
  const widgetUuids: string[] = [];

  const titleWidgetTypes = [
    "mi-area-chart",
    "mi-bar-chart",
    "mi-line-chart",
  ];

  const buttonWidgetTypes = ["mi-button"];
  const cardWidgetTypes = ["mi-card"];
   const imageWidgetTypes = ["mi-image"];

  const widgetSizes = [
    { width: 70, height: 30 },
    { width: 5, height: 5 },
    { width: 5, height: 20 },
  ];
// Different images for each widget
  const widgetImages = [
    `${imagePath}sample1.jpg`,
    `${imagePath}sample2.png`,
    `${imagePath}sample3.jpeg`
  
  ];
  // Different background colors for each widget
  const widgetColors = [
    "rgb(229, 214, 73)",
    "rgb(94, 145, 247)",
    "rgb(19, 240, 174)"
  ];
  for (let i = 0; i < numberOfWidgets; i++) {
    // Drag widget using the required layout function
    await dragAndDropFunction(page, widgetType);

    // Get newly dropped widget
    const droppedWidget = await getDroppedWidgetByUuid(
      page,
      widgetType,
    );

    // Store UUID
    const uuid = await droppedWidget.getAttribute(
      "data-widget-uuid",
    );

    if (uuid) {
      widgetUuids.push(uuid);
    }

    // Wait for widget
    await droppedWidget.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await droppedWidget.click();
    await page.waitForTimeout(300);
    if(resizeEnabled) {
    // Resize widget
    const resizeHandle = droppedWidget.locator(
      ".ui-resizable-se",
    );

    await resizeHandle.waitFor({
      state: "visible",
      timeout: 10000,
    });

    const size = widgetSizes[i];

    if (!size) {
      throw new Error(
        `No widget size configured for widget ${i + 1}`,
      );
    }

    await resizeWidget(
      page,
      droppedWidget,
      resizeHandle,
      size.width,
      size.height,
    );
  
  }

    // Chart widgets
    if (titleWidgetTypes.includes(widgetType)) {
      await setTitleProperties(
        page,
        `Widget ${i + 1}`,
        "rgb(36, 32, 232)",
        "24",
        "500",
        "top",
        "left",
      );
    }

    // Button widget
    if (buttonWidgetTypes.includes(widgetType)) {
      await page.getByTestId("prop-label-text").click();

      const textInput = page.getByTestId("prop-input-text");

      await textInput.click();
      await textInput.press("ControlOrMeta+a");
      await textInput.fill(` ${i + 1}`);
      await textInput.press("Enter");

      await page
        .getByTestId(
          "prop-label-mi-widget-settings-text-color",
        )
        .click();

      const textColorInput = page.getByTestId(
        "prop-input-mi-widget-settings-text-color",
      );

      await textColorInput.click();
      await textColorInput.press("ControlOrMeta+a");
      await textColorInput.fill("rgb(41, 40, 39)");
      await textColorInput.press("Enter");
    }

    // Card widget
    if (cardWidgetTypes.includes(widgetType)) {
      await page.getByTestId("prop-label-title-text").click();

      const titleInput = page.getByTestId(
        "prop-input-title-text",
      );

      await titleInput.click();
      await titleInput.press("ControlOrMeta+a");
      await titleInput.fill(`Widget ${i + 1}`);

      await page.waitForTimeout(200);

      const borderWidthInput = page.getByTestId(
        "prop-input-border-width",
      );

      await borderWidthInput.click();
      await borderWidthInput.press("ControlOrMeta+a");
      await borderWidthInput.fill("3");

      await page.getByTestId("prop-label-border-color").click();

      const borderColorInput = page.getByTestId(
        "prop-input-border-color",
      );

      await borderColorInput.click();
      await borderColorInput.press("ControlOrMeta+a");
      await borderColorInput.fill("rgb(94, 94, 93)");
      await borderColorInput.press("Enter");
    }

     // Image widget
   if (imageWidgetTypes.includes(widgetType)) {
  // Upload a different image for each widget
  await page.locator('input[type="file"]').setInputFiles(widgetImages[i]);
  await page.waitForTimeout(500);

  // Set background color
  await page.getByTestId("prop-label-image-background-color").click();

  const backgroundColorInput = page.getByTestId(
    "prop-input-image-background-color",
  );

  await backgroundColorInput.click();
  await backgroundColorInput.press("ControlOrMeta+a");
  await backgroundColorInput.fill(widgetColors[i]);
  await backgroundColorInput.press("Enter");

  await page.waitForTimeout(300);
}
  }

  const widgetLocator = page.locator(
    `.grid-stack [data-widget-type="${widgetType}"]`,
  );

  await expect(widgetLocator).toHaveCount(numberOfWidgets);

  return {
    widget: widgetLocator.first(),
    uuids: widgetUuids,
  };
}