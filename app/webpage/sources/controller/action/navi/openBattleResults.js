export default (stateHolder) => {

  return (result) => {
    if(!result.tankWinner) {
      throw new Error('result.tankWinner is mandatory!');
    }
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
