import { IAdminService } from "./interface/adminService.interface";
import { Request, Response } from "express";
export declare class AdminController {
    private adminService;
    constructor(adminService: IAdminService);
    create: (req: Request, res: Response) => Promise<Response>;
    login: (req: Request, res: Response) => Promise<Response>;
}
