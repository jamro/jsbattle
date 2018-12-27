export default (stateHolder, challengeLibrary) => {

  return (challengeId) => {

    stateHolder.setState((state) => {
      challengeId = challengeId || state.currentChallenge.id;

      /* jshint ignore:start */
      return {
        navi: {
          section: 'CHALLENGES',
          page: 'CHALLENGE_EDITOR',
          pageData: {}
        },
        currentChallenge: {
          ...state.currentChallenge,
          code: challengeLibrary.getCode(challengeId),
          id: challengeId
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
