
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
  setNavBarQuality,
  clickNavLink
} from '../helper/NaviHelper.js';
import {
  getWinnerName,
  getWinnerScore,
  clickGetShareLink,
  getShareLink
} from '../helper/WinnerHelper.js';

module.exports = function() {

  describe('Battle', () => {

    beforeEach(async () => {
      await this.createNewPage();
      let url = this.config.BASE_URL + "#stateless";
      this.mlog.log(`Opening ${url}`);
      await this.page.goto(url);
      await clickNavLink(this.page, "battlefield");
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

    it('should generate battle share link', async () => {
      await setNavBarSpeed(this.page, '50');
      await setNavBarQuality(this.page, '0');
      await waitForBattlefieldHide(this.page);
      let winnerName1 = await getWinnerName(this.page);
      let winnerScore1 = await getWinnerScore(this.page);
      await clickGetShareLink(this.page)
      let shareLink = await getShareLink(this.page);
      let urlPattern = /^https?:\/\/localhost.*\/.*$/;
      assert(urlPattern.test(shareLink), "Battle share link has proper format");

      await this.createNewPage();
      await this.page.goto(shareLink);
      await waitForBattlefield(this.page);
      await setNavBarSpeed(this.page, '50');
      await setNavBarQuality(this.page, '0');
      await waitForBattlefieldHide(this.page);
      let winnerName2 = await getWinnerName(this.page);
      let winnerScore2 = await getWinnerScore(this.page);

      assert.equal(winnerName1, winnerName2);
      assert.equal(winnerScore1, winnerScore2);
    });


  });

}
