import {
  SANDBOX_AI_SCRIPT_LIST_SUCCESS,
} from '../actions/actionTypes.js';

const initState = {
  tankList: {
    rows: []
  }
};


function aiRepoReducer(state = {}, action) {
  action = action || {};
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case SANDBOX_AI_SCRIPT_LIST_SUCCESS:
      return {
        ...state,
        tankList: action.payload
      };
    default:
      return state;
  }
}

export default aiRepoReducer;
