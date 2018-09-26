export default (stateHolder) => {

  return (speed) => {
    localStorage.setItem("settings.simSpeed", speed);
    stateHolder.setState({
      simSpeed: speed
    });
  };

};
