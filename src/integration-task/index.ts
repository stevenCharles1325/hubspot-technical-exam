import 'dotenv/config';

import http from 'http';
import ngrok from 'ngrok';
import { IWebhookMessage } from './types';
import { NGROK_AUTH_TOKEN, PORT } from '@Config/integration.config';
import IContactAPI from '@Module/icontact.module';
import createContact from 'src/programming-challenges/create.contact.hubspot';

let webhookId: number | null = null;

/* ==============================================
   I want to create a webhook on IContact to be
   able to listen for `contact_create` event.

   Having said that, I need to provide IContact
   with a url running on the local device, which
   is only possible if we create tunnel using
   `ngrok`.
   ==============================================
*/
const handleOnStart = async () => {
    try {
        // Creating the url that connects to localhost:8080
        const url = await ngrok.connect({
            proto: 'http',
            addr: PORT,
            authtoken: NGROK_AUTH_TOKEN,
        });
        
        const webHooks = [
            {
                eventId: "contact_created",
                url,
            }
        ];

        const res = await IContactAPI.post('/webhooks', webHooks);
        const { webhooks } = res.data;

        // Saving the created webhook for
        webhookId = webhooks[0]?.webhookId;
    } catch (err) {
        console.log('START ERROR: ', err);
    }

    console.log('LISTENING ON CONTACT CREATION EVENT [WEBHOOK ID]: ', webhookId);
}


/* ==============================================
   When the app exits I want to be able to delete
   the created webhook as the link will no longer
   exist.
   ==============================================
*/
const handleOnExit = async () => {
    try {
        // Destroy the url from ngrok
        await ngrok.kill();

        // Delete the created webhook
        if (webhookId) {
            console.log('DELETING ICONNECT WEBHOOK WITH ID: ', webhookId)
            await IContactAPI.delete(`/webhooks/${webhookId}`);
        }
    } catch (err) {
        console.log('EXIT ERROR: ', err);
    } finally {
        process.exit(0);
    }
}

// Sample controller
const controller = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    // Getting the body chunk from the request.
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });

    // Getting the whole request body (Must listen to end event to know the body is complete).
    req.on('end', async () => {
        const requestBody: IWebhookMessage[] = JSON.parse(data);
        const { contact } = requestBody[0];

        // Create the contact to Hubspot
        await createContact({
            email: contact.email,
            firstname: contact.firstName,
            lastname: contact.lastName,
        });
    });
}

const server = http.createServer(controller);

// Starting server and creating the webhook
server.listen(PORT, handleOnStart);

// Removing the webhook
process.on('SIGINT', handleOnExit);