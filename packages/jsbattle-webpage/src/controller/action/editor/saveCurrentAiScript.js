export default (stateHolder, aiRepository) => {
  return () => {
    stateHolder.setState((state) => {
      aiRepository.updateScript(state.editor.tankName, state.editor.unsavedCode);
      console.log(`Code of '${state.editor.tankName}' tank saved`);
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
