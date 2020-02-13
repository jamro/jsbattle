const initState = {
  simSpeed: 1,
  simQuality: 'auto',
  teamMode: false
};

function settingsReducer(state = {}, action) {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'SET_SIM_SPEED':
      return {...state, simSpeed: action.payload};
    case 'SET_SIM_QUALITY':
      return {...state, simQuality: action.payload};
    case 'SETTINGS_SUCCESS':
      console.log('simSpeed: ' + action.payload.simSpeed);
      console.log('qualitySettings: ' + action.payload.qualitySettings);
      console.log('teamMode: ' + action.payload.teamMode);
      return {
        ...state,
        simSpeed: action.payload.simSpeed,
        simQuality: action.payload.qualitySettings,
        teamMode: action.payload.teamMode
      };
    default:
      return state;
  }
}

export default settingsReducer;
