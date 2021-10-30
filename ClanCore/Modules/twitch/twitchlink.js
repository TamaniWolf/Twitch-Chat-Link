

module.exports = (client, twitchClient, args, Discord, message) => {
    require('dotenv').config();
    const configmain = require('../../../ClanSys/config/config.json');
    // const tmi = require('tmi.js');
    // const twitchClient = new tmi.Client({
    //     options: { debug: true, messagesLogLevel: "info" },
    //     connection: {
    //         reconnect: true,
    //         secure: true
    //     },

    //     identity: {
    //         username: `${process.env.TWITCH_USERNAME}`,
    //         password: `oauth:${process.env.TWITCH_OAUTH}`
    //     },

    //     channels: [`${process.env.TWITCH_CHANNEL}`]
    // });

    // twitchClient.connect().catch(console.error);
    // console.log(message)
    twitchClient.on('message', (channel, userstate, message2, self) => {
        if(self) return;
        client.channels.cache.get('846716632155816016').send(`\`${userstate['display-name']}:\` ${message2}`)
        // console.log(message);
        // if(message.author.id === configmain.botid) return;
        // twitchClient.say(message);
    })
};
