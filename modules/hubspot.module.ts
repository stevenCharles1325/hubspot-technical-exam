import { HUBSOT_ACCESS_TOKEN } from "@Config/integration.config";
import { Client } from "@hubspot/api-client";

// Access Token could be in the .env file but to make it simple I just left it here.
const hubspotClient = new Client({
    accessToken: HUBSOT_ACCESS_TOKEN,
});

export default hubspotClient;