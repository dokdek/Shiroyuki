const Discord = require("discord.js");

const sizePlay = (user, reaction) => {

    const embeddedMessage = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("What is the size of your FC?")
    .setDescription("Small: < 20 \n Medium: < 50 \n Large: > 100");
  user
    .send(embeddedMessage)
    .then((msg) => {
      Promise.all([msg.react("🇸"), msg.react("🇲"), msg.react("🇱")])
        .then(() => {
          const filter = (reaction, user) => {
            return (
              ["🇸","🇲","🇱"].includes(reaction.emoji.name) &&
              user.id !== msg.author.id
            ); //filter for only the emojis the user reacted with.
          };
          msg.awaitReactions(filter, { max: 1 }).then((collected) => {
            const userReaction = collected.last();
            msg.delete();
            sizePlay(user, userReaction);
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = sizePlay;