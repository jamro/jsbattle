export default (stateHolder, aiRepository) => {
  return () => {
    stateHolder.setState((state) => {
      aiRepository.updateScript(state.editor.tankName, state.editor.unsavedCode);
      /* jshint ignore:start */
      return {
        editor: {
          ...state.editor,
          originalCode: state.editor.unsavedCode
        }
      };
      /* jshint ignore:end */
    });
  };

};
