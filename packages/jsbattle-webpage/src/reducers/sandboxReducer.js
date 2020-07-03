import {
  AI_SCRIPT_REQUEST,
  AI_SCRIPT_SUCCESS,
  AI_SCRIPT_FAILURE,
  AI_SCRIPT_CHANGED_SUCCESS,
  AI_SCRIPT_RENAME_SUCCESS,
  SANDBOX_OPPONENT_CHANGE,
  SANDBOX_RNG_LOCK,
  SANDBOX_RNG_UNLOCK,
  SANDBOX_OPPONENT_TEAM_MODE,
  SANDBOX_OPPONENT_DUEL_MODE,
  SANDBOX_OPPONENT_LIST
} from '../actions/actionTypes.js';

const initState = {
  script: {},
  opponent: {
    source: 'bundled',
    name: 'dummy',
    code: ''
  },
  opponentList: [],
  lockRng: false,
  mode: 'duel'
};


function sandboxReducer(state = {}, action) {
  action = action || {};
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case SANDBOX_OPPONENT_LIST:
    return {
      ...state,
      opponentList: action.payload
    };
    case AI_SCRIPT_FAILURE:
    case AI_SCRIPT_REQUEST:
      return {
        ...state,
        script: {}
      };
    case AI_SCRIPT_SUCCESS:
      return {
        ...state,
        script: action.payload
      };
    case AI_SCRIPT_CHANGED_SUCCESS:
      return {
        ...state,
        script: {
          ...state.script,
          code: action.payload.code
        }
      };
    case AI_SCRIPT_RENAME_SUCCESS:
      return {
        ...state,
        script: {
          ...state.script,
          scriptName: action.payload.scriptName
        }
      };
    case SANDBOX_OPPONENT_CHANGE:
      return {
        ...state,
        opponent: {
          ...state.opponent,
          source: action.payload.source,
          id: action.payload.id,
          name: action.payload.name,
          code: action.payload.code || '',
        }
      };
    case SANDBOX_RNG_LOCK:
      return {
        ...state,
        lockRng: true
      };
    case SANDBOX_RNG_UNLOCK:
      return {
        ...state,
        lockRng: false
      };
    case SANDBOX_OPPONENT_TEAM_MODE:
      return {
        ...state,
        mode: 'team'
      };
    case SANDBOX_OPPONENT_DUEL_MODE:
      return {
        ...state,
        mode: 'duel'
      };
    default:
      return state;
  }
}

export default sandboxReducer;
