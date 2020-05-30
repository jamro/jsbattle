import {fetchFromApi} from '../lib/fetchFromApi.js';

export const getLeagueSummary = () => {
  return fetchFromApi(
    "/api/user/league",
    "LEAGUE_SUMMARY",
    {}
  );
};

export const getLeagueReplay = (replayId) => {
  return fetchFromApi(
    "/api/user/league/replay/" + replayId,
    "LEAGUE_REPLAY",
    {},
  );
};

export const joinLeague = (scriptId, scriptName) => {
  return fetchFromApi(
    "/api/user/league/submission",
    "LEAGUE_NEW_SUBMISSION",
    {
      method: 'PATCH',
      body: JSON.stringify({
        scriptId,
        scriptName
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
  );
};

export const leaveLeague = () => {
  return fetchFromApi(
    "/api/user/league/submission",
    "LEAGUE_CLEAR_SUBMISSION",
    {
      method: 'DELETE',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );
};
