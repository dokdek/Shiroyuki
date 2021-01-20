const Discord = require("discord.js");
const serverSave = require("./server-save");

const aetherServers = [
  "adamantoise",
  "cactaur",
  "faerie",
  "gilgamesh",
  "jenova",
  "midgardsormr",
  "sargatanas",
  "siren",
];
const primalServers = [
  "behemoth",
  "excalibur",
  "exodus",
  "famfrit",
  "hyperion",
  "lamia",
  "leviathan",
  "ultros",
];
const crystalServers = [
  "balmung",
  "brynhildr",
  "coeurl",
  "diabolos",
  "goblin",
  "malboro",
  "mateus",
  "zalera",
];

//Make it into a promise function chain instead of doing whatever this awful chain is.


const serverQuestion = (user, datacenter) => {

  let serverList = "";
  let serverArray;
  if (datacenter === "Aether") {
    aetherServers.forEach(element => {
      serverList += element + "\n"
    });
    serverArray = aetherServers;
  } else if (datacenter === "Primal") {
    primalServers.forEach(element => {
      serverList += element + "\n";
    });
    serverArray = primalServers;
  }else{
    crystalServers.forEach(element => {
      serverList += element + "\n";
    });
    serverArray = crystalServers;
  }

  const embeddedMessage = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("What is your server?")
    .setDescription(serverList);
  user
    .send(embeddedMessage)
    .then((msg) => {
      
      const dmFilter = (m) => m.content.length > 0 && user.id !== msg.author.id;
      const serverFilter = (m) => m.content.length > 0 && user.id !== msg.author.id && serverArray.includes(m.content);
      
      user.dmChannel
        .awaitMessages(serverFilter, { max: 1 })
        .then((collected) => {
          let server = collected.last();
          embeddedMessage
            .setTitle("What is the size of your FC?")
            .setDescription("Small: < 20 \n Medium: < 50 \n Large: > 100");
          user
            .send(embeddedMessage)
            .then((msg) => {
              let name;
              let description;
              Promise.all([msg.react("🇸"), msg.react("🇲"), msg.react("🇱")])
                .then(() => {
                  const filter = (reaction, user) => {
                    return (
                      ["🇸", "🇲", "🇱"].includes(reaction.emoji.name) &&
                      user.id !== msg.author.id
                    ); //filter for only the emojis the user reacted with.
                  };
                  msg
                    .awaitReactions(filter, { max: 1 })
                    .then((collected) => {
                      const userReaction = collected.last();
                      //Need to add other sizes
                      let size;
                      if (userReaction.emoji.name === "🇸") {
                        size = "Small";
                      }else if(userReaction.emoji.name === "🇲"){
                        size = "Medium";
                      }else{
                        size = "Large";
                      }
                      msg.delete();
                      embeddedMessage
                        .setTitle("What is the playstyle of your FC?")
                        .setDescription(
                          "🇨asual\n🇲idcore\n🇭ardcore/competitive"
                        );
                      user
                        .send(embeddedMessage)
                        .then((msg) => {
                          Promise.all([
                            msg.react("🇨"),
                            msg.react("🇲"),
                            msg.react("🇭"),
                          ])
                            .then(() => {
                              const filter = (reaction, user) => {
                                return (
                                  ["🇨", "🇲", "🇭"].includes(
                                    reaction.emoji.name
                                  ) && user.id !== msg.author.id
                                ); //filter for only the emojis the user reacted with.
                              };
                              msg
                                .awaitReactions(filter, { max: 1 })
                                .then((collected) => {
                                  const userReaction = collected.last();
                                  //Need to add other playstyles
                                  let playstyle;
                                  if (userReaction.emoji.name === "🇨") {
                                    playstyle = "Casual";
                                  }else if(userReaction.emoji.name === "🇲"){
                                    playstyle = "Midcore";
                                  }else{
                                    playstyle = "Hardcore/competitive";
                                  }
                                  msg.delete();
                                  embeddedMessage
                                    .setTitle("What is the name of your FC?")
                                    .setDescription("Please type below");
                                  user
                                    .send(embeddedMessage)
                                    .then((msg) => {
                                      user.dmChannel
                                        .awaitMessages(dmFilter, { max: 1 })
                                        .then((collected) => {
                                          name = collected.first();
                                          embeddedMessage
                                            .setTitle(
                                              "Please list a description"
                                            )
                                            .setDescription(
                                              "Please type below"
                                            );
                                          user
                                            .send(embeddedMessage)
                                            .then((msg) => {
                                              user.dmChannel
                                                .awaitMessages(dmFilter, {
                                                  max: 1,
                                                })
                                                .then((collected) => {
                                                  description = collected.first();
                                                  serverSave(
                                                    datacenter,
                                                    server,
                                                    name,
                                                    description,
                                                    size,
                                                    playstyle,
                                                    user
                                                  );
                                                })
                                                .catch((err) =>
                                                  console.log(err)
                                                );
                                            })
                                            .catch((err) => console.log(err));
                                        })
                                        .catch((err) => console.log(err));
                                    })
                                    .catch((err) => console.log(err));
                                })
                                .catch((err) => console.log(err));
                            })
                            .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = serverQuestion;
