import hubspotClient from "@Module/hubspot.module";

interface IContact {
    email: string;
    firstname: string;
    lastname: string;
}

async function createContact (contact: IContact) {
    const {
        email = '',
        firstname = '',
        lastname = ''
    } = contact;

    const missingValues = [];

    if (!email?.length) missingValues.push('Email');
    if (!firstname?.length) missingValues.push('Firstname');
    if (!lastname?.length) missingValues.push('Lastname');

	if (missingValues.length) {
        throw new Error (
            `Field(s) ${
                missingValues.join(', ')
            } is/are required`
        );
    }

    const newContact = await hubspotClient.crm.contacts.basicApi.create({
        properties: { ...contact },
        associations: []
    });

    console.log('Successfully created new contact');
    console.log(newContact);

    return newContact;
}

// [Warning] This might be created already!
// createContact({
//     email: 'charles.sample@testing.com',
//     firstname: 'Steven Charles',
//     lastname: 'Palabyab'
// });

/* 
    Actual Output:
        Successfully created new contact
        SimplePublicObject {
            id: '451',
            properties: {
                createdate: '2024-02-11T13:56:58.848Z',
                email: 'charles.sample@testing.com',
                firstname: 'Steven Charles',
                hs_all_contact_vids: '451',
                hs_email_domain: 'testing.com',
                hs_is_contact: 'true',
                hs_is_unworked: 'true',
                hs_lifecyclestage_lead_date: '2024-02-11T13:56:58.848Z',
                hs_marketable_status: 'false',
                hs_marketable_until_renewal: 'false',
                hs_object_id: '451',
                hs_object_source: 'INTEGRATION',
                hs_object_source_id: '2823563',
                hs_object_source_label: 'INTEGRATION',
                hs_pipeline: 'contacts-lifecycle-pipeline',
                lastmodifieddate: '2024-02-11T13:56:58.848Z',
                lastname: 'Palabyab',
                lifecyclestage: 'lead'
            },
            createdAt: 2024-02-11T13:56:58.848Z,
            updatedAt: 2024-02-11T13:56:58.848Z,
            archived: false
        }
*/

export default createContact;