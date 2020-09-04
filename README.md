# WXBOT Weather Discord Bot

Get a weather forecast from Discord. This is a work in progress and
something I'm just doing for fun. Code is messy at first and things 
will change (often) while I come back to clean up and organize.

NPM [node-canvas](https://www.npmjs.com/package/canvas) is used. Pay attention 
to their documentation. I have this running on a Raspberry Pi and had to 
build from source and install prereqs on the underlying OS. Just a bit 
more involved than your typical `npm install ...`

Invoke WXBOT by typing 'wx#####', where ##### is a 5-digit zip code.

WXBOT uses data from [OpenWeather API](https://openweathermap.org/api) to 
create a simple forecast graphic.
