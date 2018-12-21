export default (stateHolder, aiRepository) => {

  return (newName, oldName) => {
    stateHolder.setState((state) => {
      aiRepository.renameScript(newName, state.editor.tankName);

      let battleSet = state.battle.battleSet;
      battleSet.getTankByName(oldName).name = newName;

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
