"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
}
exports.HttpResponse = HttpResponse;
HttpResponse.systemError = ({ message }) => {
    throw {
        message,
        statusCode: 500,
    };
};
HttpResponse.badRequest = ({ message }) => {
    throw {
        message,
        statusCode: 400,
    };
};
HttpResponse.notFound = ({ message }) => {
    throw {
        message,
        statusCode: 404,
    };
};
HttpResponse.created = ({ data, message, }) => {
    return {
        data,
        message,
        statusCode: 201,
    };
};
HttpResponse.success = ({ data, message, }) => {
    return {
        data,
        message,
        statusCode: 200,
    };
};
HttpResponse.unauthorized = ({ message, }) => {
    return {
        message,
        statusCode: 401,
    };
};
