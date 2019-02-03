export const skipLoading = async (page) => {
  await page.waitFor('.loading', {visible: true});
  await page.waitFor('.loading', {visible: false});
}

export const waitForBattlefield = async (page) => {
  await page.waitFor('canvas.battlefield');
}

export const waitForBattlefieldHide = async (page) => {
  await page.waitFor('canvas.battlefield', {visible:false});
}

export const clickExitBattle = async (page) => {
  let css = "button.exit-battle";
  await page.waitFor(css);
  await page.click(css);
}

export const restartBattle = async (page) => {
  let css = ".restart-battle";
  await page.waitFor(css);
  await page.click(css);
}
