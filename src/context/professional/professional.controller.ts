import { Request, Response } from 'express';
import { IProfessionalService } from './interface/professionalService.interface';

export class ProfessionalController {
  private professionalService: IProfessionalService;

  constructor(professionalService: IProfessionalService) {
    this.professionalService = professionalService;
  }

  confirmForgotPasswordToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, token } = req.body;
      const { statusCode, ...response } = await this.professionalService.confirmForgotPasswordToken({
        email,
        forgotPasswordToken: token,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  sendForgotPasswordToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalEmail = req.body.email
      const { statusCode, ...response } = await this.professionalService.sendForgotPasswordToken(professionalEmail);
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getProfessionalPatients = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { statusCode, ...response } = await this.professionalService.getProfessionalPatients(professionalId);
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  confirmSignupToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, signupToken } = req.body;
      const { statusCode, ...response } = await this.professionalService.confirmSignupToken({
        professionalEmail: email,
        signupToken: signupToken,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const { statusCode, ...response } = await this.professionalService.login({
        email,
        password,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password, name } = req.body;
      const { statusCode, ...response } = await this.professionalService.signUp({
        email,
        name,
        password,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { statusCode, ...response } = await this.professionalService.getAll();
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  };
}
