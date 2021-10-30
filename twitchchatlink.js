// DiscordJS
const Discord = require('discord.js');
const { Intents, Collection } = Discord;
const client = new Discord.Client({
    intents:
    [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
    , partials:
    [
        "GUILD_MEMBER"
    ]
});
//Discord const
require('dotenv').config();
const chalk = require('chalk');
const { DateTime } = require('luxon');
const format1 = 'yyyy'+'/'+'LL'+'/'+'dd'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
console.log('[Time]', DateTime.utc().toISO(), '[UTC]');
// Twitch login
const tmi = require('tmi.js');
const twitchClient = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});
twitchClient.connect().catch(console.error);

//Start
console.log(chalk.yellow('[NodeJS]' + chalk.white(' ▪ ▪ ▪ ▪ ▪ ', 'DiscordBot Start', ' ▪ ▪ ▪ ▪ ▪ ')));

    //Command Event Database handler
    client.commands = new Collection();
    client.cooldowns = new Collection();
    ['admin_command_handler', 'event_handler'].forEach(handler =>{
        require(`./ClanCore/Commen/handlers/${handler}`)(client, chalk, Discord);
    });
    client.links = new Collection();
    ['twitchlink', 'discordlink'].forEach(links =>{
        require(`./ClanCore/Modules/twitch/${links}.js`)(client, twitchClient, Discord);
    });

    client.on('ready', () => {
        console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + '][Discord]'), chalk.white(`logged in as ${client.user.tag}.`));

        client.on("guildJoin", guild => {
            console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + '][Discord]'), chalk.white(`Joined new server: ${guild.name}`));
        });

        client.on("guildLeave", guild => {
            console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + '][Discord]'), chalk.white(`Removed from a server: ${guild.name}`));
        });
    });

    //Login
    client.login(process.env.TOKEN);

//Error listener
client.on('unhandledRejection', error => {
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + ']' + lang.error.unhandled), chalk.white(error));
});
client.on('shardError', error => {
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + ']' + lang.error.websocket), chalk.white(error));
});

// //--------END--------//