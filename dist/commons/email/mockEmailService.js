"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmailService = void 0;
class MockEmailService {
    constructor() {
        this.sendEmail = async (emailPayload) => {
            console.log(emailPayload);
            console.log('Email enviado com sucesso');
        };
    }
}
exports.MockEmailService = MockEmailService;
