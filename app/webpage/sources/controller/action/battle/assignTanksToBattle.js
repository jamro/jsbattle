export default (stateHolder, aiRepository) => {

  return (tankName, amount) => {
    stateHolder.setState((state) => {
      let i, j;
      let battleSet = state.battle.battleSet;
      let tank = battleSet.getTankByName(tankName);
      tank.count = amount;

      console.log(tankName, amount, tank);
      console.log(battleSet);

      localStorage.setItem("settings.battleSet", JSON.stringify(battleSet.toJSON()));

      return {
        ...state.battle,
        battleSet: battleSet
      }
    });
  }

};
