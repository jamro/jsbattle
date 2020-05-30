import {
  LEAGUE_REPLAY_SUCCESS,
  LEAGUE_SUMMARY_SUCCESS,
  LEAGUE_CLEAR_SUBMISSION_SUCCESS,
  LEAGUE_NEW_SUBMISSION_SUCCESS
} from '../actions/actionTypes.js';

const initState = {
  submission: null,
  ranktable: [],
  history: [],
  replay: {}
};


function leagueReducer(state = {}, action) {
  action = action || {};
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  let ubd;
  switch (action.type) {
    case LEAGUE_CLEAR_SUBMISSION_SUCCESS:
    case LEAGUE_NEW_SUBMISSION_SUCCESS:
    case LEAGUE_SUMMARY_SUCCESS:
      return {
        ...state,
        submission: Object.keys(action.payload.submission).length == 0 ? null : action.payload.submission,
        ranktable: action.payload.ranktable,
        history: action.payload.history
      };
    case LEAGUE_REPLAY_SUCCESS:
      ubd = JSON.parse(action.payload.ubd);
      return {
        ...state,
        replay: {
          ...ubd,
          createdAt: action.payload.createdAt,
          result: action.payload.meta,
        }
      };
    default:
      return state;
  }
}

export default leagueReducer;
