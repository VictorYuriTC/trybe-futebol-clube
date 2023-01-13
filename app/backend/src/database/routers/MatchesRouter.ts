import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = Router();

MatchesRouter.get(
  '/',
  MatchesController.getMatchesFilteredByInProgress,
  MatchesController.getAllMatches,
);

export default MatchesRouter;
