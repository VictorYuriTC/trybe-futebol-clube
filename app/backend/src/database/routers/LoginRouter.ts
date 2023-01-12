import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidation from '../validations/LoginValidation';

const LoginRouter = Router();

LoginRouter.post(
  '/',
  LoginValidation.validateAllFieldsAreFilled,
  LoginController.login,
);

export default LoginRouter;
