"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const professional_routes_1 = __importDefault(require("./context/professional/professional.routes"));
const patients_routes_1 = __importDefault(require("./context/patients/patients.routes"));
const questionnaire_routes_1 = __importDefault(require("./context/questionnaire/questionnaire.routes"));
const router = (0, express_1.Router)();
router.use(questionnaire_routes_1.default);
router.use(professional_routes_1.default);
router.use(patients_routes_1.default);
exports.default = router;
