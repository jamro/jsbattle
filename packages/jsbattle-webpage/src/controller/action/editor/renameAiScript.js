export default (stateHolder, aiRepository) => {

  return (newName, oldName) => {
    stateHolder.setState((state) => {
      aiRepository.renameScript(newName, oldName);

      let battleSet = state.battle.battleSet;
      let tank = battleSet.getTankByName(oldName);
      tank.name = newName;
      tank.displayName = newName;
      console.log(`Tank '${oldName}' renamed to '${newName}'`, tank);

      /* jshint ignore:start */
      return {
        battle: {
          ...state.battle,
          battleSet: battleSet
        },
        editor: {
          ...state.editor,
          tankName: newName
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
