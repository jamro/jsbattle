import Stats from '../../../lib/Stats.js';

export default (stateHolder) => {

  return () => {
    Stats.onCustomBattleOpen();
    stateHolder.setState(() => {
      return {
        navi: {
          section: 'BATTLE',
          page: 'TANK_LIST',
          pageData: {}
        },
        errorMessage: null
      };
    });
  };
};
