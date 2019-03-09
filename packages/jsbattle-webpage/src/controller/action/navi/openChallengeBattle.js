export default (stateHolder, challengeLibrary) => {

  return () => {

    stateHolder.setState((state) => {

      let challengeId = state.currentChallenge.id;
      let challenge = challengeLibrary.getChallenge(challengeId);
      let battleSet = challenge.getBattleSet();
      let aiDefList = challenge.getAiDefList();
      let teamMode = challenge.getTeamMode();
      let rngSeed = challenge.getRngSeed();

      /* jshint ignore:start */
      return {
        navi: {
          section: 'CHALLENGES',
          page: 'CHALLENGE_BATTLE',
          pageData: {}
        },
        currentChallenge: {
          ...state.currentChallenge,
          aiDefList: aiDefList,
          battleSet: battleSet,
          rngSeed: rngSeed,
          teamMode: teamMode
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
