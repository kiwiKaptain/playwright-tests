import { Page } from "@playwright/test";

export async function addDataPointsInFavouriteDataPoints(page: Page) {

  // Click Favourite Data Points button
  await page.getByTestId("toolbar-favourite-button").click();

  // Open Selected Data Points
  await page.getByText("Selected Data Points").click();

  // Remove all existing selected data points
 // await page.getByRole("button", { name: "Remove all" }).click();
// Remove all existing selected data points if the button is enabled
const removeAllButton = page.getByRole("button", {
  name: "Remove all",
});

if (
  (await removeAllButton.count()) > 0 &&
  (await removeAllButton.isEnabled())
) {
  await removeAllButton.click();
}
  // Navigate to Plant → DB → BatchData
  await page.getByText("Plant").click();
  await page.getByText("DB").click();
  await page.getByText("BatchData").click();

  // Add required data points
 await page.getByText("Humidity").click();
  await page.getByText("Pressure").first().click();
  //await page.getByText("pH").first().click();
 // await page.getByText("Temperature").first().click();
 
  
  await page.locator('.space-y-2 > div:nth-child(7)').first().click();
 
  

//await temperature.click();

  // Save selected data points
  await page.getByRole("button", { name: "Save" }).click();

}


export async function attachDataPointsToWidget(page: Page) {


await page.locator(".widget-interaction-shield").click();
    await page.getByTestId('panel-tab-datasource').click();

    await page.getByTestId('favourite-add-btn-Pressure').click();
await page.getByTestId('selected-dp-filter-Pressure').click();
  await page.getByTestId('attach-filter-modal').click();
    await page.getByTestId('attach-filter-tab-dynamic').click();
    await page.getByTestId('attach-filter-item-BatchFilter').click();
    await page.getByTestId('attach-filter-save-btn').click();

    await page.getByTestId('favourite-add-btn-Temperature').click();
    await page.getByTestId('selected-dp-filter-Temperature').click();
    await page.getByTestId('attach-filter-modal').click();
    await page.getByTestId('attach-filter-tab-dynamic').click();
    await page.getByTestId('attach-filter-item-BatchFilter').getByTestId('attach-filter-item-name').click();
    await page.getByTestId('attach-filter-save-btn').click();
    await page.getByTestId('selected-datapoints-close-btn').click();

await page.getByTestId('panel-tab-properties').click();



}

export async function attachSingleDataPointToWidget(page: Page) {


await page.locator(".widget-interaction-shield").click();
    await page.getByTestId('panel-tab-datasource').click();

    await page.getByTestId('favourite-add-btn-Pressure').click();
await page.getByTestId('selected-dp-filter-Pressure').click();
  await page.getByTestId('attach-filter-modal').click();
    await page.getByTestId('attach-filter-tab-dynamic').click();
    await page.getByTestId('attach-filter-item-BatchFilter').click();
    await page.getByTestId('attach-filter-save-btn').click();

    await page.getByTestId('selected-datapoints-close-btn').click();

await page.getByTestId('panel-tab-properties').click();



}
