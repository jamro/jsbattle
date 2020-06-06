import {fetchFromApi} from '../lib/fetchFromApi.js';


export const getLeaguePreview = () => {
  return fetchFromApi(
    "/api/leaguePreview",
    "LEAGUE_PREVIEW",
    {}
  );
};

export const getLeagueSummary = () => {
  return fetchFromApi(
    "/api/user/league",
    "LEAGUE_SUMMARY",
    {}
  );
};

export const refreshLeague = () => {
  return fetchFromApi(
    "/api/user/league",
    "LEAGUE_REFRESH",
    {}
  );
};

export const getLeagueReplay = (replayId, isAuthorized) => {
  let url = isAuthorized ? "/api/user/league/replay/" : "/api/leaguePreview/replay/";
  return fetchFromApi(
    url + replayId,
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
