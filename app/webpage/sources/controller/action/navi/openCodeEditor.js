export default (stateHolder, aiRepository) => {

  return (tankName, back) => {
    let script = aiRepository.getScript(tankName).code;
    stateHolder.setState((state) => {
      return {
        navi: {
          ...state.navi,
          section: 'EDITOR',
          page: 'CODE_EDITOR',
          pageData: {}
        },
        editor: {
          ...state.editor,
          tankName: tankName,
          originalCode: script,
          unsavedCode: script,
          back: back
        },
        errorMessage: null
      }
    });
  }

};
