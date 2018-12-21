export const getChallengeCount = async (page) => {
  let result = await page.evaluate(() => {
    const rows = document.querySelectorAll('.challenge-list-item');
    return rows.length;
  });
  return result;
}

export const clickChallengeStart = async (page, index) => {
  let css = ".challenge-list > li:nth-child(" + (index+1) + ") > button";
  await page.waitFor(css);
  await page.click(css);
}


export const hasWonChallenge = async (page) => {
  await page.waitFor('.result-msg');
  let result = await page.evaluate(() => {
    const element = document.querySelector('.congrats-msg');
    return (element != null);
  });
  return result;
}

export const hasLoseChallenge = async (page) => {
  await page.waitFor('.result-msg');
  let result = await page.evaluate(() => {
    const element = document.querySelector('.defeat-msg');
    return (element != null);
  });
  return result;
}
