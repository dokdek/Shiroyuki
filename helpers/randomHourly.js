const Discord = require("discord.js");
const axios = require("axios");

const randomHourly = (message) =>{
    const channel = message.channel;
    setInterval(()=>{
        const requestUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=breasts~ sort:random score:>=20 -censored -uncensored";
        axios.get(requestUrl)
            .then((res)=>{
                channel.send(res.data[0].file_url);
            })
            .catch((err)=>{
                console.log(err);
            });
    }, 60 * 60);
}


module.exports = randomHourly;
