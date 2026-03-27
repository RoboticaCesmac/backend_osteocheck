import { Router } from "express";
import { createProfessionalController } from "./professional.factory";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import professionalRequest from "./request/professional.request";
import { authMiddleware } from "../../middleware/authenticate.middleware";

const professionalController = createProfessionalController();

const router = Router();

router.delete(
  "/professional",
  authMiddleware(),
  professionalController.deleteProfessional
)

router.put(
  "/professional/change/password",
  validateRequest(professionalRequest.changePassword),
  professionalController.changePassword
)

router.put(
  "/professional/send/forgot-password-token",
  validateRequest(professionalRequest.sendForgotPasswordToken),
  professionalController.sendForgotPasswordToken
)

router.put(
  "/professional/confirm/forgot-password-token",
  validateRequest(professionalRequest.confirmForgotPasswordToken),
  professionalController.confirmForgotPasswordToken
)

router.post(
  "/professional/signup",
  validateRequest(professionalRequest.signup),
  professionalController.signup
);

router.get(
  "/professional/profile",
  authMiddleware(),
  professionalController.getProfile
)

router.get(
  "/professional/patients",
  authMiddleware(),
  professionalController.getProfessionalPatients
)

router.get(
  "/professional/patients/questionnaire-responses",
  authMiddleware(),
  professionalController.getLastQuestionnaireResponses
)

router.post(
  "/professional/confirm-signup-token",
  validateRequest(professionalRequest.confirmSignupToken),
  professionalController.confirmSignupToken
);

router.post(
  "/professional/login",
  validateRequest(professionalRequest.login),
  professionalController.login
);

router.get("/professional", professionalController.getAll);

export default router;
