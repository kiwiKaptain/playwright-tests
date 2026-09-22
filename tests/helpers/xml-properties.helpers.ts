import { APIRequestContext } from "@playwright/test";
import { parseStringPromise } from "xml2js";

const API_URL = `http://192.168.1.99:8080/api`;
const IGNORED_DRIVERS = new Set(["EXPRESSION_BUILDER", "INTERNAL_DRIVER"]);

type DriverProperty = {
    $: {
        Name: string;
        Value?: string;
    };
};

type DriverGroup = {
    Property?: DriverProperty[];
};

type DriverSection = {
    Group?: DriverGroup[];
};

type DriverTemplateResponse = {
    DriverSection?: DriverSection;
};

export async function getDrivers(
    request: APIRequestContext,
    token: string,
): Promise<string[]> {
    const response = await request.get(`${API_URL}/drivers`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok()) {
        throw new Error(
            `Failed to get drivers: ${response.status()} ${response.statusText()}`,
        );
    }

    const drivers: string[] = await response.json();

    return drivers.filter((driver) => !IGNORED_DRIVERS.has(driver));
}

export async function getTestProperties(
    request: APIRequestContext,
    driver: string,
    token: string,
): Promise<Record<string, string>> {
    const response = await request.get(
        `${API_URL}/connections/driver-template/${encodeURIComponent(driver)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok()) {
        throw new Error(
            `Failed to get test properties for ${driver}: ${response.status()} ${response.statusText()}`,
        );
    }

    const xml = await response.text();
    const result = (await parseStringPromise(xml)) as DriverTemplateResponse;

    const properties: DriverProperty[] =
        result.DriverSection?.Group?.flatMap((group) => group.Property ?? []) ??
        [];

    return Object.fromEntries(
        properties.map(({ $: { Name, Value } }) => [Name, Value ?? ""]),
    );
}
