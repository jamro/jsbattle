const initState = {
  page: null
};

const scriptsReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == 'SCRIPT_LIST_SUCCESS') {
    return {...state, page: action.payload};
  } else {
    return state;
  }

};

export default scriptsReducer;
