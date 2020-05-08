import statsService from '../services/statsService.js';
import {
  STATS_SANDBOX_OPEN,
  STATS_SANDBOX_EDIT,
  STATS_CHALLENGE_LIST_OPEN,
  STATS_CHALLENGE_COMPLETE,
  STATS_CHALLENGE_OPEN,
  STATS_LEAGUE_OPEN
} from './actionTypes.js';

export const notifySandboxOpen = () => {
  statsService.onSandboxOpen();
  return {
    type: STATS_SANDBOX_OPEN,
  };
};

export const notifySandboxEdit = () => {
  statsService.onSandboxEdit();
  return {
    type: STATS_SANDBOX_EDIT,
  };
};

export const notifyChallengesListOpen = () => {
  statsService.onChallengesList();
  return {
    type: STATS_CHALLENGE_LIST_OPEN,
  };
};

export const notifyStatsChallengeComplete = (level) => {
  statsService.onChallengeComplete(level);
  return {
    type: STATS_CHALLENGE_COMPLETE,
    payload: {
      level
    }
  };
};

export const notifyStatsChallengeOpen = (level) => {
  statsService.onChallengeOpen(level);
  return {
    type: STATS_CHALLENGE_OPEN,
    payload: {
      level
    }
  };
};

export const notifyLeagueOpen = () => {
  statsService.notifyLeagueOpen();
  return {
    type: STATS_LEAGUE_OPEN,
  };
};
