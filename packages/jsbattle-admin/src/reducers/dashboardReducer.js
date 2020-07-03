const initState = {
  users: {
    all: 0,
    registered: 0,
    active: 0,
    online: 0
  },
  league: {
    size: 0,
    entriesPerDay: 0,
    battlesPerHour: 0,
    battlesStored: 0
  },
  scriptCount: 0,
  nodes: 0,
  challenges: {
    'challenge-8UCUaNvC': 0,
    'challenge-Du7tyrCB': 0,
    'challenge-4syTf6ph': 0,
    'challenge-hXMwLdZw': 0,
    'challenge-tV3fKHBw': 0,
    'challenge-6iZxC1FP': 0
  }
};

const dashboardReducer = (state, action) => {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  if (action.type == 'DASHBOARD_INFO_SUCCESS') {
    return {...action.payload};
  } else {
    return state;
  }

};

export default dashboardReducer;
