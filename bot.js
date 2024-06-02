require("dotenv").config();
const axios = require("axios");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.on("message", async (ctx) => {
  console.log(ctx.message);
  if (ctx.message.location) {
    console.log(ctx.message.location);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&units=metric&appid=${process.env.WEATHER_APPID}`;
    const response = await axios.get(url);
    console.log(response);
    ctx.reply(`${response.data.name} : ${response.data.main.temp} °C`);
  }
});

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
