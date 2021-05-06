const Discord = require("discord.js");
const pixivImg = require("pixiv-img");
const fs = require("fs");

const pixivSearch = (message, args, pixiv) => {
  console.log(args);
  const pixivEmbed = new Discord.MessageEmbed()
    .setFooter(
      "Pixiv",
      "https://img.utdstc.com/icon/5ba/716/5ba716ff5e62b0bd876d5a46c6e229984a6ed8caea83e2f29e8db8e032ad46f2:200"
    )
    .setColor("#DBFFFF");
  pixiv
    .searchIllust(args)
    .then((res) => {
      let randomIndex = Math.floor(Math.random() * res.illusts.length);
      while (res.illusts[randomIndex].type != "illust") {
        randomIndex = Math.floor(Math.random() * res.illusts.length);
      }
      pixivImg(res.illusts[randomIndex].image_urls.large)
        .then(async (img) => {
          pixivEmbed
            .setTitle("Click me for source")
            .setURL(
              "https://www.pixiv.net/en/artworks/".concat(
                res.illusts[randomIndex].id
              )
            )
            .attachFiles([img])
            .setImage("attachment://".concat(img));
          await message.channel.send(pixivEmbed);
          fs.unlink(img, (err) => {
            if (err) {
              console.log(err);
              message.channel.send(
                "I received a fatal error, please contact my owner. dokdek#8413"
              );
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

module.exports = pixivSearch;
