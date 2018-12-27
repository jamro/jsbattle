export default (stateHolder, controller) => {

  return () => {
    if(stateHolder.state.editor.back == 'TANK_LIST') {
      controller.openTankList();
    } else {
      controller.openCodeRepository();
    }
  };

};
