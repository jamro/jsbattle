export default (stateHolder, aiRepository) => {

  return () => {
    let name = aiRepository.getRandomScriptName(true);
    let retry = 0;
    while(!aiRepository.isNameAllowed(name)) {
      name = aiRepository.getRandomScriptName(false);
      retry++;
      if(retry > 100) {
        throw "Cannot find unique name for the script";
      }
    }

    aiRepository.createScript(name);
    stateHolder.setState((state) => {
      let battleSet = state.battle.battleSet;
      let tank = battleSet.addTank(name);
      tank.count = 1;
      tank.userCreated = true;

      /* jshint ignore:start */
      return {
        battle: {
          ...state.battle,
          battleSet: battleSet
        },
        codeRepository: {
          ...state.codeRepository,
          tankList: aiRepository.getScriptNameList()
        }
      };
      /* jshint ignore:end */
    });
  };
};
