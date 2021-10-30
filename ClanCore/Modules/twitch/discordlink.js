
module.exports = (client, twitchClient, args, Discord) => {
    require('dotenv').config();
    const configmain = require('../../../ClanSys/config/config.json');

    client.on('messageCreate', (message) => {
        if(message.author.bot) return;
        let channel = `#${process.env.TWITCH_CHANNEL}`
            twitchClient.say(channel, `${message.author.username}: ${message.content}`);
    });
};
