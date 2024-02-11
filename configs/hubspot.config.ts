import { Client } from "@hubspot/api-client";

// Access Token could be in the .env file but to make it simple I just left it here.
const hubspotClient = new Client({
    accessToken: 'pat-na1-04aa2c44-a39c-4355-94b2-889cfd1efbbf'
});

export default hubspotClient;