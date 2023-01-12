import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsValidation from '../validations/TeamsValidation';

const TeamsRouter = Router();

TeamsRouter.get(
  '/',
  TeamsController.getAllTeams,
);

TeamsRouter.get(
  '/:id',
  TeamsValidation.validateAllFieldsAreFilled,
  TeamsController.getTeamById,
);

export default TeamsRouter;
