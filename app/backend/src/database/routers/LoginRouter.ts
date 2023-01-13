import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import authenticateJwt from '../jwt/authenticateJwt';
import LoginValidation from '../validations/LoginValidation';

const LoginRouter = Router();

LoginRouter.post(
  '/',
  LoginValidation.validateAllFieldsAreFilled,
  LoginController.login,
);

LoginRouter.get(
  '/validate',
  authenticateJwt,
  LoginValidation.validateUserIsAdmin,
);

export default LoginRouter;
