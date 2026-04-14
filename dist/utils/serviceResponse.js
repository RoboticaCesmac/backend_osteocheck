"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceResponse = void 0;
const serviceResponse = ({ statusCode, data, message, }) => {
    return {
        statusCode,
        data,
        message,
    };
};
exports.serviceResponse = serviceResponse;
