
import assert from "assert";
import {
  waitForNavBar,
  getNavBarQuality,
  setNavBarQuality,
  getNavBarSpeed,
  setNavBarSpeed,
  getActiveNavLink,
  clickNavLink
} from "../helper/NaviHelper.js";

module.exports = function() {

  describe('Navi', () => {

    beforeEach(async () => {
      await this.createNewPage();
      let url = this.config.BASE_URL + "#stateless";
      this.mlog.log(`Opening ${url}`);
      await this.page.goto(url);
      await waitForNavBar(this.page);
    });

    it('should have quality set to Auto by default', async () => {
      let value = await getNavBarQuality(this.page);
      assert.equal(value, "Auto");
    });

    it('should change quality level', async () => {
      let steps = [];
      steps['0'] = "Low";
      steps['0_5'] = "Normal";
      steps['1'] = "High";
      steps['auto'] = "Auto";

      for(var selector in steps) {
        await setNavBarQuality(this.page, selector);
        assert.equal(await getNavBarQuality(this.page), steps[selector]);
      }
    });

    it('should have speed set to Normal by default', async () => {
      let value = await getNavBarSpeed(this.page);
      assert.equal(value, "Normal");
    });

    it('should change speed level', async () => {

      let steps = [];
      steps['0_05'] = "Super Slow";
      steps['0_3'] = "Slow";
      steps['1'] = "Normal";
      steps['2'] = "Fast";
      steps['50'] = "Super Fast";

      for(var selector in steps) {
        await setNavBarSpeed(this.page, selector);
        assert.equal(await getNavBarSpeed(this.page), steps[selector]);
      }
    });


    it('should navigate betweeen sections', async () => {
      let navLink;
      await clickNavLink(this.page, 0);
      navLink = await getActiveNavLink(this.page);
      assert.equal('Editor', navLink);

      await clickNavLink(this.page, 1);
      navLink = await getActiveNavLink(this.page);
      assert.equal('Battle', navLink);

    });

  });

}
