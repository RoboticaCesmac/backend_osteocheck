type HttpFullResponse = {
    statusCode: number;
    message?: string;
    data?: any;
};
export declare class HttpResponse {
    static systemError: ({ message }: Pick<HttpFullResponse, "message">) => never;
    static badRequest: ({ message }: Pick<HttpFullResponse, "message">) => never;
    static notFound: ({ message }: Pick<HttpFullResponse, "message">) => never;
    static created: ({ data, message, }: Pick<HttpFullResponse, "data" | "message">) => {
        data: any;
        message: string | undefined;
        statusCode: number;
    };
    static success: ({ data, message, }: Pick<HttpFullResponse, "data" | "message">) => {
        data: any;
        message: string | undefined;
        statusCode: number;
    };
    static unauthorized: ({ message, }: Pick<HttpFullResponse, "message">) => {
        message: string | undefined;
        statusCode: number;
    };
}
export {};
