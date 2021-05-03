const Discord = require("discord.js");
const axios = require("axios");

const randomHourly = (message) =>{
    const channel = message.channel;
    setInterval(()=>{
        const requestUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=breasts~ sort:random score:>=20 -censored -uncensored -rape -torture -nude -pussy -shota {hololive ~ azur_lane ~ umamusume ~ arknights ~ princess_connect!_re%3Adive ~ princess_connect!}";
        axios.get(requestUrl)
            .then((res)=>{
                channel.send(res.data[0].file_url);
            })
            .catch((err)=>{
                console.log(err);
            });
    }, 60 * 60 * 1000);
}


module.exports = randomHourly;
