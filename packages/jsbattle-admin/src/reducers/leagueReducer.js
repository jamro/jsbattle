const initState = {
  page: null
};

const leaguesReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'LEAGUE_LIST_SUCCESS':
      return {...state, page: action.payload};
    default:
      return state;
  }

};

export default leaguesReducer;
