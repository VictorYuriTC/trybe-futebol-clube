import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = Router();

MatchesRouter.get(
  '/',
  MatchesController.getAllMatches,
);

export default MatchesRouter;
