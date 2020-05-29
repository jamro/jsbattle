import {
  LEAGUE_SUMMARY_SUCCESS,
  LEAGUE_CLEAR_SUBMISSION_SUCCESS,
  LEAGUE_NEW_SUBMISSION_SUCCESS
} from '../actions/actionTypes.js';

const initState = {
  submission: null,
  ranktable: [],
  history: []
};


function leagueReducer(state = {}, action) {
  action = action || {};
  state = state || {};
  state = {
    ...initState,
    ...state
  };
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
    default:
      return state;
  }
}

export default leagueReducer;
