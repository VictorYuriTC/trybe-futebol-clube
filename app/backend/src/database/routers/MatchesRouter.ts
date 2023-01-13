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

MatchesRouter.patch(
  '/:id/finish',
  MatchesController.updateInProgressToFalse,
);

MatchesRouter.patch(
  '/:id',
  MatchesController.updateAmountOfGoalsInAMatch,
);

MatchesRouter.post(
  '/',
  authenticateJwt,
  MatchesValidation.validateTeamsAreDifferent,
  MatchesValidation.validateTeamsExistOnDB,
  MatchesController.createNewMatchByIMatchPayload,
);

export default MatchesRouter;
