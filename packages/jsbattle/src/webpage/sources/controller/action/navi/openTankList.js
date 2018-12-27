export default (stateHolder) => {

  return () => {
    stateHolder.setState((state) => {
      return {
        navi: {
          section: 'BATTLE',
          page: 'TANK_LIST',
          pageData: {}
        },
        errorMessage: null
      };
    });
  };
};
