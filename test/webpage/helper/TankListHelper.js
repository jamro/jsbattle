export const waitForTankCounter = async (page) => {
  await page.waitFor('.tank-counter');
}

export const getTotalTankCounter = async (page) => {
  await page.waitFor('.tank-counter');
  let result = await page.evaluate(() => {
    const button = document.querySelector('.tank-counter');
    return button.innerHTML;
  });
  return result;
}


export const getTankTableNames = async (page) => {
  await page.waitFor('table.tank-table tbody tr .tank-name');
  let result = await page.evaluate(() => {
    const names = document.querySelectorAll('table.tank-table tbody tr .tank-name');
    return Object.values(names).map((el) => el.innerHTML)
  });
  return result;
}

export const getSingleTankCounter = async (page, index) => {
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") .numeric-input input";
  await page.waitFor(css);
  let result = await page.evaluate((css) => {
    const field = document.querySelector(css);
    return field.value;
  }, css);
  return result;
}

export const clickTankCounterPlus = async (page, index) => {
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") .numeric-input button.plus";
  await page.waitFor(css);
  await page.click(css);
}


export const clickTankCounterMinus = async (page, index) => {
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") .numeric-input button.minus";
  await page.waitFor(css);
  await page.click(css);
}

export const clickCreateTank = async (page) => {
  let css = "button.create-tank";
  await page.waitFor(css);
  await page.click(css);
}

export const clickRemoveTank = async (page, index, confirm) => {
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove";
  await page.waitFor(css);
  await page.click(css);

  if(confirm) {
    css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-yes";
    await page.waitFor(css);
    await page.click(css);
  } else {
    css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-no";
    await page.waitFor(css);
    await page.click(css);
  }
}

export const isStartButtonEnabled = async (page) => {
  let result = await page.evaluate(() => {
    const button = document.querySelector('button.start-battle');
    return button.className.split(" ").indexOf("disabled") === -1;
  });
  return result;
}

export const clickStartBattle = async (page) => {
  let css = "button.start-battle";
  await page.waitFor(css);
  await page.click(css);
}

export const clickEditTank = async (page, index, confirm) => {
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-edit";
  await page.waitFor(css);
  await page.click(css);
}
