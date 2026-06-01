"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middleware/authenticate.middleware");
const admin_factory_1 = require("./admin.factory");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const admin_request_1 = __importDefault(require("./request/admin.request"));
const adminController = (0, admin_factory_1.createAdminController)();
const router = (0, express_1.Router)();
router.post('/admin', (0, authenticate_middleware_1.authMiddleware)(), adminController.create);
router.post('/admin/login', (0, validateRequest_middleware_1.validateRequest)(admin_request_1.default.login), adminController.login);
exports.default = router;
