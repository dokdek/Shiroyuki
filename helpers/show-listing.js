const { Aether, Primal, Crystal } = require("../models/server.model");
const Discord = require("discord.js");

function dateSort(a , b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return 0;
    }
}

const showListing = (datacenter, server, size, playstyle, user, sort) => {
  if (datacenter === "Aether") {
    Aether.find(
      { server: server, size: size, playstyle: playstyle },
      (err, listings) => {
        if (err) {
          user.send("Error fetching, please contact my owner.");
        } else if (listings.length > 0) {
          if(sort === "descending"){
            listings.sort(dateSort);
          }
          for (i = 0; i < listings.length; i++) {
            //May need to limit to 5 to get around rate limits.
            const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle(listings[i].name)
              .setDescription(listings[i].description)
              .addFields(
                { name: 'Server', value: server, inline: true },
                { name: 'Playstyle', value: playstyle, inline: true },
                { name: 'Size', value: size, inline: true },
              )
              .setFooter("Created at: " + listings[i].createdAt);
            user.send(embeddedMessage);
          }
        } else{
          const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle("None found :(");
            user.send(embeddedMessage);
        }
      }
    );
  }else if(datacenter === "Primal"){
    Primal.find(
      { server: server, size: size, playstyle: playstyle },
      (err, listings) => {
        if (err) {
          user.send("Error fetching, please contact my owner.");
        } else if (listings.length > 0) {
          if(sort === "descending"){
            listings.sort(dateSort);
          }
          for (i = 0; i < listings.length; i++) {
            //May need to limit to 5 to get around rate limits.
            const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle(listings[i].name)
              .setDescription(listings[i].description)
              .addFields(
                { name: 'Server', value: server, inline: true },
                { name: 'Playstyle', value: playstyle, inline: true },
                { name: 'Size', value: size, inline: true },
              )
              .setFooter("Created at: " + listings[i].createdAt);
            user.send(embeddedMessage);
          }
        } else{
          const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle("None found :(");
            user.send(embeddedMessage);
        }
      }
    );
  }else if(datacenter === "Crystal"){
    Crystal.find(
      { server: server, size: size, playstyle: playstyle },
      (err, listings) => {
        if (err) {
          user.send("Error fetching, please contact my owner.");
        } else if (listings.length > 0) {
          if(sort === "descending"){
            listings.sort(dateSort);
          }
          for (i = 0; i < listings.length; i++) {
            //May need to limit to 5 to get around rate limits.
            const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle(listings[i].name)
              .setDescription(listings[i].description)
              .addFields(
                { name: 'Server', value: server, inline: true },
                { name: 'Playstyle', value: playstyle, inline: true },
                { name: 'Size', value: size, inline: true },
              )
              .setFooter("Created at: " + listings[i].createdAt);
            user.send(embeddedMessage);
          }
        } else{
          const embeddedMessage = new Discord.MessageEmbed()
              .setColor("#DBFFFF")
              .setTitle("None found :(");
            user.send(embeddedMessage);
        }
      }
    );
  }
};

module.exports = showListing;
