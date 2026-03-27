import { Request, Response } from 'express';
import { IProfessionalService } from './interface/professionalService.interface';

export class ProfessionalController {
  private professionalService: IProfessionalService;

  constructor(professionalService: IProfessionalService) {
    this.professionalService = professionalService;
  }

  changePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const { statusCode, ...response } = await this.professionalService.changePassword({
        email,
        password,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  deleteProfessional = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { statusCode, ...response } = await this.professionalService.deleteProfessional(Number(professionalId));
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  confirmForgotPasswordToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, forgotPasswordToken } = req.body;
      const { statusCode, ...response } = await this.professionalService.confirmForgotPasswordToken({
        email,
        forgotPasswordToken,
      });
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  sendForgotPasswordToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalEmail = req.body.professionalEmail
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

  getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const professionalId = req.professional.id;
      const { statusCode, ...response } = await this.professionalService.getProfile(professionalId);
      return res.status(statusCode).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  getLastQuestionnaireResponses = async (req: Request, res: Response): Promise<Response> => {
    try {
      let paginationOptions: { page: number, limit: number } | undefined = undefined;
      const professionalId = req.professional.id;
      const { page, limit } = req.query;
      if (page && limit) {
        paginationOptions = { page: Number(page), limit: Number(limit) }
      }

      const response = await this.professionalService.getLastQuestionnaireResponses(professionalId, paginationOptions);
      return res.status(200).send(response);
    } catch (err: any) {
      return res.status(err.statusCode || 500).send({ error: err.message });
    }
  }

  confirmSignupToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { professionalEmail, signupToken } = req.body;
      const { statusCode, ...response } = await this.professionalService.confirmSignupToken({
        professionalEmail,
        signupToken,
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
      console.log(err);
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
