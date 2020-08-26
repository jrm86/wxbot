require("dotenv").config({ path: "/home/pi/Dev/wxbot/.env" });
const Discord = require("discord.js");
const client = new Discord.Client();

const { logger } = require("./modules/logger");
const { buildReport } = require("./modules/report");
const { getLocation } = require("./modules/postgres");

const request = require("request");

// Server Ready handler
client.on("ready", () => {
  logger.info("Server ready");

  // Announce to channel
  client.channels.fetch(process.env.CHANNELID).then((channel) => {
    channel.send("WXBOT Server is up!");
  });
});

// Log errors
client.on("error", (error) => {
  logger.error(error);
});

// Message handler
client.on("message", async (msg) => {
  // Look for wx#####
  let wxInvoke = msg.content.match(/wx[\d]{5}/g);

  // If invoked, start building reply
  if (wxInvoke) {
    let zipcode = wxInvoke.toString().substring(2, 7);

    logger.info(
      "Looking up zip code " + zipcode + " for " + msg.member.user.tag
    );

    // get city, state, lat, long
    const location = await getLocation(zipcode);

    // If NOT 'location', then it's an invalid zip
    if (location) {
      let city = location.city;
      let lat = location.lat;
      let long = location.long;

      var forecastOpts = {
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/onecall",
        qs: {
          appid: process.env.WXAPIKEY,
          lat: lat,
          lon: long,
          exclude: "minutely,hourly",
        },
      };

      // Request to get multi-day forecast
      request(forecastOpts, async function (err, res, body) {
        if (err) {
          logger.error(error.stack);
        }
        logger.info("OpenWeather API call successful");
        body = JSON.parse(body);

        // build the message
        let message = "Weather report for " + city + "\n\n";
        message += await buildReport(body);

        // Send the reply
        msg.reply(message);
      });
    } else {
      let err =
        "I had a problem looking up " +
        zipcode +
        ", but I've logged this query for review. For now, please try a different zip code.";
      logger.error("Could not look up" + zipcode);
      msg.reply(err);
    }
  }
});

client.login(process.env.DISCORDKEY);
