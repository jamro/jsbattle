export default (stateHolder) => {

    return () => {
      stateHolder.setState({
        navi: {
          section: 'PROFILE',
          page: 'PROFILE',
          pageData: {}
        },
        errorMessage: null
      });
    };
  
  };