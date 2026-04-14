"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Encrypt {
    constructor() {
        this.compare = (input, hashInput) => {
            if (!input || !hashInput) {
                return false;
            }
            return bcrypt_1.default.compareSync(input, hashInput);
        };
        this.encrypt = (input) => {
            if (!input) {
                return null;
            }
            return bcrypt_1.default.hashSync(input, 10);
        };
    }
}
exports.Encrypt = Encrypt;
