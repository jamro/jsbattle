export default (stateHolder, challengeLibrary) => {
  return (code) => {
    stateHolder.setState((state) => {
      challengeLibrary.updateScript(state.currentChallenge.id, code);
      /* jshint ignore:start */
      return {
        currentChallenge: {
          ...state.currentChallenge,
          code: code
        }
      };
      /* jshint ignore:end */
    });
  };

};
