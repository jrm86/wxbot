require('dotenv').config({path: '/home/pi/Dev/wxbot/.env'});
const Discord = require('discord.js');
const client = new Discord.Client();

const {logger} = require('./modules/logger');

const request = require("request");

client.on('ready', ()=>{
    logger.info('Server ready');
});

client.on('disconnect', ()=>{

});

client.on('message', msg=>{

    let wxInvoke = msg.content.match(/wx[\d]{5}/g);

    if(msg.author.username != "WXBOT" && wxInvoke){

        let zipcode = wxInvoke.toString().substring(2,7);

        logger.info('Looking up zip code ' + zipcode + ' for ' + msg.member.user.tag);

        var options = {
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            qs: {appid: process.env.WXAPIKEY, zip: zipcode}
          };
          
          request(options, function (error, response, body) {
            if (error) {
                logger.error(error.stack);
            }

            body = JSON.parse(body);

            let message;

            if(body.weather){
                message = "The weather is " + body.weather[0].description + " in " + body.name;
                logger.info(message);
            }
            else {
                message = "I had a problem looking up " + zipcode + ", but I've logged this query for review. For now, please try a different zip code.";
                logger.error("Could not look up" + zipcode);
            }

            msg.reply(message);
          });
    }
});

client.login(process.env.DISCORDKEY);