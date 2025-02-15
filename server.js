const puppeteer = require("puppeteer");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const express = require("express");
const app = express();
const PORT = 5001;

async function callPuppeteer() {
  console.log("calling puppeteer");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.setViewport({
  //   width: 1200,
  //   // height: 2000,
  // });

  await page.goto(
    "https://www.freecodecamp.org/"
    // "http://localhost:4000/report?reportId=ab796188-0243-41f2-a4ae-c14af8d109ad&stage=https://api-dev-wn91hpduct.giger.training"
    // "https://gro-4220-compliance-onepage.admin.deel.wtf/compliance-insights/4bac7cad-e045-4cef-865b-872bff93086b/setup?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE3MjM0NDAzNjc1OTcsImFkbWluIjp0cnVlLCJkZWVsIjoicHJhc2hhbnQuYmFnaGVsQGRlZWwuY29tIiwiaWQiOjExOTY4NzIsImlhdCI6MTcyMzQ0MDM2NywiZXhwIjoxNzIzNDgzNTY3LCJhdWQiOiJkZXYiLCJpc3MiOiJhcGkuZGVlbC50cmFpbmluZyIsInN1YiI6ImFwaSJ9.mA5AbyFqzP8sXcz71iTlYIz78F5eai_cIW9K7ExAUT__hbydLEoU8Yqtrb0OMUxhZJPJaAlip2QQGSKEt3XkcFqMeIPJ-HbYqJGyXdDpuUEOhSKWsqXxXtRurlZlwFjC5AYt509V0dLycoytQ0CzwSWCkpyg4PuESr4AKmnfH5IOg-PNVNPJqtyKQnEBg1yXmg2pS9uc35cPHm1iZ-jcqvZ__BIRjfuK_bN0ADFcSbPIOAUpR_w91d5zBzi9VpS6CnNpLUaibmldw2Ywr20oLehpATiFE6n5E45WySIiF_gDH1LtKHBs8zlvNcTh2W4oKd6ySFhgg_DktB3hRWFj3Q"
  );

  await sleep(3500);

  // await page.screenshot({ path: "example.png" });

  // const totalPage = await page.$("html");
  // const boundingBox = await totalPage.boundingBox();

  await page.pdf({
    path: "example1.pdf",
    width: `${await page.evaluate(
      () =>
        // Math.max(
        document.body.scrollWidth
      // document.body.offsetWidth,
      // document.documentElement.clientWidth,
      // document.documentElement.scrollWidth,
      // document.documentElement.offsetWidth
      // )
    )}px`,
    height: `${await page.evaluate(
      () =>
        // Math.max(
        document.body.scrollHeight
      // document.body.offsetHeight,
      // document.documentElement.clientHeight,
      // document.documentElement.scrollHeight,
      // document.documentElement.offsetHeight
      // )
    )}px`,

    printBackground: true,
    preferCSSPageSize: false,
    waitForFonts: true,
  });

  await browser.close();
}

app.get("/", async (req, res) => {
  res.send("Welcome to Node.js API");
  console.log("received req at /");
  await callPuppeteer();
  console.log("served req at /");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
