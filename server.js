const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const path = require("path");
app.use(express.static(path.join("client/build")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(port);
});

app.post("/get-youtube-subtitles-link", async (request, response) => {
  let subtitles = { link: "" };
  try {
    let { youtubeLink } = request.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(youtubeLink);
    const clicked = await page.evaluate(async () => {
      document
        .getElementsByClassName("ytp-subtitles-button ytp-button")[0]
        .click();
      return true;
    });
    if (clicked) {
      let response = await page.waitForResponse(
        (response) => response.url().indexOf("/api/timedtext?v=") > -1
      );
      subtitles.link = response.url();
    }

    await browser.close();
  } catch (error) {
    subtitles.link = "";
  }
  response.json(subtitles);
});
