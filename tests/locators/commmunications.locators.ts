import { Page } from "@playwright/test";

export const commLocators = {
    loadingAlert: (page: Page) =>
        page.getByRole("alert", { name: "Loading..." }),

    duplicateInstanceAlert: (page: Page) =>
        page
            .getByRole("alert")
            .filter({ hasText: "Instance name already exists" }),

    unsavedChangesAlert: (page: Page) =>
        page.getByRole("heading", { name: "Unsaved Changes" }),

    commsTab: (page: Page) => page.getByText("Communications"),

    getDriverInstance: (page: Page, driverName: string) =>
        page.getByRole("gridcell", { name: driverName }),

    addInstanceButton: (page: Page) =>
        page.getByRole("button", { name: "+ Add Instance" }),

    instanceName: (page: Page) =>
        page.getByRole("textbox", { name: "Column Instance Name" }),

    saveInstanceButton: (page: Page) =>
        page.getByRole("link", { name: "Save" }),

    discardChangesButton: (page: Page) =>
        page.getByTestId("btn-discard-changes"),

    instanceConnectionName: (page: Page) =>
        page
            .getByRole("row", { name: "Connection Name * Unique name" })
            .getByRole("textbox"),

    saveConnectionButton: (page: Page) =>
        page.getByRole("button", { name: "Save" }),

    gotoInstanceTab: (page: Page) =>
        page.getByText("Instance", { exact: true }),

    gotoDriversTab: (page: Page) => page.getByText("Drivers", { exact: true }),
    
    // host, port, username, pass, database name

    // connectionName getByTestId('input-connectionName')
    // databaseType
    // host getByTestId('input-host')
    // authentication getByTestId('select-authentication').getByRole('button', { name: 'Select' })
    // username getByTestId('input-username')
    // password getByTestId('input-password')
    // instanceName getByTestId('select-instanceName').getByRole('button', { name: 'Select' })
    // dbName getByTestId('select-databaseName').getByRole('button', { name: 'Select' })
    // encryption getByTestId('switch-encrypt')
    // trust server cert getByTestId('switch-trustServerCertificate')
    // pollingInterval getByTestId('input-pollingInterval')
};
