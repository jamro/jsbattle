import Stats from '../../../lib/Stats.js';

export default (stateHolder, challengeLibrary) => {

  return () => {
    let challenge = challengeLibrary.getChallenge(stateHolder.state.currentChallenge.id);

    console.log(`Complete challenge #${challenge.level} (ID: ${challenge.id})`);

    challengeLibrary.completeChallenge(stateHolder.state.currentChallenge.id);
    localStorage.setItem("challenges.completed", JSON.stringify(challengeLibrary.getCompletedChallenges()));

    Stats.onChallengeComplete(challenge.level);

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
