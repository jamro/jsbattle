export default (stateHolder) => {

  return (isEnabled) => {
    localStorage.setItem("settings.teamMode", isEnabled ? 'true' : 'false');
    stateHolder.setState((state) => {
      return {
        battle: {
          ...state.battle,
          teamMode: isEnabled
        }
      }
    });
  }

};
