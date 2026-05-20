import { IAdminService } from "./interface/adminService.interface";
import { Request, Response } from "express";

export class AdminController {
    private adminService: IAdminService;
    constructor(adminService: IAdminService) {
        this.adminService = adminService;
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const { statusCode, ...response } = await this.adminService.create({
                email,
                password,
            });
            return res.status(statusCode).send(response);
        } catch (err: any) {
            return res.status(err.statusCode || 500).send({ error: err.message });
        }
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const { statusCode, ...response } = await this.adminService.login({
                email,
                password,
            });
            return res.status(statusCode).send(response);
        } catch (err: any) {
            return res.status(err.statusCode || 500).send({ error: err.message });
        }
    }
};