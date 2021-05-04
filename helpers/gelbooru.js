const Discord = require("discord.js");
const axios = require("axios");

const gelbooru = (message, args) =>{
    args.shift();
    const requestUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=breasts~ sort:random score:>=10 -censored -uncensored -rape -torture -nude -pussy -shota ";

    const embeddedMessage = new Discord.MessageEmbed()
    .setColor("#DBFFFF");

    axios.get(requestUrl.concat(args))
        .then((res)=>{
            if(res.data.length == 0){
                const similarArgs = args.forEach((e)=>{
                    e.concat("~");
                });
                axios.get(requestUrl.concat(similarArgs))
                    .then((res)=>{
                        if(res.data.length > 0){
                            embeddedMessage.setDescription("Could not find any results with your exact tag, looking for an image with a similar tag.")
                            .setImage(res.data[0].file_url)
                            .setAuthor("Click me for source",'',res.data[0].source);
                            message.channel.send(embeddedMessage);
                        }else{
                            embeddedMessage.setDescription("Could not find any results with your exact tag or similar tags.");
                            message.channel.send(embeddedMessage);
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        embeddedMessage.setDescription("I've encountered an error");
                        message.channel.send(embeddedMessage);
                    })
            }else{
                embeddedMessage.setImage(res.data[0].file_url)
                    .setAuthor("Click me for source",'',res.data[0].source);
                message.channel.send(embeddedMessage);
            }
        })
        .catch((err)=>{
            console.log(err);
            embeddedMessage.setDescription("I've encountered an error");
            message.channel.send(embeddedMessage);
        });
}

module.exports = gelbooru;
