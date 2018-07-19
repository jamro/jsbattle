export const waitForNavBar = async (page) => {
  await page.waitFor('nav');
}

export const getNavBarQuality = async (page) => {
  await page.waitFor('.sim-quality-button');
  let result = await page.evaluate(() => {
    const button = document.querySelector('.sim-quality-button');
    return button.innerHTML;
  });
  return result
    .replace(/.*:\s+([^<]+).*/, '$1')
    .replace(/^\s*/, "")
    .replace(/\s*$/, "");
}

export const setNavBarQuality = async (page, value) => {
  await page.waitFor('.sim-quality-button');
  await page.click('.sim-quality-button');
  await page.waitFor('.sim-quality-' + value);
  await page.click('.sim-quality-' + value)
}

export const getNavBarSpeed = async (page) => {
  await page.waitFor('.sim-speed-button');
  let result = await page.evaluate(() => {
    const button = document.querySelector('.sim-speed-button');
    return button.innerHTML;
  });
  return result
    .replace(/.*:\s+([^<]+).*/, '$1')
    .replace(/^\s*/, "")
    .replace(/\s*$/, "");
}

export const setNavBarSpeed = async (page, value) => {
  await page.waitFor('.sim-speed-button');
  await page.click('.sim-speed-button');
  await page.waitFor('.sim-speed-' + value);
  await page.click('.sim-speed-' + value)
}

export const getActiveNavLink = async (page) => {
  let result = await page.evaluate(() => {
    const button = document.querySelector('a.main-nav-link.active');
    return button.innerHTML;
  });
  return result
    .replace(/<.*>/g, '')
    .replace(/^\s*/, "")
    .replace(/\s*$/, "");
}

export const clickNavLink = async (page, index) => {
  let css = 'nav .nav-item:nth-of-type(' + (index+1) + ') a.main-nav-link';
  await page.waitFor(css);
  await page.click(css);
}
