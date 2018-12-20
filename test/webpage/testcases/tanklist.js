
import assert from "assert";
import {
  waitForTankCounter,
  getTotalTankCounter,
  getSingleTankCounter,
  getTankTableNames,
  clickTankCounterPlus,
  clickTankCounterMinus,
  clickCreateTank,
  clickRemoveTank,
  isStartButtonEnabled,
  clickEditTank
} from '../helper/TankListHelper.js';
import {
  getActiveNavLink,
  clickNavLink
} from '../helper/NaviHelper.js';
import {
  getEditorTankName
} from '../helper/EditorHelper.js';


module.exports = function() {


  describe('Tank List', () => {

    beforeEach(async () => {
      await this.createNewPage();
      let url = this.config.BASE_URL + "#stateless";
      this.mlog.log(`Opening ${url}`);
      await this.page.goto(url);
      await clickNavLink(this.page, "battlefield");
      await waitForTankCounter(this.page);
    });

    it('should have all tanks selected by default', async () => {
      let count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT);

      let names = await getTankTableNames(this.page);
      for(var name of names) {
        assert(name.length > 0, `name of tank is not epmty`)
      }
      assert.equal(names.length, this.config.DEFAULT_TANK_COUNT);
    });

    it('should have one tank of each type selected by default', async () => {
      let count;
      for(let i=0; i < this.config.DEFAULT_TANK_COUNT; i++) {
        count = await getSingleTankCounter(this.page, i);
        assert.equal(1, count);
      }
    });

    it('should change amount of tanks', async () => {
      let i, count;

      for(i=0; i < this.config.DEFAULT_TANK_COUNT; i++) {
        await clickTankCounterPlus(this.page, i);
        await clickTankCounterPlus(this.page, i);
        await clickTankCounterMinus(this.page, i);
        await clickTankCounterPlus(this.page, i);
      }
      for(i=0; i < this.config.DEFAULT_TANK_COUNT; i++) {
        count = await getSingleTankCounter(this.page, i);
        assert.equal(3, count);
      }
      let total = await getTotalTankCounter(this.page);
      assert.equal(total, this.config.DEFAULT_TANK_COUNT * 3);
    });

    it('should not decrease amount of tanks below zero', async () => {
      let index = 0;
      await clickTankCounterMinus(this.page, index);
      await clickTankCounterMinus(this.page, index);
      await clickTankCounterMinus(this.page, index);
      let count = await getSingleTankCounter(this.page, index);
      assert.equal(0, count);
    });

    it('should not increase amount of tanks above ten', async () => {
      let index = 0;
      for(let i=0; i < 20; i++) {
        await clickTankCounterPlus(this.page, index);
      }
      let count = await getSingleTankCounter(this.page, index);
      assert.equal(10, count);
    });

    it('should add tanks to the list', async () => {
      await clickCreateTank(this.page);
      await clickCreateTank(this.page);
      let count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT+2);
    });

    it('should remove tanks from the list', async () => {
      let count;
      await clickCreateTank(this.page);
      count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT+1);

      await clickRemoveTank(this.page, 0, false); // not confirmed... no action
      count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT+1);

      await clickRemoveTank(this.page, 0, true);
      count = await getTotalTankCounter(this.page);
      assert.equal(count, this.config.DEFAULT_TANK_COUNT);

    });

    it('should not start the battle when not enough tanks', async () => {
      let i, enabled;
      enabled = await isStartButtonEnabled(this.page);
      assert(enabled, "Start battle button is enabled");
      for(i=0; i < this.config.DEFAULT_TANK_COUNT; i++) {
        await clickTankCounterMinus(this.page, i);
      }
      enabled = await isStartButtonEnabled(this.page);
      assert(!enabled, "Start battle button is disabled");
      await clickTankCounterPlus(this.page, 0);
      enabled = await isStartButtonEnabled(this.page);
      assert(!enabled, "Start battle button is disabled");
      await clickTankCounterPlus(this.page, 0);
      enabled = await isStartButtonEnabled(this.page);
      assert(enabled, "Start battle button is enabled");
    });

    it('should edit new tank', async () => {
      await clickCreateTank(this.page);
      let names = await getTankTableNames(this.page);
      let tankName = names[0];
      await clickEditTank(this.page, 0);
      let navLink = await getActiveNavLink(this.page);
      assert.equal('Editor', navLink);
      let editorName = await getEditorTankName(this.page);
      assert.equal(tankName, editorName);
    });

  });

}
