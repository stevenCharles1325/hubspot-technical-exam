export interface IContact {
    email: string;
    firstName: string;
    lastName: string;
}

export type IWebhookMessage = {
    contact: IContact;
}
