const initState = {
  profile: null,
  authMethods: {}
};

const authReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };

  switch (action.type) {
    case 'AUTH_METHODS_SUCCESS':
      return {...state, authMethods: action.payload};
    case 'AUTH_METHODS_FAILURE':
      return {...state, authMethods: {}};
    case 'USER_PROFILE_SUCCESS':
      if(action.payload.role !== 'admin') {
        return {...state, profile: null};
      }
      return {...state, profile: action.payload};
    default:
      return state;
  }

};

export default authReducer;
