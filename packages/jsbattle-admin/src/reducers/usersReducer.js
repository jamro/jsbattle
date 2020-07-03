const initState = {
  page: null,
  selected: null
};

const usersReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'USER_LIST_SUCCESS':
      return {...state, page: action.payload};
    case 'USER_VIEW_SUCCESS':
      return {...state, selected: action.payload};
    default:
      return state;
  }

};

export default usersReducer;
