export default (stateHolder) => {

  return (ubd, done) => {
    console.log("Calling POST " + stateHolder.state.api + "/battleReplay...");
    console.log('ubd', ubd);
    $.post(stateHolder.state.api + "/battleReplay", {ubd: ubd})
      .done((data) => {
        console.log(`Batle ID received: ${data.id}`);
        stateHolder.setState((state) => {
          /* jshint ignore:start */
          return {
            battle: {
              ...state.battle,
              shareLink: window.location.protocol + "//" + window.location.host + "/#replay=" + data.id
            }
          };
          /* jshint ignore:end */
        });
        done();
      })
      .fail((response) => {
        console.error('Unable to get response from API');
        console.error(response);
        stateHolder.setState((state) => {
          /* jshint ignore:start */
          return {
            battle: {
              ...state.battle,
              shareLink: null
            },
            errorMessage: "Cannot create share link."
          };
          /* jshint ignore:end */
        });

        done();
      });
  };
};
