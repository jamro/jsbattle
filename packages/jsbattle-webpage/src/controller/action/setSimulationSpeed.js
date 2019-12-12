export default (stateHolder) => {

  return (speed) => {
    localStorage.setItem("settings.simSpeed", speed);
    console.log("Speed changed to " + speed);
    stateHolder.setState({
      simSpeed: speed
    });
  };

};
