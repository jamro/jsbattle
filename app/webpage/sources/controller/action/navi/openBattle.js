export default (stateHolder) => {

  return (aiDefList, teamMode, rngSeed, shareLink) => {
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
          quickBattleTank: null,
          shareLink: shareLink ? shareLink : null
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };

};
