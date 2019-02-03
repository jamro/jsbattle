export default (stateHolder) => {

  return (quality) => {
    localStorage.setItem("settings.quality", quality);
    stateHolder.setState({
      qualitySettings: quality
    });
  };

};
