const greeting = (message) => {
  message.channel
    .send(`React whether you want to create or search listings`)
    .then((msg) => {
      Promise.all([msg.react("🔍"), msg.react("➕")]) //awaits for all promises to resolve before awaiting message.
        .then(() => {
          const filter = (reaction, user) => {
            return (
              ["🔍", "➕"].includes(reaction.emoji.name) &&
              user.id !== msg.author.id
            ); //filter for only the emojis the bot reacted with.
          };
          msg
            .awaitReactions(filter, { max: 1 })
            .then((collected) => {
              const userReaction = collected.last();
              console.log(collected);
              if (userReaction.emoji.name === "🔍") {
                console.log(userReaction.users.cache.last().username);
                userReaction.users.cache
                  .last()
                  .send("You wanted to search a listing.");
                greeting(message);
              } else {
                console.log(userReaction.users.cache.last().username);
                userReaction.users.cache
                  .last()
                  .send("You wanted to create a listing.");
                greeting(message);
              }
            })
            .catch((err) => {
              console.log("Error: " + err);
            });
        })
        .catch((err) => console.log("Error: " + err));
    })
    .catch((err) => console.log("Error: " + err));
};
module.exports = greeting;
