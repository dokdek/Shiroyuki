const { Aether, Primal, Crystal } = require("../models/server.model");
const Discord = require("discord.js");

const showListing = (datacenter, server, size, playstyle, user, sort) => {
  if (datacenter === "Aether") {
    Aether.find(
      { server: server, size: size, playstyle: playstyle },
      (err, listings) => {
        if (err) {
          user.send("Error fetching, please contact my owner.");
        } else if (listings) {
          for (i = 0; i < listings.length; i++) {
            //May need to limit to 5 to get around rate limits.
            const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle(listings[i].name)
              .setDescription(listings[i].description);
            user.send(embeddedMessage);
          }
        }
      }
    );
  }
};

module.exports = showListing;
