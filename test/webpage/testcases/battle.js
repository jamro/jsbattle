
import assert from "assert";
import {
  waitForTankCounter,
  getTankTableNames,
  clickStartBattle,
  getTotalTankCounter
} from '../helper/TankListHelper.js';
import {
  skipLoading,
  waitForBattlefield,
  waitForBattlefieldHide,
  clickExitBattle,
  restartBattle
} from '../helper/BattleHelper.js';
import {
  setNavBarSpeed,
  setNavBarQuality
} from '../helper/NaviHelper.js';
import {
  getWinnerName
} from '../helper/WinnerHelper.js';

module.exports = function() {

  describe('Battle', () => {

    beforeEach(async () => {
      await this.createNewPage();
      let url = this.config.BASE_URL + "#stateless";
      this.mlog.log(`Opening ${url}`);
      await this.page.goto(url);
      await waitForTankCounter(this.page);
      await clickStartBattle(this.page);
      await waitForBattlefield(this.page);
    });
    
    it('should exit the battle', async () => {
      await clickExitBattle(this.page);

      let count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT);
    });

    it('should play the battle', async () => {
      await setNavBarSpeed(this.page, '50');
      await setNavBarQuality(this.page, '0');
      await waitForBattlefieldHide(this.page);
      let winner = await getWinnerName(this.page);
      assert(winner.length > 0, "Winner name is not empty");

      await restartBattle(this.page);
      let count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT);
    });


  });

}
