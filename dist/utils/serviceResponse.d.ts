export type ServiceResponse<T> = {
    statusCode: number;
    data: T;
    message?: string;
};
export declare const serviceResponse: <T>({ statusCode, data, message, }: ServiceResponse<T>) => ServiceResponse<T>;
