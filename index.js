const Discord = require("discord.js");
const mongoose = require("mongoose");
const { token } = require("./config.json");
const greeting = require("./helpers/greeting");
const { Aether, Primal } = require("./models/server.model");

require("dotenv").config();

const client = new Discord.Client();
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
connection.once("open", () => {
  console.log("MongoDB connection established.");
});

client.once("ready", () => {
  console.log("Bot ready!");
  client.user.setActivity("Under Development");
});

client.on("message", (message) => {
  if (
    message.content === "~init" &&
    message.member.hasPermission("ADMINISTRATOR")
  ) {
    message.channel
      .send(`Initializing bot in ${message.channel} channel`)
      .then((msg) => msg.delete({ timeout: 5000 }))
      .catch((err) => console.log(err));
    greeting(message);
  }
  const commandArgs = message.content.split(" ");
  if (commandArgs[0] === "~create") {
    console.log("Creating");
    if (commandArgs[1].toLowerCase() === "aether") {
      const newListing = new Aether({
        listingType: "guild",
        server: commandArgs[2],
        name: commandArgs[3],
        size: commandArgs[4],
        playstyle: commandArgs[5],
      });
      newListing.save()
        .then((listing)=>message.channel.send("New listing created, add description by this id " + listing._id))
        .catch((err)=>console.log(err));
    }
  }
});

client.login(token);
