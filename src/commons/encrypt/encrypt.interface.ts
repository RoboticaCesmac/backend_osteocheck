export interface IEncrypt {
  encrypt: (input: string) => null | string;
  compare: (input: string, hashInput: string) => boolean;
}