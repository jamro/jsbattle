export default (stateHolder, challengeLibrary) => {

  return () => {
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
