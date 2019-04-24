import Stats from '../../../lib/Stats.js';
export default (stateHolder) => {

  return (aiDefList, teamMode, rngSeed, shareLink) => {
    stateHolder.setState((state) => {

      Stats.onCustomBattleStart(teamMode);

      let counters = aiDefList
        .reduce((acc, val) => {
          if(!acc[val.name]) {
            acc[val.name] = 0;
          }
          acc[val.name]++;
          return acc;
        }, []);

        for(let tank in counters) {
          let count = counters[tank];
          Stats.onCustomBattleTankSelected(tank, count);
        }

      /* jshint ignore:start */
      return {
        navi: {
          section: 'BATTLE',
          page: 'BATTLE',
          pageData: {}
        },
        battle: {
          ...state.battle,
          teamMode: teamMode,
          rngSeed: rngSeed,
          aiDefList: aiDefList,
          quickBattleTank: null,
          shareLink: shareLink ? shareLink : null
        },
        errorMessage: null
      };
      /* jshint ignore:end */
    });
  };

};
