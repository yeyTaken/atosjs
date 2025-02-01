import { Gift } from "./gifts";

export interface dbHandler {
    set: (key: string, value: any) => Promise<any>;
    get: (key: string) => Promise<Gift | null>;
    delete: (key: string) => Promise<any>;
}
