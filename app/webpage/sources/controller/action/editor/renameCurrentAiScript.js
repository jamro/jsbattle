export default (stateHolder, aiRepository) => {

  return (newName) => {
    stateHolder.setState((state) => {
      aiRepository.renameScript(newName, state.editor.tankName);
      /* jshint ignore:start */
      return {
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
