export default (stateHolder) => {

  return (aiDefList, teamMode, rngSeed) => {
    stateHolder.setState((state) => {
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
      }
    });
  }

};
