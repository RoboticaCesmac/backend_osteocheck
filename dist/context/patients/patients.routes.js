"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middleware/authenticate.middleware");
const validateRequest_middleware_1 = require("../../middleware/validateRequest.middleware");
const patients_request_1 = __importDefault(require("./request/patients.request"));
const patients_factory_1 = require("./patients.factory");
const patientsController = (0, patients_factory_1.createPatientsController)();
const router = (0, express_1.Router)();
router.post('/patients', (0, authenticate_middleware_1.authMiddleware)(), (0, validateRequest_middleware_1.validateRequest)(patients_request_1.default.create), patientsController.create);
router.get('/patients/:id', (0, authenticate_middleware_1.authMiddleware)(), patientsController.getById);
exports.default = router;
