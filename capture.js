const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 }, // iPhone SE size
  });
  const path = require('path');
  const filePath = "file:///" + path.resolve("c:/Users/USER/Desktop/이상윤/전주점 랜딩 홈페이지_260326/전주점 랜딩 홈페이지_260325 - 복사본/index.html");
  await page.goto(filePath);
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_1.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_2.png', fullPage: false });

  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_3.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_4.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_5.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_6.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_7.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_view_8.png', fullPage: false });
  
  await browser.close();
})();
