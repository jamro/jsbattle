const initState = {
  info: {
    health: {
      client: {},
      mem: {
        percent: 0
      },
      cpu: {
        load15: 0
      },
      process: {},
      os: {},
      time: {}
    },
    node: {
      serrvices: []
    }
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
