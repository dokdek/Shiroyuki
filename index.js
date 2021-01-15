const Discord = require("discord.js");
const { token } = require("./config.json");
const greeting = require("./helpers/greeting");


const client = new Discord.Client();

client.once("ready", () => {
  console.log("Bot Ready!");
  client.user.setActivity('Under Development')
});

client.on("message", (message) => {
  if (message.content === "~init" && message.member.hasPermission('ADMINISTRATOR')){
    message.channel.send(`Initializing bot in ${message.channel} channel`)
    .then((msg)=>msg.delete({timeout: 5000}))
    .catch((err)=>console.log(err));
    greeting(message);
  }
});

client.login(token);
