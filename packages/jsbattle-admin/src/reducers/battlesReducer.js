const initState = {
  page: null
};

const battlesReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'BATTLE_LIST_SUCCESS':
      return {...state, page: action.payload};
    default:
      return state;
  }

};

export default battlesReducer;
