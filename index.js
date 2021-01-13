const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot Ready!');
});

client.on('message', message => {
    if(message.content === "~init"){
        message.channel.send(`Initializing bot in ${message.channel} channel`);
    }
});

client.login(token);