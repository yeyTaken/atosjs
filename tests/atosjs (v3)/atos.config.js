import { GiftManager, TimeFormat } from '../../packages/atosjs/dist/index.js';

// TimeFormat
export const time = new TimeFormat();
const uri = "mongodb+srv://rabi:2kVXHwjP5VYmKsbR@cluster0.tpw7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// GiftManager
export const gift = new GiftManager({
    mongodb: {
        connect: uri
    }
});