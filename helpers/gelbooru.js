const Discord = require("discord.js");
const axios = require("axios");

const gelbooru = (message, args) =>{
    args.shift();
    const requestUrl = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=breasts~ sort:random score:>=10 -censored -uncensored -rape -torture -nude -pussy -shota ".concat(args);

    axios.get(requestUrl)
        .then((res)=>{
            if(res.data.length == 0){
                message.channel.send("Cannot find any results, try again.");
            }else{
                message.channel.send(res.data[0].file_url);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
}

module.exports = gelbooru;
