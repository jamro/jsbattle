import assert from "assert";

import {
  getTankTableNames,
  clickCreateTank,
  clickRemoveTank,
  clickEditTank,
  getEditorTankName
} from "../helper/EditorHelper.js"
import {
  clickNavLink
} from "../helper/NaviHelper.js"

module.exports = function() {

  describe('Ai Repository', () => {

    beforeEach(async () => {
      await this.createNewPage();
      let url = this.config.BASE_URL + "#stateless";
      this.mlog.log(`Opening ${url}`);
      await this.page.goto(url);
      await clickNavLink(this.page, "editor");
    });

    it('should have empty list of tanks by default', async () => {
      let names = await getTankTableNames(this.page);
      assert(names.length == 0, 'there is no AI on the list');
    });

    it('should create new AI', async () => {
      await clickCreateTank(this.page);
      await clickCreateTank(this.page);
      await clickCreateTank(this.page);
      let names = await getTankTableNames(this.page);
      assert.equal(3, names.length);
    });

    it('should remove AI', async () => {
      await clickCreateTank(this.page);
      await clickCreateTank(this.page);
      await clickCreateTank(this.page);
      let names = await getTankTableNames(this.page);
      assert.equal(3, names.length);
      await clickRemoveTank(this.page, 0 , false); // no confirm
      names = await getTankTableNames(this.page);
      assert.equal(3, names.length);
      await clickRemoveTank(this.page, 0 , true); // confirm
      names = await getTankTableNames(this.page);
      assert.equal(2, names.length);
    });


    it('should open editor', async () => {
      await clickCreateTank(this.page);
      let names = await getTankTableNames(this.page);
      let tankName = names[0];
      await clickEditTank(this.page, 0);
      let editorName = await getEditorTankName(this.page);
      assert.equal(tankName, editorName);
    });

  });

}
