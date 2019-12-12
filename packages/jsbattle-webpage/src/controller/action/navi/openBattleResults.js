import Stats from '../../../lib/Stats.js';
export default (stateHolder) => {

  return (result) => {
    if(!result.tankWinner) {
      throw new Error('result.tankWinner is mandatory!');
    }
    Stats.onCustomBattleComplete();
    if(result.tankWinner) {
      console.log(`Tank winner: '${result.tankWinner.name}'`);
    }
    if(result.teamWinner) {
      console.log(`Team winner: '${result.teamWinner.name}'`);
    }
    console.log("Battle results:", result);

    stateHolder.setState((state) => {
      /* jshint ignore:start */
      return {
        navi: {
          section: 'BATTLE',
          page: 'BATTLE_RESULT',
          pageData: {}
        },
        battle: {
          ...state.battle,
          result: result
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };
};
