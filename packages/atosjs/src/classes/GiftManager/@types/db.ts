import { Gift } from './gifts';

export interface dbHandler {
  set: (key: string, value: unknown) => Promise<unknown>;
  get: (key: string) => Promise<Gift | null>;
  delete: (key: string) => Promise<unknown>;
}
