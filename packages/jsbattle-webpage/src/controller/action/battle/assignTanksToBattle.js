export default (stateHolder) => {

  return (tankName, amount) => {
    stateHolder.setState((state) => {
      let battleSet = state.battle.battleSet;
      let tank = battleSet.getTankByName(tankName);
      tank.count = amount;

      console.log(tankName, amount, tank);
      console.log(battleSet);

      localStorage.setItem("settings.battleSet", JSON.stringify(battleSet.toJSON()));

      /* jshint ignore:start */
      return {
        ...state.battle,
        battleSet: battleSet
      };
      /* jshint ignore:end */
    });
  };

};
