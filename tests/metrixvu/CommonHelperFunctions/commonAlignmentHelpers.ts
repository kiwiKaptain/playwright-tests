import { test, expect, Page, Locator } from "@playwright/test";

/**
 * Reads the specified numeric attribute (e.g. gs-x, gs-y, gs-w, gs-h)
 * from all widgets matched by the locator and returns the values as a number array.
 */
export async function getWidgetAttributeValues(
  widgets: Locator,
  attr: string,
): Promise<number[]> {
  const count = await widgets.count();
  const values: number[] = [];
  for (let i = 0; i < count; i++) {
    const raw = await widgets.nth(i).getAttribute(attr);
    if (raw) values.push(parseInt(raw));
  }
  return values;
}

/**
 * Verifies that all values in the array are identical.
 */
export function expectAllValuesEqual(values: number[], label: string): void {
  expect(values.length).toBeGreaterThan(0);
  const allEqual = values.every((v) => v === values[0]);
  if (!allEqual) {
    console.error(`Mismatch in ${label}:`, values);
  }
  expect(allEqual).toBe(true);
}

/** Returns the horizontal ("x") or vertical ("y") centre of a widget. */
export async function getCenter(widget: Locator, axis: "x" | "y"): Promise<number> {
  const box = await widget.boundingBox();
  expect(box).not.toBeNull();
  return axis === "x" ? box!.x + box!.width / 2 : box!.y + box!.height / 2;
}


export async function expectWidgetsNotOverlapping(
  widgets: Locator,
): Promise<void> {
  const count = await widgets.count();

  for (let i = 0; i < count; i++) {
    const current = widgets.nth(i);

    const currentX = Number(await current.getAttribute("gs-x"));
    const currentY = Number(await current.getAttribute("gs-y"));
    const currentW = Number(await current.getAttribute("gs-w"));
    const currentH = Number(await current.getAttribute("gs-h"));

    const currentRight = currentX + currentW;
    const currentBottom = currentY + currentH;

    for (let j = i + 1; j < count; j++) {
      const other = widgets.nth(j);

      const otherX = Number(await other.getAttribute("gs-x"));
      const otherY = Number(await other.getAttribute("gs-y"));
      const otherW = Number(await other.getAttribute("gs-w"));
      const otherH = Number(await other.getAttribute("gs-h"));

      const otherRight = otherX + otherW;
      const otherBottom = otherY + otherH;

      const overlaps =
        currentX < otherRight &&
        currentRight > otherX &&
        currentY < otherBottom &&
        currentBottom > otherY;

      expect(
        overlaps,
        `Widgets ${i + 1} and ${j + 1} are overlapping`,
      ).toBe(false);
    }
  }
}