export const getWinnerName = async (page) => {
  await page.waitFor('.winner-name');
  let result = await page.evaluate(() => {
    const name = document.querySelector('.winner-name');
    return name.innerHTML;
  });
  return result;
}
