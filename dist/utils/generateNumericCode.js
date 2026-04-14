"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumericCode = generateNumericCode;
function generateNumericCode(amount) {
    if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
    }
    let code = '';
    for (let i = 0; i < amount; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}
