export default (stateHolder) => {

  return () => {
    stateHolder.setState(() => {
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
