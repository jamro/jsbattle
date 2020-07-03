const initState = {
  info: {
    nodes: []
  }
};

const systemReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == 'SYSTEM_INFO_SUCCESS') {
    return {...state, info: action.payload};
  } else {
    return state;
  }

};

export default systemReducer;
