import Stats from '../../../lib/Stats.js';
export default (stateHolder, challengeLibrary) => {

  return (challengeId, showInfo) => {

    stateHolder.setState((state) => {
      challengeId = challengeId || state.currentChallenge.id;
      showInfo = showInfo || false;
      let challenge = challengeLibrary.getChallenge(challengeId);

      Stats.onChallengeOpen(challenge.level);

      /* jshint ignore:start */
      return {
        navi: {
          section: 'CHALLENGES',
          page: 'CHALLENGE_EDITOR',
          pageData: {}
        },
        currentChallenge: {
          ...state.currentChallenge,
          showInfo: showInfo,
          code: challengeLibrary.getCode(challengeId),
          id: challengeId,
          level: challenge.level,
          name: challenge.name,
          description: challenge.description
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
