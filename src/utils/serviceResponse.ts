export type ServiceResponse<T> = {
  statusCode: number;
  data: T;
  message?: string;
};

export const serviceResponse = <T>({
  statusCode,
  data,
  message,
}: ServiceResponse<T>): ServiceResponse<T> => {
  return {
    statusCode,
    data,
    message,
  };
};
