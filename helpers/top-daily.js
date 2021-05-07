const Discord = require("discord.js");
const pixivImg = require("pixiv-img");
const fs = require("fs");

const topDaily = (message, pixiv) => {
  const channel = message.channel;
  pixiv.illustRanking().then((res) => {
    let illustIndex = 0;
    let onlyIllusts = [];
    while (onlyIllusts.length < 10) {
      if (res.illusts[illustIndex].type == "illust") {
        onlyIllusts.push(res.illusts[illustIndex]);
      }
      illustIndex++;
    }
    onlyIllusts.forEach((e) => {
       pixivImg(e.image_urls.large).then(async (img) => {
        console.log(img);
        const embeddedMessage = new Discord.MessageEmbed().setColor("#DBFFFF")
          .setTitle("Today's top 10 on Pixiv")
          .setURL("https://www.pixiv.net/ranking.php?mode=daily&content=illust")
          .attachFiles([img])
          .setImage("attachment://".concat(img))
          .setFooter(
            "Pixiv",
            "https://img.utdstc.com/icon/5ba/716/5ba716ff5e62b0bd876d5a46c6e229984a6ed8caea83e2f29e8db8e032ad46f2:200"
          );
        await channel.send(embeddedMessage);
        fs.unlink(img, (err) => {
            if (err) {
              console.log(err);
              message.channel.send(
                "I received a fatal error, please contact my owner. dokdek#8413"
              );
            }
          });
      });
    });
  });
};

module.exports = topDaily;
