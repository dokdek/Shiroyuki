const {Aether, Primal} = require("../models/server.model");
const Discord = require ("discord.js");


const serverSave = (datacenter, server, name, description, size, playstyle, user) => {
    (datacenter === "Aether")
    const newListing = new Aether({
        server: server,
        listingType: "Guild",
        name: name,
        description: description,
        size: size,
        playstyle: playstyle
    })
    newListing.save()
        .then(()=>{
            console.log("Added new listing.");
            const embeddedMessage = new Discord.MessageEmbed()
            .setColor("#DBFFFF")
            .setTitle("Successfully added new listing!");
            user.dmChannel.send(embeddedMessage);
        })
        .catch((err)=>console.log(err));
}

module.exports = serverSave;