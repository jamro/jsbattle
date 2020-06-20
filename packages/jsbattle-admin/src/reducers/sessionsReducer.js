const initState = {
  page: null
};

const sessionsReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'SESSION_LIST_SUCCESS':
      return {
        ...state,
        page: {
          rows: action.payload
        }
      };
    default:
      return state;
  }

};

export default sessionsReducer;
