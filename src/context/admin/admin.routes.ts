import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.middleware";
import { createAdminController } from "./admin.factory";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import adminRequest from "./request/admin.request";

const adminController = createAdminController();

const router = Router();

router.post('/admin', authMiddleware(), adminController.create)
router.post('/admin/login', validateRequest(adminRequest.login), adminController.login)

export default router;