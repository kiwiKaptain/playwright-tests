import { test, expect } from "@playwright/test";
import {
    getDrivers,
    getTestProperties,
} from "../helpers/xml-properties.helpers";

test("Modbus connection", async ({ request }) => {
    const tokenResponse = await request.post(
        "http://192.168.1.99:8080/api/token/generate",
        {
            data: {
                username: process.env.TEST_USERNAME!,
                password: process.env.TEST_PASSWORD!,
                provider: "local",
            },
        },
    );

    console.log("Status:", tokenResponse.status());
    console.log("Status text:", tokenResponse.statusText());

    const responseBody = await tokenResponse.text();
    console.log("Response:", responseBody);

    if (!tokenResponse.ok()) {
        throw new Error(
            `Token API failed: ${tokenResponse.status()} ${responseBody}`,
        );
    }

    const tokenData = await tokenResponse.json();

    console.log("Token response:", tokenData);

    const token = tokenData.access_Token;

    if (!token) {
        throw new Error(
            "Bearer token was not returned by the authentication API",
        );
    }

    const drivers: string[] = await getDrivers(request, token);

    for (let driver of drivers) {
        console.log("Driver: ", driver);
        const properties = await getTestProperties(request, driver, token);

        console.log("Drivers", drivers);
        console.log("Properties:", properties);
        console.table(properties);
        console.log(
            "Driver Properties:\n",
            JSON.stringify(properties, null, 2),
        );
    }
});
