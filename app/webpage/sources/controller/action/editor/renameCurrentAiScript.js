export default (stateHolder, aiRepository) => {

  return (newName) => {
    stateHolder.setState((state) => {
      aiRepository.renameScript(newName, state.editor.tankName);
      return {
        editor: {
          ...state.editor,
          tankName: newName
        },
        codeRepository: {
          ...state.codeRepository,
          tankList: aiRepository.getScriptNameList()
        }
      }
    });
  }

};
