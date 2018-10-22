export default (stateHolder, controller) => {

  return (battleID) => {

    stateHolder.setState((state) => {
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

    $.get("./replay/" + battleID)
      .done((data) => {
        let ubd = JSON.stringify(data.ubd);

        let descriptor = JsBattle.createUBD();
        descriptor.decode(ubd);
        controller.openBattle(
          descriptor.getAiList(),
          descriptor.getTeamMode(),
          descriptor.getRngSeed(),
          window.location.href
        );
      })
      .fail((response) => {
        console.error(response);
        stateHolder.setState((state) => {
          /* jshint ignore:start */
          return {
            errorMessage: "Cannot get battle replay"
          };
          /* jshint ignore:end */
        });
      });
  };

};
