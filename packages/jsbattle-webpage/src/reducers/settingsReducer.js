const initState = {
  simSpeed: 1,
  simQuality: 'auto',
  teamMode: false,
  loaded: false
};

function settingsReducer(state = {}, action) {
  state = state || {};
  state = {
    ...initState,
    ...state
  };
  switch (action.type) {
    case 'SET_SIM_SPEED_REQUEST':
      return {...state, simSpeed: action.payload};
    case 'SET_SIM_QUALITY_REQUEST':
      return {...state, simQuality: action.payload};
    case 'SETTINGS_REQUEST':
      return {...state, loaded: false};
    case 'SETTINGS_SUCCESS':
      console.log('simSpeed: ' + action.payload.simSpeed);
      console.log('qualitySettings: ' + action.payload.qualitySettings);
      console.log('teamMode: ' + action.payload.teamMode);
      return {
        ...state,
        simSpeed: action.payload.simSpeed,
        simQuality: action.payload.qualitySettings,
        teamMode: action.payload.teamMode,
        loaded: true
      };
    default:
      return state;
  }
}

export default settingsReducer;
