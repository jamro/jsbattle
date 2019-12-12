export default (stateHolder) => {

  return (tankName, amount) => {
    stateHolder.setState((state) => {
      let battleSet = state.battle.battleSet;
      let tank = battleSet.getTankByName(tankName);
      tank.count = amount;

      console.log(`Assigning ${amount} x '${tankName}' to the battle`, tank);
      console.log(`Battleset updated`, battleSet);

      localStorage.setItem("settings.battleSet", JSON.stringify(battleSet.toJSON()));
      console.log('Battleset stored in localStorage');

      /* jshint ignore:start */
      return {
        ...state.battle,
        battleSet: battleSet
      };
      /* jshint ignore:end */
    });
  };

};
