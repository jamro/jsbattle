export default (stateHolder) => {

  return (ubd, done) => {
    $.post("./api/battleReplay", {ubd: ubd})
      .done((data) => {
        stateHolder.setState((state) => {
          /* jshint ignore:start */
          return {
            battle: {
              ...state.battle,
              shareLink: window.location.protocol + "//" + window.location.host + "/#replay=" + data.battleId
            }
          };
          /* jshint ignore:end */
        });
        done();
      })
      .fail((response) => {
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
