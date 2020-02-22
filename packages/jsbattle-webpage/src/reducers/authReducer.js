import {
  AUTH_METHODS_SUCCESS,
  AUTH_METHODS_FAILURE,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  PROFILE_REGISTER_SUCCESS,
} from '../actions/actionTypes.js';

const initState = {
  authMethods: {},
  profile: {}
};

const authReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };

  switch (action.type) {
    case AUTH_METHODS_SUCCESS:
      return {...state, authMethods: action.payload};
    case AUTH_METHODS_FAILURE:
      return {...state, authMethods: {}};
    case USER_PROFILE_SUCCESS:
      return {...state, profile: action.payload};
    case USER_PROFILE_FAILURE:
      return {...state, profile: {}};
    case PROFILE_REGISTER_SUCCESS:
      return {...state, profile: action.payload};
    default:
      return state;
  }

};

export default authReducer;
