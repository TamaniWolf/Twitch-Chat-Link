

module.exports = (client, twitchClient, args, Discord, message) => {
    require('dotenv').config();
    const configmain = require('../../../ClanSys/config/config.json');
    twitchClient.on('message', (channel, userstate, message2, self) => {
        if(self) return;
        client.channels.cache.get(configmain.discord_channel).send(`\`${userstate['display-name']}:\` ${message2}`)
    })
};
