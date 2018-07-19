import assert from "assert";

import {
  getEditorTankName,
  clickCreateTank,
  clickEditTank,
  editTankName,
  clickEditorClose,
  getTankTableNames,
  writeCode,
  getCode,
  isSavingEnabled,
  clickQuickFight,
  clickSave
} from "../helper/EditorHelper.js"
import {
  clickNavLink,
  getActiveNavLink
} from "../helper/NaviHelper.js"
import {
  waitForBattlefield
} from "../helper/BattleHelper.js"
module.exports = function() {

  describe('Editor', () => {

    beforeEach(async () => {
      await this.createNewPage();
      let url = this.config.BASE_URL + "#stateless";
      this.mlog.log(`Opening ${url}`);
      await this.page.goto(url);
      await clickNavLink(this.page, 0);
      await clickCreateTank(this.page);
      await clickEditTank(this.page, 0);
    });

    it('should rename the script when confirmed', async () => {
      let oldName = await getEditorTankName(this.page);
      await editTankName(this.page, "blablabla", true);
      let newName = await getEditorTankName(this.page);

      assert.equal("blablabla", newName);
      assert(newName != oldName, "name has changed");

    });

    it('should not rename the script when canceled', async () => {
      let oldName = await getEditorTankName(this.page);
      await editTankName(this.page, "blablabla", false);
      let newName = await getEditorTankName(this.page);

      assert.equal(oldName, newName);
    });

    it('should exit editor', async () => {
      await clickEditorClose(this.page);
      let names = await getTankTableNames(this.page);
      assert.equal(1, names.length);
    });

    it('should start a quick fight', async () => {
      await clickQuickFight(this.page);
      await waitForBattlefield(this.page);
      let navLink = await getActiveNavLink(this.page);
      assert.equal('Battle', navLink)
    });

    it('should allow code editing', async () => {
      await writeCode(this.page, "blabla");
      let code = await getCode(this.page);
      assert.equal("blabla", code);
    });

    it('should allow saving when code changed', async () => {
      let oldCode = await getCode(this.page);
      let saving = await isSavingEnabled(this.page);
      assert(!saving, "saving disabled");

      await writeCode(this.page, "blabla");
      saving = await isSavingEnabled(this.page);
      assert(saving, "saving enabled");

      await writeCode(this.page, oldCode);
      saving = await isSavingEnabled(this.page);
      assert(!saving, "saving disabled");
    });

    it('should save changes', async () => {
      await writeCode(this.page, "blabla");
      await clickSave(this.page);
      await clickEditorClose(this.page);
      await clickEditTank(this.page, 0);
      let code = await getCode(this.page);
      assert.equal("blabla", code);
    });

  });

}
