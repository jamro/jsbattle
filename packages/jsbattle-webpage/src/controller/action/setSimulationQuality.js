export default (stateHolder) => {

  return (quality) => {
    localStorage.setItem("settings.quality", quality);
    console.log("Quality changed to " + quality);
    stateHolder.setState({
      qualitySettings: quality
    });
  };

};
