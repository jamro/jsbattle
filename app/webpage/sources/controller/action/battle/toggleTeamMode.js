export default (stateHolder) => {

  return (isEnabled) => {
    localStorage.setItem("settings.teamMode", isEnabled ? 'true' : 'false');
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
