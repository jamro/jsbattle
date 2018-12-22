import assert from "assert";
import {
  setNavBarSpeed,
  setNavBarQuality,
  clickNavLink
} from '../helper/NaviHelper.js';
import {
  getChallengeCount,
  clickChallengeStart,
  hasLoseChallenge,
  hasWonChallenge
} from '../helper/ChallengeHelper.js';
import {
  clickFight,
  writeCode
} from '../helper/EditorHelper.js';
import {
  skipLoading,
  waitForBattlefield,
  waitForBattlefieldHide,
  clickExitBattle,
  restartBattle
} from '../helper/BattleHelper.js';

module.exports = function() {

  beforeEach(async () => {
    await this.createNewPage();
    let url = this.config.BASE_URL + "#stateless";
    this.mlog.log(`Opening ${url}`);
    await this.page.goto(url);
    await clickNavLink(this.page, "challenges");
  });

  describe('Challenges', async () => {
    it('should list challenges', async () => {
      let challengeCount = await getChallengeCount(this.page);
      assert(challengeCount > 0, "Challenge count is grater than zero");
    });

    it('should win the battle', async () => {
      this.retries(3);
      let code = 'importScripts("lib/tank.js");var tartgetAngle;tank.init(function(a,t){tartgetAngle=0}),tank.loop(function(a,t){var e=Math.deg.normalize(tartgetAngle-a.angle);if(t.TURN=.2*e,Math.abs(e)<5?t.THROTTLE=1:t.THROTTLE=0,a.collisions.wall&&(tartgetAngle+=Math.randomRange(45,180),t.THROTTLE=0),t.DEBUG={tartgetAngle:tartgetAngle},t.RADAR_TURN=1,a.radar.enemy){t.THROTTLE=0,t.TURN=0,t.RADAR_TURN=0;var n=Math.deg.atan2(a.radar.enemy.y-a.y,a.radar.enemy.x-a.x),g=Math.deg.normalize(n-a.angle-a.gun.angle);t.GUN_TURN=.2*g,t.SHOOT=1}});';

      await setNavBarSpeed(this.page, '50');
      await setNavBarQuality(this.page, '0');
      await clickChallengeStart(this.page, 0);
      await writeCode(this.page, code);
      await clickFight(this.page);
      await waitForBattlefield(this.page);
      await waitForBattlefieldHide(this.page);
      let hasWon = await hasWonChallenge(this.page)
      assert(hasWon, "has won the battle");
    });

    it('should lose the battle', async () => {
      await setNavBarSpeed(this.page, '50');
      await setNavBarQuality(this.page, '0');
      await clickChallengeStart(this.page, 0);
      await clickFight(this.page);
      await waitForBattlefield(this.page);
      await waitForBattlefieldHide(this.page);
      let hasLose = await hasLoseChallenge(this.page)
      assert(hasLose, "has lose the battle");
    });
  });
}
