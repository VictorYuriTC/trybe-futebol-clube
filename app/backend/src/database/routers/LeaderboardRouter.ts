import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/home',
  LeaderboardController.getLeaderboardForHomeTeam,
);

LeaderboardRouter.get(
  '/away',
  LeaderboardController.getLeaderboardForAwayTeam,
);

export default LeaderboardRouter;
