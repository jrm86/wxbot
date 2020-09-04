const { createCanvas, loadImage } = require("canvas");
const { logger } = require("./logger");
const { formatDate, shortDate, getFTemp } = require("./wxbot-utils");

async function buildBanner(openWxApiRes, location) {
  logger.info("Building banner");
  const city = location.city;
  const state = location.state;

  const title = "Forecast for " + city + ", " + state;

  const date = formatDate(openWxApiRes.current.dt);

  const width = 1200;
  const height = 400;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  context.font = "bold 40pt Consolas";
  context.textAlign = "center";
  context.textBaseline = "top";

  const textWidth = context.measureText(title).width;
  context.fillStyle = "#fff";
  context.fillText(title, 600, 30);

  context.font = "bold 30pt Consolas";
  context.textAlign = "center";
  context.textBaseline = "top";

  context.fillText("Today is " + date, 600, 85);

  let chunkW = width / 10;

  context.font = "bold 15pt Consolas";
  context.textAlign = "left";
  context.textBaseline = "top";

  for(let index in openWxApiRes.daily){
    let day = openWxApiRes.daily[index];

    let dayDate = shortDate(day.dt);

    context.fillText(dayDate, chunkW * (parseInt(index)+1), 170);
    
    let wxIcon = day.weather[0].icon;
    let wxPNG = await loadImage("http://openweathermap.org/img/wn/" + wxIcon + "@2x.png");
    context.drawImage(wxPNG, chunkW * (parseInt(index)+1) , 200, 100, 100);

    let highFtemp = getFTemp(day.temp.max);
    let lowFtemp = getFTemp(day.temp.min);

    let highTemp = "H:" + highFtemp.toFixed(1) + "F";
    let lowTemp = "L:" + lowFtemp.toFixed(1) + "F";

    context.fillText(highTemp, chunkW * (parseInt(index)+1), 290);
    context.fillText(lowTemp, chunkW * (parseInt(index)+1), 320);
  }

  const buffer = canvas.toBuffer("image/png");

  return buffer;
}

module.exports = {
  buildBanner: buildBanner
}