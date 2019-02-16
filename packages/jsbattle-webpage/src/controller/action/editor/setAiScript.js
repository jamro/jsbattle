export default (stateHolder, aiRepository) => {
  return (name, code) => {
    stateHolder.setState((state) => {
      aiRepository.updateScript(name, code);
      /* jshint ignore:start */
      if(state.editor.tankName != name) {
        return {
          editor: {
            ...state.editor
          }
        };
      }
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
