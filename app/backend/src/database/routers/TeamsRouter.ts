import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const TeamsRouter = Router();

TeamsRouter.get(
  '/',
  TeamsController.getAllTeams,
);

export default TeamsRouter;
