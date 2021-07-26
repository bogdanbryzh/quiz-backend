import { config } from 'dotenv';
config();

const { MONGODB_ADMIN, MONGODB_PASSWORD, MONGODB_DATABASE } = process.env;

export const MONGODB_URI = `mongodb+srv://${MONGODB_ADMIN}:${MONGODB_PASSWORD}@clusterzero.q6us3.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;
