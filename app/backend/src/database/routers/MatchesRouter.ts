import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import authenticateJwt from '../jwt/authenticateJwt';

const MatchesRouter = Router();

MatchesRouter.get(
  '/',
  MatchesController.getMatchesFilteredByInProgress,
  MatchesController.getAllMatches,
);

MatchesRouter.post(
  '/',
  authenticateJwt,
  MatchesController.createNewMatchByIMatchPayload,
);

export default MatchesRouter;
