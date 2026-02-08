const Professional = require("./src/context/professional/entity/professional.entity");

declare namespace Express {
  export interface Request {
      professional: Professional;
  }
}