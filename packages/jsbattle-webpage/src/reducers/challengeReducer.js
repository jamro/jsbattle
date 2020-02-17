import {
  COMPLETE_CHALLENGE_SUCCESS,
  CHALLENGE_LIST_SUCCESS,
  CHALLENGE_CODE_CHANGED_REQUEST,
  CHALLENGE_CODE_SUCCESS,
  CHALLENGE_CODE_FAILURE,
  CHALLENGE_FAILURE,
  CHALLENGE_SUCCESS
} from '../actions/actionTypes.js';

const initState = {
  list: [],
  code: ''
};

function challengeReducer(state = {}, action) {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case COMPLETE_CHALLENGE_SUCCESS:
      return {
        ...state,
        list: action.payload.challengeList
      };
    case CHALLENGE_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.challengeList
      };
    case CHALLENGE_CODE_CHANGED_REQUEST:
      return {
        ...state,
        code: action.payload.code
      };
    case CHALLENGE_CODE_SUCCESS:
      return {
        ...state,
        code: action.payload.code
      };
    case CHALLENGE_CODE_FAILURE:
      return {
        ...state,
        code: ''
      };
    case CHALLENGE_FAILURE:
      return {
        ...state,
        currentChallenge: null
      };
    case CHALLENGE_SUCCESS:
      return {
        ...state,
        currentChallenge: action.payload
      };
    default:
      return state;
  }
}

export default challengeReducer;
