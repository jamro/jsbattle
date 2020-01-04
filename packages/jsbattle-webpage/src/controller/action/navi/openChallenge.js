import Stats from '../../../lib/Stats.js';
export default (stateHolder, challengeLibrary) => {

  return (challengeId, showInfo) => {

    stateHolder.setState((state) => {
      challengeId = challengeId || state.currentChallenge.id;
      let challenge = challengeLibrary.getChallenge(challengeId);
      let battleSet = challenge.getBattleSet();
      let aiDefList = challenge.getAiDefList();
      let teamMode = challenge.getTeamMode();
      let rngSeed = challenge.getRngSeed();
      let timeLimit = challenge.getTimeLimit();
      let modifier = challenge.getModifier();

      showInfo = showInfo || false;

      console.log(`Challenge #${challenge.level} (ID: ${challengeId})`);

      Stats.onChallengeOpen(challenge.level);

      /* jshint ignore:start */
      return {
        navi: {
          section: 'CHALLENGES',
          page: 'CHALLENGE',
          pageData: {}
        },
        currentChallenge: {
          ...state.currentChallenge,
          showInfo: showInfo,
          code: challengeLibrary.getCode(challengeId),
          id: challengeId,
          level: challenge.level,
          name: challenge.name,
          description: challenge.description,
          aiDefList: aiDefList,
          battleSet: battleSet,
          rngSeed: rngSeed,
          timeLimit: timeLimit,
          teamMode: teamMode,
          modifier: modifier
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
