import hubspotClient from "@Module/hubspot.module";
import { PublicObjectSearchRequest } from "@hubspot/api-client/lib/codegen/crm/companies";

async function getUsers () {
    const publicObjectSearchRequest: PublicObjectSearchRequest = {
        filterGroups: [],
        properties: ['id', 'firstname', 'lastname', 'email'],
        sorts: [],
        limit: 100,
        after: 0,
    };

    const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
    const { results: users } = response;

    console.log(users);
    return users;
}

export default getUsers;