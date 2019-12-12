export default (stateHolder, aiRepository) => {

  return (tankName, back) => {
    console.log(`Tank name: '${tankName}'`);
    let script = aiRepository.getScript(tankName).code;
    stateHolder.setState((state) => {
      /* jshint ignore:start */
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
      };
      /* jshint ignore:end */
    });
  };

};
