const initState = {
  page: null
};

const leagueReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == 'LEAGUE_LIST_SUCCESS') {
    return {...state, page: action.payload};
  } else {
    return state;
  }

};

export default leagueReducer;
