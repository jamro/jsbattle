const initState = {
  list: [],
  code: ''
};


function challengeReducer(state = {}, action) {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        list: state.list.map((challenge) => {
          if(challenge.id == action.payload.challengeId) {
            return {
              ...challenge,
              isCompleted: true
            };
          } else {
            return challenge;
          }
        })
      };
    case 'SETTINGS_SUCCESS':
      return {
        ...state,
        list: action.payload.challengeList
      };
    case 'CHALLENGE_CODE_CHANGED':
      return {
        ...state,
        code: action.payload.code
      };
    case 'CHALLENGE_CODE_SUCCESS':
      return {
        ...state,
        code: action.payload.code
      };
    default:
      return state;
  }
}

export default challengeReducer;
