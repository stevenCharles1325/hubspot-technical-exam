import axios from 'axios';

const IContactAPI = axios.create({
    baseURL: process.env.ICONTACT_API_URL,
    headers: {
        'Accept': 'application/json',
        'API-AppId': process.env.ICONTACT_APP_ID,
        'API-Password': process.env.ICONTACT_PASSWORD,
        'API-Username': process.env.ICONTACT_EMAIL,
        'API-Version': '2.2',
        'Content-Type': 'application/json',
        'Except': '',
    }
});

export default IContactAPI;