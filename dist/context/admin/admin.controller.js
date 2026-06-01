"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
class AdminController {
    constructor(adminService) {
        this.create = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { statusCode, ...response } = await this.adminService.create({
                    email,
                    password,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { statusCode, ...response } = await this.adminService.login({
                    email,
                    password,
                });
                return res.status(statusCode).send(response);
            }
            catch (err) {
                return res.status(err.statusCode || 500).send({ error: err.message });
            }
        };
        this.adminService = adminService;
    }
}
exports.AdminController = AdminController;
;
