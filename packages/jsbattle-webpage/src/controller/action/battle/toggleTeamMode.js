export default (stateHolder) => {

  return (isEnabled) => {
    console.log((isEnabled ? 'Enabling' : 'Disabling') + ' team mode');
    localStorage.setItem("settings.teamMode", isEnabled ? 'true' : 'false');
    console.log('Team mode settings stored in localStorage');
    stateHolder.setState((state) => {

      /* jshint ignore:start */
      return {
        battle: {
          ...state.battle,
          teamMode: isEnabled
        }
      };
      /* jshint ignore:end */
    });
  };

};
