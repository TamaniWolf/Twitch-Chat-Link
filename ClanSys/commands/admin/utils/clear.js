require('dotenv').config();
const { DateTime } = require('luxon');
const format1 = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = {
    name: 'clear',
    aliases: ['clean'],
    description: 'clearing messages, min 1 - max 100, up to 14 days back',
    guildOnly: true,
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql_configOnoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
        const sql_configChannelRole = new SQLite('./Database/sqlite/config/channelRole.sqlite');
        client.getConfigOnOffCommandAdmin = sql_configOnoff.prepare("SELECT * FROM command_admin");
        client.getConfigChannel = sql_configChannelRole.prepare("SELECT * FROM channel_admin");
        client.getConfigRole = sql_configChannelRole.prepare("SELECT * FROM role_admin");
        client.getLang = sql_configOnoff.prepare("SELECT * FROM lang");
        for (const row_lang of client.getLang./*iterate*/all()) {
            let lang = require('../../../.' + row_lang.LangSet);
            for (const row_configOnoffCommandAdmin of client.getConfigOnOffCommandAdmin./*iterate*/all()) {
                if(row_configOnoffCommandAdmin.Editconfig === 'true') {
                    //code start
                    for (const row_configChannel of client.getConfigChannel./*iterate*/all()) {
                        for (const row_configOnoffRole of client.getConfigRole./*iterate*/all()) {
                            const admin1 = row_configOnoffRole.Admin1;
                            const admin2 = row_configOnoffRole.Admin2;
                            const admin3 = row_configOnoffRole.Admin3;
                            const admin4 = row_configOnoffRole.Admin4;
                            const admin5 = row_configOnoffRole.Admin5;
                            const admin6 = row_configOnoffRole.Admin6;
                            const admin7 = row_configOnoffRole.Admin7;
                            const admin8 = row_configOnoffRole.Admin8;
                            const admin9 = row_configOnoffRole.Admin9;
                            const admin10 = row_configOnoffRole.Admin10;
                            if(message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5) || message.member.roles.cache.has(admin6) || message.member.roles.cache.has(admin7) || message.member.roles.cache.has(admin8) || message.member.roles.cache.has(admin9) || message.member.roles.cache.has(admin10)) {
                                if(!args[0]) {
                                    return;
                                }else if(args[0] != "number") {
                                    if(args[0] > 100) return message.reply(`Sorry not more then 100 at a time.`);
                                        const amountClear = args[0];
                                        const taggedUser = message.mentions.users.first();
                                        const guildId = message.guild.id;
                                        const guild = client.guilds.cache.get(guildId);
                                        
                                        const messagesClear = await message.channel.messages.fetch();
                                        if(args[1]) {
                                            const memberTagged = guild.members.cache.get(taggedUser.id);
                                            if(memberTagged) {
                                                let i = 0;
                                                const filtered = [];
                                                (await messagesClear).filter((m) => {
                                                    if(m.author.id === memberTagged.id && amountClear > i) {
                                                        filtered.push(m);
                                                        i++;
                                                    }
                                                })
                                                await message.channel.bulkDelete(filtered, true).then(messages => {
                                                    console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(`Cleared ${messages.size} Messages from ${memberTagged.tag}.`)))
                                                });
                                            }
                                        } else {
                                            await message.channel.bulkDelete(amountClear, true).then(messages => {
                                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(`Cleared ${messages.size} Messages from channel ${message.channel.name}.`)))
                                            });
                                        }
                                }
                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(lang.admin.clear.errorperms)));
                            }
                        }
                    }
                }
            }
        }
    }
}
