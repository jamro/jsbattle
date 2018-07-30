export default (stateHolder) => {

  return () => {
    stateHolder.setState({
      navi: {
        section: 'EDITOR',
        page: 'CODE_REPOSITORY',
        pageData: {}
      },
      errorMessage: null
    });
  }

};
