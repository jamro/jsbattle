export default (stateHolder) => {

  return (code) => {
    stateHolder.setState((state) => {
      return {
        editor: {
          ...state.editor,
          unsavedCode: code
        }
      }
    });
  }

};
