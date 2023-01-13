import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import authenticateJwt from '../jwt/authenticateJwt';
import MatchesValidation from '../validations/MatchesValidation';

const MatchesRouter = Router();

MatchesRouter.get(
  '/',
  MatchesController.getMatchesFilteredByInProgress,
  MatchesController.getAllMatches,
);

MatchesRouter.post(
  '/',
  authenticateJwt,
  MatchesValidation.validateTeamsAreDifferent,
  MatchesValidation.validateTeamsExistOnDB,
  MatchesController.createNewMatchByIMatchPayload,
);

MatchesRouter.patch(
  '/:id/finish',
  MatchesController.updateInProgressToFalse,
);

export default MatchesRouter;
