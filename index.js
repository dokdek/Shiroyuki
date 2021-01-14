const Discord = require("discord.js");
const { token } = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Bot Ready!");
});

client.on("message", (message) => {
  if (message.content === "~init") {
    message.channel.send(`Initializing bot in ${message.channel} channel`);
    message.channel
      .send(`React whether you want to create or search listings`)
      .then((msg) => {
        Promise.all([msg.react("🔍"), msg.react("➕")]) //awaits for all promises to resolve before awaiting message.
          .then(() => {
            const filter = (reaction) => {
              return ["🔍", "➕"].includes(reaction.emoji.name); //filter for only the emojis the bot reacted with.
            };
            msg
              .awaitReactions(filter, { max: 2 })
              .then((collected) => {
                const userReaction = collected.first();
                console.log(userReaction);
                if (userReaction.emoji.name === "🔍") {
                  msg.channel.send("You wanted to search a listing.");
                } else {
                  msg.channel.send("You wanted to create a listing.");
                }
              })
              .catch((err) => {
                console.log("Error: " + err);
              });
          })
          .catch((err) => console.log("Error: " + err));
      })
      .catch((err) => console.log("Error: " + err));
  }
});

client.login(token);
