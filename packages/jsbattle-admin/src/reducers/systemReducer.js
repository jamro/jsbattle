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
  switch (action.type) {
    case 'SYSTEM_INFO_SUCCESS':
      return {...state, info: action.payload};
    default:
      return state;
  }

};

export default systemReducer;
