export default (stateHolder, aiRepository) => {

  return (newName, oldName) => {
    stateHolder.setState((state) => {
      aiRepository.renameScript(newName, oldName);

      let battleSet = state.battle.battleSet;
      battleSet.getTankByName(oldName).name = newName;
      console.log(`Tank '${oldName}' renamed to '${newName}'`);

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
