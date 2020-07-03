import {
  SANDBOX_AI_SCRIPT_LIST_SUCCESS,
} from '../actions/actionTypes.js';

const initState = {
  tankList: []
};


function aiRepoReducer(state = {}, action) {
  action = action || {};
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == SANDBOX_AI_SCRIPT_LIST_SUCCESS) {
    return {
      ...state,
      tankList: action.payload
    };
  } else {
    return state;
  }
}

export default aiRepoReducer;
