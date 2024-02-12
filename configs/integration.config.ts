import 'dotenv/config';

export const PORT = process.env.APP_PORT as unknown as number;
export const NGROK_AUTH_TOKEN = process.env.NGROK_AUTH_TOKEN as string;
export const HUBSOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN as string;