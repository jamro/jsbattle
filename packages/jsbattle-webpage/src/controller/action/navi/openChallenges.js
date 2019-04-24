import Stats from '../../../lib/Stats.js';

export default (stateHolder, challengeLibrary) => {

  return () => {
    Stats.onChallengesList();
    stateHolder.setState((state) => {
      /* jshint ignore:start */
      return {
        navi: {
          section: 'CHALLENGES',
          page: 'CHALLENGE_LIST',
          pageData: {}
        },
        challenges: {
          ...state.challenges,
          list: challengeLibrary.getAll()
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
