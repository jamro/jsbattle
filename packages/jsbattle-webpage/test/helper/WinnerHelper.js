export const getWinnerName = async (page) => {
  await page.waitFor('.winner-name');
  let result = await page.evaluate(() => {
    const name = document.querySelector('.winner-name');
    return name.innerHTML;
  });
  return result;
}

export const getWinnerScore = async (page) => {
  await page.waitFor('td.battle-result-score');
  let result = await page.evaluate(() => {
    const name = document.querySelector('td.battle-result-score');
    return name.innerHTML;
  });
  return result;
}

export const clickGetShareLink = async (page) => {
  let css = "button#battle-share-button";
  await page.waitFor(css);
  await page.click(css);
}

export const getShareLink = async (page) => {
  await page.waitFor('input#battle-share-link');
  let result = await page.evaluate(() => {
    const name = document.querySelector('input#battle-share-link');
    return name.value;
  });
  return result;
}
