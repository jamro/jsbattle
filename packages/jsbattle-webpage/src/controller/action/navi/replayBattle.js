export default (stateHolder, controller) => {

  return (battleID) => {

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

    $.get(stateHolder.state.api + "/battleReplay?battleId=" + battleID)
      .done((data) => {
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
        controller.openBattle(
          descriptor.getAiList(),
          descriptor.getTeamMode(),
          descriptor.getRngSeed(),
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
