import {
  CREATE_AI_SCRIPT_SUCCESS,
  DELETE_AI_SCRIPT_SUCCESS,
  SANDBOX_AI_SCRIPT_LIST_SUCCESS,
  AI_SCRIPT_RENAME_SUCCESS,
} from '../actions/actionTypes.js';

const initState = {
  tankList: []
};


function aiRepoReducer(state = {}, action) {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case CREATE_AI_SCRIPT_SUCCESS:
      return {
        ...state,
        tankList: state.tankList.concat(action.payload.name)
      };
    case DELETE_AI_SCRIPT_SUCCESS:
      return {
        ...state,
        tankList: state.tankList.filter((name) => name !=  action.payload.name)
      };
    case SANDBOX_AI_SCRIPT_LIST_SUCCESS:
      return {
        ...state,
        tankList: action.payload
      };
    case AI_SCRIPT_RENAME_SUCCESS:
      return {
        ...state,
        tankList: state.tankList.map((name) => {
          if(name == action.payload.oldName) {
            return action.payload.newName;
          } else {
            return name;
          }
        })
      };
    default:
      return state;
  }
}

export default aiRepoReducer;
