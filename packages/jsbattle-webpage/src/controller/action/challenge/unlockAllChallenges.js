export default (stateHolder, challengeLibrary) => {
  return () => {
    challengeLibrary.unlockAll();
    localStorage.setItem("challenges.completed", JSON.stringify(challengeLibrary.getCompletedChallenges()));
    stateHolder.setState((state) => {
      /* jshint ignore:start */
      return {
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
