import { IEncrypt } from "./encrypt.interface";
import bcrypt from "bcrypt";

export class Encrypt implements IEncrypt {
  compare = (input: string, hashInput: string): boolean => {
    if (!input || !hashInput) {
      return false;
    }
    return bcrypt.compareSync(input, hashInput);
  };

  encrypt = (input: string): null | string => {
    if (!input) {
      return null;
    }
    return bcrypt.hashSync(input, 10);
  };
}
