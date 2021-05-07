const Discord = require("discord.js");
const mongoose = require("mongoose");
const { token } = require("./config.json");
const greeting = require("./helpers/greeting");
const gelbooru = require("./helpers/gelbooru");
const randomHourly = require("./helpers/randomHourly");
const pixivSearch = require("./helpers/pixiv");
const topDaily = require("./helpers/top-daily");
const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi(); 

require("dotenv").config();

const client = new Discord.Client();
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
connection.once("open", () => {
  console.log("MongoDB connection established.");
});

client.once("ready", () => {
  console.log("refreshing pixiv token");
  pixiv.refreshAccessToken(process.env.PIXIV_TOKEN)
    .then(console.log("Refresh Successful"))
    .catch((err)=>{
      console.log(err);
    });
  console.log("Bot ready!");
  setInterval(refreshPixivToken,45 * 60 * 1000);
  client.user.setActivity("~help for help");
});

client.on("message", (message) => {
  if (
    message.content === "~init" &&
    message.channel.type === "text" &&
    message.member.hasPermission("ADMINISTRATOR")
  ) {
    message.channel
      .send(`Initializing bot in ${message.channel} channel`)
      .then((msg) => msg.delete({ timeout: 5000 }))
      .catch((err) => console.log(err));
    greeting(message);
  }
  if(message.content === "~help"){
    const embeddedGreeting = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("Commands")
    .addFields(
      { name: "~g [tags]", value: "Searches Gelbooru for specified tags, a space indicates separate tags, tags with a space between them are separated via an underscore '_'"},
      { name: "~p [tags]", value: "Searches Pixiv for specified tags, use Japanese for best results as searches using Pixiv tags, which are almost all in Japanese. Please don't use this command too much since it uses my personal Pixiv account."},
    );
    message.channel.send(embeddedGreeting);
  }
  const args = message.content.slice(2).split(" ");
  args.shift();
  if(message.content.startsWith("~g") && args.length > 0){
    gelbooru(message,args);
  }
  if(message.content.startsWith("~hourly")){
    randomHourly(message.channel);
  }
  if(message.content.startsWith("~daily")){
    topDaily(message, pixiv);
  }
  if(message.content.startsWith("~p")){
    pixivSearch(message, message.content.slice(2), pixiv);
  }
});

function refreshPixivToken(){
  console.log("refreshing pixiv token");
  client.user.setActivity("~help for help");
  pixiv.refreshAccessToken(process.env.PIXIV_TOKEN)
    .then(console.log("Refresh Successful"))
    .catch((err)=>{
      console.log(err);
    });
}

client.login(token);
