type HttpFullResponse = {
  statusCode: number;
  message?: string;
  data?: any;
};

export class HttpResponse {
  static systemError = ({ message }: Pick<HttpFullResponse, "message">) => {
    throw {
      message,
      statusCode: 500,
    };
  };

  static badRequest = ({ message }: Pick<HttpFullResponse, "message">) => {
    throw {
      message,
      statusCode: 400,
    };
  };

  static notFound = ({ message }: Pick<HttpFullResponse, "message">) => {
    throw {
      message,
      statusCode: 404,
    }
  }

  static created = ({
    data,
    message,
  }: Pick<HttpFullResponse, "data" | "message">) => {
    return {
      data,
      message,
      statusCode: 201,
    };
  };

  static success = ({
    data,
    message,
  }: Pick<HttpFullResponse, "data" | "message">) => {
    return {
      data,
      message,
      statusCode: 200,
    };
  };

  static unauthorized = ({
    message,
  }: Pick<HttpFullResponse, "message">) => {
    return {
      message,
      statusCode: 401,
    };
  };
}
