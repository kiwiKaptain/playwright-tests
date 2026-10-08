import { Page } from "@playwright/test";

export const logsLocators = {
    loadingAlert: (page: Page) =>
        page.getByRole("alert", { name: "Loading..." }),
    monitoringTab: (page: Page) => page.getByText("Monitoring"),
    auditLogsTab: (page: Page) => page.getByText("Audit Logs"),
    driverErrorLogsTab: (page: Page) => page.getByText("Driver Error Logs"),

    // Search by Timestamp
    dateColumn: (page: Page) =>
        page.getByRole("combobox", { name: "Filter cell" }),

    dateSelectButton: (page: Page) =>
        page.getByRole("button", { name: "Select", exact: true }),
    monthSelectButton: (page: Page) =>
        page.getByRole("button", { name: /Month selection$/ }),
    yearSelectButton: (page: Page) =>
        page.getByRole("button", { name: "Year selection" }),
    decadeSelectButton: (page: Page) =>
        page.getByRole("button", { name: "-2029. Decade selection" }),

    setDecade: (page: Page, decade: string) => page.getByText(decade),
    setYear: (page: Page, year: string) =>
        page.getByText(year, { exact: true }),
    setMonth: (page: Page, month: string, year: string) =>
        page
            .getByLabel(`${month} ${year}`)
            .getByText(month.substring(0, 3), { exact: true }),
    setDay: (page: Page, month: string, day: string) =>
        page
            .getByLabel(new RegExp(`Monday, ${month} ${day},`))
            .getByText(day, { exact: true }),

    // Search by Action
    actionColumn: (page: Page) =>
        page.getByRole("textbox", {
            name: "Filter cell",
            description: "Column Action",
            exact: true,
        }),

    // Search by Action Taken By
    actionTakenByColumn: (page: Page) =>
        page.getByRole("textbox", {
            name: "Filter cell",
            description: "Column Action Taken By",
            exact: true,
        }),

    // Search by Connection Name
    connectionNameColumn: (page: Page) =>
        page.getByRole("textbox", {
            name: "Filter cell",
            description: "Column Connection Name",
            exact: true,
        }),

    // Search by Connection Name
    errorColumn: (page: Page) =>
        page.getByRole("textbox", {
            name: "Filter cell",
            description: "Column Error",
            exact: true,
        }),

    // Search by Details
    detailsColumn: (page: Page) =>
        page.getByRole("textbox", {
            name: "Filter cell",
            description: "Column Details",
            exact: true,
        }),
};
