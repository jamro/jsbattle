export default (stateHolder, controller) => {

  return (battleID) => {

    console.log("Replay ID: " + battleID);

    stateHolder.setState(() => {
      /* jshint ignore:start */
      return {
        navi: {
          section: 'LOADING',
          page: 'LOADING',
          pageData: {}
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });

    console.log(`CALL GET ` + stateHolder.state.api + "/battleReplay?battleId=" + battleID);
    $.get(stateHolder.state.api + "/battleReplay?battleId=" + battleID)
      .done((data) => {
        console.log('UBD data received');
        let ubd = JSON.stringify(data.ubd);

        let descriptor = JsBattle.createUBD();
        try{
          descriptor.decode(ubd);
        } catch (err) {
          console.error(err);
          stateHolder.setState(() => {
            /* jshint ignore:start */
            return {
              errorMessage: "Cannot parse battle replay"
            };
            /* jshint ignore:end */
          });
          return;
        }
        //@// TODO: pass timeLimit data
        controller.openBattle(
          descriptor.getAiList(),
          descriptor.getTeamMode(),
          descriptor.getRngSeed(),
          descriptor.getTimeLimit(),
          window.location.href
        );
      })
      .fail((response) => {
        console.error(response);
        stateHolder.setState(() => {
          /* jshint ignore:start */
          return {
            errorMessage: "Cannot get battle replay"
          };
          /* jshint ignore:end */
        });
      });
  };

};
