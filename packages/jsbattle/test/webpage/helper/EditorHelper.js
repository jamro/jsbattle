export const getEditorTankName = async (page) => {
  let result = await page.evaluate(() => {
    const name = document.querySelector('.tank-name-view');
    return name.innerHTML;
  });
  return result;
}

export const getTankTableNames = async (page) => {
  let result = await page.evaluate(() => {
    const names = document.querySelectorAll('table.ai-table tbody tr .tank-name');
    return Object.values(names).map((el) => el.innerHTML)
  });
  return result;
}

export const clickCreateTank = async (page) => {
  let css = "button.create-tank";
  await page.waitFor(css);
  await page.click(css);
}

export const clickRemoveTank = async (page, index, confirm) => {
  let css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove";
  await page.waitFor(css);
  await page.click(css);

  if(confirm) {
    css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-yes";
    await page.waitFor(css);
    await page.click(css);
  } else {
    css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-no";
    await page.waitFor(css);
    await page.click(css);
  }
}

export const clickEditTank = async (page, index, confirm) => {
  let css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-edit";
  await page.waitFor(css);
  await page.click(css);
}

export const editTankName = async (page, name, confirm) => {
  let css = ".rename-button";
  await page.waitFor(css);
  await page.click(css);
  css = '.ai-name-input';
  await page.waitFor(css);
  await page.type(css, name);
  if(confirm) {
    css = '.button-name-confirm';
  } else {
    css = '.button-name-cancel';
  }
  await page.waitFor(css);
  await page.click(css);
}

export const clickEditorClose = async (page) => {
  let css = ".editor-close";
  await page.waitFor(css);
  await page.click(css);
}

export const writeCode = async (page, code) => {
  let css = ".code-editor";
  await page.waitFor(css);
  await page.evaluate((css, code) => {
    const txt = document.querySelector(css);
    txt.codeMirror.setValue(code);
  }, css, code);
}

export const getCode = async (page) => {
  let css = ".code-editor";
  await page.waitFor(css);
  let code = await page.evaluate((css, code) => {
    const txt = document.querySelector(css);
    return txt.codeMirror.getValue();
  }, css);
  return code;
}

export const isSavingEnabled = async (page) => {
  let result = await page.evaluate(() => {
    const button = document.querySelector('button.editor-save');
    return button.className.split(" ").indexOf("disabled") === -1;
  });
  return result;
}

export const clickFight = async (page) => {
  let css = ".editor-fight";
  await page.waitFor(css);
  await page.click(css);
}

export const clickSave = async (page) => {
  let css = "button.editor-save";
  await page.waitFor(css);
  await page.click(css);
}
