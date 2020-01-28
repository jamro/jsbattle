const initState = {
  page: null
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
    default:
      return state;
  }

};

export default usersReducer;
