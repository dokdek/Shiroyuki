const Discord = require("discord.js");

const greeting = (message) => {
  const embeddedGreeting = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("FFXIV Guild Board")
    .setDescription(
      "Search listings by reacting with 🔍 \n Create listings by reacting with 📤"
    );
  message.channel
    .send(embeddedGreeting)
    .then((msg) => {
      Promise.all([msg.react("🔍"), msg.react("📤")]) //awaits for all promises to resolve before awaiting message.
        .then(() => {
          const filter = (reaction, user) => {
            return (
              ["🔍", "📤"].includes(reaction.emoji.name) &&
              user.id !== msg.author.id
            ); //filter for only the emojis the bot reacted with.
          };
          msg
            .awaitReactions(filter, { max: 1 })
            .then((collected) => {
              const userReaction = collected.last();
              if (userReaction.emoji.name === "🔍") {
                console.log(userReaction.users.cache.last().username);
                userReaction.users.cache
                  .last()
                  .send("You wanted to search a listing.");
                  msg.delete();
                greeting(message);
              } else {
                console.log(userReaction.users.cache.last().username);
                userReaction.users.cache
                  .last()
                  .send("You wanted to create a listing.");
                  msg.delete();
                greeting(message);
              }
            })
            .catch((err) => {
              console.log("Error: " + err);
            });
        })
        .catch((err) => console.log("Error: " + err));
    })
    .catch((err) => console.log("Error: " + err));
};
module.exports = greeting;
