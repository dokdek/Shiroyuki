const Discord = require("discord.js");
const sizePlay = require("./size-play");

const serverQuestion = (user, datacenter) => {
  let serverList;
  let reactArray;
  if (datacenter === "Aether") {
    serverList = "🇬ilgamesh";
    reactArray = ["🇬"];
  } else if (datacenter === "Primal") {
    serverList = "🇵rimal";
  }

  const embeddedMessage = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("What is your server?")
    .setDescription(serverList);
  user
    .send(embeddedMessage)
    .then((msg) => {
      Promise.all([msg.react("🇬"), msg.react("🇵"), msg.react("🇨")])
        .then(() => {
          const filter = (reaction, user) => {
            return (
              reactArray.includes(reaction.emoji.name) &&
              user.id !== msg.author.id
            ); //filter for only the emojis the user reacted with.
          };
          msg.awaitReactions(filter, { max: 1 }).then((collected) => {
            const userReaction = collected.last();
            //extract this out to helper to reduce code clutter, too many servers.
            let server;
            if (userReaction.emoji.name === "🇬") {
              server = "Gilgamesh";
            }

            msg.delete();
            embeddedMessage
                .setTitle("What is the size of your FC?")
                .setDescription("Small: < 20 \n Medium: < 50 \n Large: > 100");
            user
              .send(embeddedMessage)
              .then((msg) => {
                Promise.all([msg.react("🇸"), msg.react("🇲"), msg.react("🇱")])
                  .then(() => {
                    const filter = (reaction, user) => {
                      return (
                        ["🇸", "🇲", "🇱"].includes(reaction.emoji.name) &&
                        user.id !== msg.author.id
                      ); //filter for only the emojis the user reacted with.
                    };
                    msg.awaitReactions(filter, { max: 1 }).then((collected) => {
                      const userReaction = collected.last();
                      //Need to add other sizes
                      let size;
                      if (userReaction.emoji.name === "🇸") {
                        size = "Small";
                      }
                      msg.delete();
                      user.send("playstyle placeholder");
                    });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = serverQuestion;
