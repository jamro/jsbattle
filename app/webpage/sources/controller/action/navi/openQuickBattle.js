export default (stateHolder, aiRepository) => {

  return (tankName) => {
    stateHolder.setState((state) => {
      let battleSet = state.battle.battleSet;
      let totalTankCount = battleSet.getTankCount();
      let tank = battleSet.getTankByName(tankName);

      if(tank.count == 0) {
        tank.count++;
        totalTankCount++;
      }
      while(totalTankCount < 2) {
        tank.count++;
        totalTankCount++;
      }

      /* jshint ignore:start */
      return {
        navi: {
          section: 'BATTLE',
          page: 'BATTLE',
          pageData: {}
        },
        battle: {
          ...state.battle,
          quickBattleTank: tankName,
          battleSet: battleSet,
          aiDefList: battleSet.getAiDefList(aiRepository),
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };

};
