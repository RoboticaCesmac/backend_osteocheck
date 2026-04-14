import { IEncrypt } from "./encrypt.interface";
export declare class Encrypt implements IEncrypt {
    compare: (input: string, hashInput: string) => boolean;
    encrypt: (input: string) => null | string;
}
