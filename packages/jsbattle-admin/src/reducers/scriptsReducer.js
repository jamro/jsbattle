const initState = {
  page: null
};

const scriptsReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'SCRIPT_LIST_SUCCESS':
      return {...state, page: action.payload};
    default:
      return state;
  }

};

export default scriptsReducer;
