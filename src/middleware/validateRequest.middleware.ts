import { Request, Response, NextFunction } from 'express'

export function validateRequest(request: (req: Request) => any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = request(req);
    if (!validate.success) {
      const errors = validate.error.flatten().fieldErrors;
      return res.status(400).json({ errors });
    }
    next();
  }
}