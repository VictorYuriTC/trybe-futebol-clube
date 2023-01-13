import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/',
  LeaderboardController.getLeaderboard,
);

export default LeaderboardRouter;
