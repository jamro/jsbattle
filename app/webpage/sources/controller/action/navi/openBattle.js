export default (stateHolder) => {

  return (aiDefList, teamMode, rngSeed) => {
    stateHolder.setState((state) => {
      /* jshint ignore:start */
      return {
        navi: {
          section: 'BATTLE',
          page: 'BATTLE',
          pageData: {}
        },
        battle: {
          ...state.battle,
          teamMode: teamMode,
          rngSeed: rngSeed,
          aiDefList: aiDefList,
          quickBattleTank: null
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };

};
