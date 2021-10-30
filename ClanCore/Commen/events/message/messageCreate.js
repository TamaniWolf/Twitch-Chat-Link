const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const configmain = require('../../../../ClanSys/config/config.json');
const lang = require('../../../.' + configmain.lang);
const chalk = require('chalk');
const { DateTime } = require('luxon');
const format1 = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
    name: 'messageCreate',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {
        if(!message.content.startsWith(prefix) || message.author.bot) return;

        //Args + Command + ALiases
        const args = message.content.slice(prefix.length).split(/ +/);
        // console.log(args[1])
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName)
                        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;
        
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return console.log(`NoPerms: ${message.author.tag}, ${message.author.id} has not enough permission to run the command ${command}.`)
            }
        }

        const { cooldowns } = client;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const timeLeftEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Please wait another ${timeLeft.toFixed(1)} more seconds to be able to run this command again.`);
                return message.channel.send({embeds: [timeLeftEmbed]})
                .then((sent) => {
                    setTimeout(() => {
                        sent.delete();
                    }, 2000);
                });
            };
        };

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        //Execute
        try{
            if(command) command.execute(message, args, commandName, chalk, client, Discord);
        } catch (error){
            console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(error)));
            const ErrorEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(lang.error.errorcommand)
            message.channel.send({embeds: [ErrorEmbed]});
        };
    }
};
