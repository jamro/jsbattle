const initState = {
  page: null
};

const battlesReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == 'BATTLE_LIST_SUCCESS') {
    return {...state, page: action.payload};
  } else {
    return state;
  }
};

export default battlesReducer;
