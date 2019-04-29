import Stats from '../../../lib/Stats.js';

export default (stateHolder, challengeLibrary) => {

  return (result) => {
    let challenge = challengeLibrary.getChallenge(stateHolder.state.currentChallenge.id);
    let survivors = result.tankList.filter((el) => el.energy > 0);
    let battleWon = (survivors.length == 1 && survivors[0].name == "Player");

    if(battleWon) {
      challengeLibrary.completeChallenge(stateHolder.state.currentChallenge.id);
      localStorage.setItem("challenges.completed", JSON.stringify(challengeLibrary.getCompletedChallenges()));
    }

    Stats.onChallengeResult(challenge.level, battleWon);

    stateHolder.setState((state) => {
      /* jshint ignore:start */
      return {
        navi: {
          section: 'CHALLENGES',
          page: 'CHALLENGE_RESULT',
          pageData: {}
        },
        challenges: {
          ...state.challenges,
          list: challengeLibrary.getAll()
        },
        currentChallenge: {
          ...state.currentChallenge,
          battleWon: battleWon
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
