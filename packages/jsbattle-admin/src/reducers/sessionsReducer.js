const initState = {
  page: null
};

const sessionsReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == 'SESSION_LIST_SUCCESS') {
    return {
      ...state,
      page: {
        rows: action.payload
      }
    };
  } else {
    return state;
  }

};

export default sessionsReducer;
