import hubspotClient from "@Module/hubspot.module";
import { PublicObjectSearchRequest } from "@hubspot/api-client/lib/codegen/crm/companies";

async function getContactByLastname (lastname: string | null = null) {
    if (!lastname) throw new Error('Lastname is required');

    const publicObjectSearchRequest: PublicObjectSearchRequest = {
        filterGroups: [
            {
                filters: [
                    {
                        propertyName: 'lastname',
                        operator: 'EQ',
                        value: lastname,
                    }
                ] 
            }
        ],
        properties: ['lastname'],
        sorts: [],
        limit: 100,
        after: 0,
    };

    const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
    const { total } = response;

    console.log(`Total contacts with lastname "${lastname}" count: `, total);
    return total;
}

export default getContactByLastname;