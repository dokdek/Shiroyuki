const Discord = require("discord.js");
const axios = require("axios");

const randomHourly = (message) =>{
    const channel = message.channel;
    const embeddedMessage = new Discord.MessageEmbed()
    .setColor("#DBFFFF")
    .setTitle("Random Hourly Picture");
    setInterval(()=>{
        const requestUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=breasts~ sort:random score:>=20 -censored -uncensored -rape -torture -nude -pussy -shota {hololive ~ azur_lane ~ umamusume ~ arknights ~ princess_connect!_re%3Adive ~ princess_connect!}";
        axios.get(requestUrl)
            .then((res)=>{
                embeddedMessage.setImage(res.data[0].file_url)
                .setAuthor("Click me for source",'',res.data[0].source)
                .setTitle("Random Hourly Image");
                channel.send(embeddedMessage);
            })
            .catch((err)=>{
                embeddedMessage.setDescription("I've encountered an error");
                message.channel.send(embeddedMessage);
            });
    }, 60 * 60 * 1000);
}


module.exports = randomHourly;
