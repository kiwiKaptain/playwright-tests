import { test, expect, Page, Locator } from "@playwright/test";
import { setTitleProperties } from "./commonPropertiesHelpers";
//different size diagonally
export async function dragAndDropWidget( 
  page: Page, 
  widgetType: string, 
  columns: number = 3, // Number of columns in your grid 
  cellWidth: number = 250, // Width of each cell 
  cellHeight: number = 150, // Height of each cell 
  gap: number = 10, // Gap between widgets 
): Promise<void> { 
  const cardWidgetSource = page 
    .locator(`.grid-stack-item.cursor-grab[data-widget-type="${widgetType}"]`) 
    .first(); 
  const gridStackTarget = page.locator(".grid-stack"); 
  await expect(cardWidgetSource).toBeVisible(); 
  await expect(gridStackTarget).toBeVisible(); 
 
  // Get count of existing widgets 
  const existingWidgets = await page 
    .locator(".grid-stack .grid-stack-item") 
    .count(); 
   
  // Calculate position based on grid layout 
  const col = existingWidgets % columns; 
  const row = Math.floor(existingWidgets / columns); 
   
  // Calculate fixed positions 
  const x = 100 + col * (cellWidth + gap); 
 
  const y = 50 + existingWidgets * (cellHeight + gap);
  await cardWidgetSource.dragTo(gridStackTarget, { 
    force: true, 
    targetPosition: { x, y }, 
  }); 
 
  const canvasWidgets = page.locator( 
    `.grid-stack [data-widget-type="${widgetType}"]`, 
  ); 
  const initialWidgetCount = await canvasWidgets.count(); 
  const sourceBox = await cardWidgetSource.boundingBox(); 
  const targetBox = await gridStackTarget.boundingBox(); 
  if (!sourceBox || !targetBox) { 
    throw new Error( 
      "Could not calculate bounding coordinates for drag-and-drop mechanics.", 
    ); 
  } 
 
  await page.mouse.move( 
    sourceBox.x + sourceBox.width / 2, 
    sourceBox.y + sourceBox.height / 2, 
  ); 
  await page.mouse.down(); 
  await page.mouse.move(targetBox.x + 20, targetBox.y + 20, { steps: 10 }); 
  await page.mouse.move(targetBox.x + x, targetBox.y + y, { steps: 15 }); 
  await page.mouse.up(); 
  await expect(canvasWidgets).toHaveCount(initialWidgetCount + 1); 
} 
export async function dragAndDropWidgetInDifferentPositions( 
  page: Page, 
  widgetType: string, 
  columns: number = 3, // Number of columns in your grid 
  cellWidth: number = 230, // Width of each cell 
  cellHeight: number = 300, // Height of each cell 
  gap: number = 15, // Gap between widgets 
): Promise<void> { 
  const cardWidgetSource = page 
    .locator(`.grid-stack-item.cursor-grab[data-widget-type="${widgetType}"]`) 
    .first(); 
  const gridStackTarget = page.locator(".grid-stack"); 
  await expect(cardWidgetSource).toBeVisible(); 
  await expect(gridStackTarget).toBeVisible(); 
 
  // Get count of existing widgets 
  const existingWidgets = await page 
    .locator(".grid-stack .grid-stack-item") 
    .count(); 
   
  // Calculate position based on grid layout 
  const col = existingWidgets % columns; 
  const row = Math.floor(existingWidgets / columns); 
   
  // Calculate fixed positions 
  //const x = 300 + col * (cellWidth + gap); 
 const x =
  existingWidgets === 0
    ? 100 + col * (cellWidth + gap)
    : 300 + col * (cellWidth + gap);
  const y = 50 + existingWidgets * (cellHeight + gap);
  await cardWidgetSource.dragTo(gridStackTarget, { 
    force: true, 
    targetPosition: { x, y }, 
  }); 
 
  const canvasWidgets = page.locator( 
    `.grid-stack [data-widget-type="${widgetType}"]`, 
  ); 
  const initialWidgetCount = await canvasWidgets.count(); 
  const sourceBox = await cardWidgetSource.boundingBox(); 
  const targetBox = await gridStackTarget.boundingBox(); 
  if (!sourceBox || !targetBox) { 
    throw new Error( 
      "Could not calculate bounding coordinates for drag-and-drop mechanics.", 
    ); 
  } 
 
  await page.mouse.move( 
    sourceBox.x + sourceBox.width / 2, 
    sourceBox.y + sourceBox.height / 2, 
  ); 
  await page.mouse.down(); 
  await page.mouse.move(targetBox.x + 20, targetBox.y + 20, { steps: 10 }); 
  await page.mouse.move(targetBox.x + x, targetBox.y + y, { steps: 15 }); 
  await page.mouse.up(); 
  await expect(canvasWidgets).toHaveCount(initialWidgetCount + 1); 
} 

// export async function dragAndDropWidgetInSameColumn(
//   page: Page,
//   widgetType: string,
// ): Promise<void> {
//   const cardWidgetSource = page
//     .locator(`.grid-stack-item.cursor-grab[data-widget-type="${widgetType}"]`)
//     .first();
//   const gridStackTarget = page.locator(".grid-stack");
//   await expect(cardWidgetSource).toBeVisible();
//   await expect(gridStackTarget).toBeVisible();

//   // const existingWidgets = await page
//   //   .locator(".grid-stack .grid-stack-item")
//   //   .count();
//   // const cellHeight = 200;
//   // const position = { x: 300, y: 50 + existingWidgets * cellHeight };

//   // Define widget sizes and positions
//   const widgetConfigs: Record<string, { height: number; gap: number; padding: number }> = {
//     'card': { height: 180, gap: 70, padding: 50 },
//     'barchart': { height: 200, gap: 210, padding: 0 },
//      'areachart': { height: 200, gap: 210, padding: 0 },
//     'linechart': { height: 300, gap: 30, padding: 50 },
//   };

//   const config = widgetConfigs[widgetType] || widgetConfigs['card'];
  
//   // Calculate position based on existing widgets
//   const existingWidgets = await page.locator(".grid-stack .grid-stack-item").all();
//   let totalY = config.padding;

//   for (const widget of existingWidgets) {
//     const box = await widget.boundingBox();
//     if (box) {
//       totalY += box.height + config.gap;
//     }
//   }

//   const position = { x: 300, y: totalY };
//   await cardWidgetSource.dragTo(gridStackTarget, {
//     force: true,
//     targetPosition: position,
//   });

//   const canvasWidgets = page.locator(
//     `.grid-stack [data-widget-type="${widgetType}"]`,
//   );
//   const initialWidgetCount = await canvasWidgets.count();
//   const sourceBox = await cardWidgetSource.boundingBox();
//   const targetBox = await gridStackTarget.boundingBox();
//   if (!sourceBox || !targetBox) {
//     throw new Error(
//       "Could not calculate bounding coordinates for drag-and-drop mechanics.",
//     );
//   }

//   await page.mouse.move(
//     sourceBox.x + sourceBox.width / 2,
//     sourceBox.y + sourceBox.height / 2,
//   );
//   await page.mouse.down();
//   await page.mouse.move(targetBox.x + 20, targetBox.y + 20, { steps: 10 });
//   await page.mouse.move(targetBox.x + position.x, targetBox.y + position.y, {
//     steps: 15,
//   });
//   await page.mouse.up();
//   await expect(canvasWidgets).toHaveCount(initialWidgetCount + 1);
// }
export async function dragAndDropWidgetWithTouchingEdges(
  page: Page,
  widgetType: string,
): Promise<void> {
  const cardWidgetSource = page
    .locator(`.grid-stack-item.cursor-grab[data-widget-type="${widgetType}"]`)
    .first();
  const gridStackTarget = page.locator(".grid-stack");
  
  await expect(cardWidgetSource).toBeVisible();
  await expect(gridStackTarget).toBeVisible();

  const existingWidgets = await page
    .locator(".grid-stack .grid-stack-item")
    .count();
  
  // Calculate position to make widgets overlap/touch edges
  // Using same X position (300) and Y position that creates overlap
  const cellHeight = 180;
  // const overlapOffset = 50; // This creates overlap - widgets will be placed on top of each other
  // const overlapOffset =
  // widgetType === "mi-button" ? 10 : 50;
   const overlapOffset =
    widgetType === "mi-button"
      ? 10
      : widgetType === "mi-sparkline"
        ? 10
        : 50;
  const position = { 
    x: 300, 
    y: 50 + existingWidgets * overlapOffset // Smaller offset than cellHeight causes overlap
  };
  
  // Drag and drop with the same method as your working function
  await cardWidgetSource.dragTo(gridStackTarget, {
    force: true,
    targetPosition: position,
  });

  const canvasWidgets = page.locator(
    `.grid-stack [data-widget-type="${widgetType}"]`,
  );
  
  const initialWidgetCount = await canvasWidgets.count();
  const sourceBox = await cardWidgetSource.boundingBox();
  const targetBox = await gridStackTarget.boundingBox();
  
  if (!sourceBox || !targetBox) {
    throw new Error(
      "Could not calculate bounding coordinates for drag-and-drop mechanics.",
    );
  }

  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2,
  );
  
  await page.mouse.down();
  await page.mouse.move(targetBox.x + 20, targetBox.y + 20, { steps: 10 });
  await page.mouse.move(targetBox.x + position.x, targetBox.y + position.y, {
    steps: 15,
  });
  
  await page.mouse.up();
  await expect(canvasWidgets).toHaveCount(initialWidgetCount + 1);
}

export async function dragAndDropWidgetInSameRow(
  page: Page,
  widgetType: string,
): Promise<void> {
  const cardWidgetSource = page
    .locator(
      `.grid-stack-item.cursor-grab[data-widget-type="${widgetType}"]`,
    )
    .first();

  const gridStackTarget = page.locator(".grid-stack");

  await expect(cardWidgetSource).toBeVisible();
  await expect(gridStackTarget).toBeVisible();

  const canvasWidgets = page.locator(
    `.grid-stack [data-widget-type="${widgetType}"]`,
  );

  const initialWidgetCount = await canvasWidgets.count();

  // Keep enough horizontal space between widgets
  const cellWidth = 260;

  const position = {
    x: 100 + initialWidgetCount * cellWidth,
    y: 70,
  };

  const sourceBox = await cardWidgetSource.boundingBox();
  const targetBox = await gridStackTarget.boundingBox();

  if (!sourceBox || !targetBox) {
    throw new Error(
      "Could not calculate bounding coordinates for drag-and-drop mechanics.",
    );
  }

  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2,
  );

  await page.mouse.down();

  await page.mouse.move(
    targetBox.x + 20,
    targetBox.y + 20,
    { steps: 10 },
  );

  await page.mouse.move(
    targetBox.x + position.x,
    targetBox.y + position.y,
    { steps: 20 },
  );

  await page.mouse.up();

  await expect(canvasWidgets).toHaveCount(
    initialWidgetCount + 1,
  );
}
