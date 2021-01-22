const Discord = require("discord.js");
const serverQuestion = require("./server-question");

const CreateListing = (user, type) => {
    const embeddedCreateListing = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("What is your Datacenter?")
    .setDescription(
      "🇦ether \n 🇵rimal \n 🇨rystal"
    );
    user.send(embeddedCreateListing)
    .then((msg) => {
        Promise.all([msg.react("🇦"), msg.react("🇵"), msg.react("🇨")])
        .then(()=> {
            const filter = (reaction, user) => {
                return (
                  ["🇦", "🇵","🇨"].includes(reaction.emoji.name) &&
                  user.id !== msg.author.id
                ); //filter for only the emojis the user reacted with.
              };
              msg
              .awaitReactions(filter, { max: 1 })
              .then((collected) => { 
                const userReaction = collected.last();
                let dataCenter;
                if(userReaction.emoji.name === "🇦"){
                     dataCenter = "Aether";
                }else if (userReaction.emoji.name === "🇵"){
                     dataCenter = "Primal";
                }else if(userReaction.emoji.name === "🇨"){
                     dataCenter = "Crystal";
                }
                msg.delete();
                if(type === "create"){
                  serverQuestion(user, dataCenter, type);
                }else{
                  serverQuestion(user, dataCenter, type);
                }
              })
              .catch((err)=> console.log(err));
        })
        .catch((err)=>console.log(err));
    })
}

module.exports = CreateListing;