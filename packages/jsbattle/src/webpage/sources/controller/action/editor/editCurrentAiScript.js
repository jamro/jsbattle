export default (stateHolder) => {

  return (code) => {
    stateHolder.setState((state) => {
      /* jshint ignore:start */
      return {
        editor: {
          ...state.editor,
          unsavedCode: code
        }
      };
      /* jshint ignore:end */
    });
  };

};
