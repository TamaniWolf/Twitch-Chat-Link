const { MessageEmbed } = require('discord.js');
const { DateTime } = require('luxon');
const format1 = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'config',
    aliases: ['con'],
    description: 'editing config',
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql_configOnoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
        const sql_configChannelRole = new SQLite('./Database/sqlite/config/channelRole.sqlite');
        client.getCommandAdmin = sql_configOnoff.prepare("SELECT * FROM command_admin");
        client.getChannelAdmin = sql_configChannelRole.prepare("SELECT * FROM channel_admin");
        client.getRoleAdmin = sql_configChannelRole.prepare("SELECT * FROM role_admin");
        client.getLang = sql_configOnoff.prepare("SELECT * FROM lang");
        for (const row_lang of client.getLang./*iterate*/all()) {
        let lang = require('../../../.' + row_lang.LangSet);
        for (const row_configOnoffCommandAdmin of client.getCommandAdmin./*iterate*/all()) {
            if(row_configOnoffCommandAdmin.Editconfig === 'true') {
                //read config data
                let prefix = process.env.PREFIX;
                //code start
                for (const row_ChannelAdmin of client.getChannelAdmin./*iterate*/all()) {
                for (const row_RoleAdmin of client.getRoleAdmin./*iterate*/all()) {
                    const adminchannel1 = row_ChannelAdmin.Admin1;
                    const adminchannel2 = row_ChannelAdmin.Admin2;
                    const adminchannel3 = row_ChannelAdmin.Admin3;
                    const adminchannel4 = row_ChannelAdmin.Admin4;
                    const adminchannel5 = row_ChannelAdmin.Admin5;
                    const adminchannel6 = row_ChannelAdmin.Admin6;
                    const adminchannel7 = row_ChannelAdmin.Admin7;
                    const adminchannel8 = row_ChannelAdmin.Admin8;
                    const adminchannel9 = row_ChannelAdmin.Admin9;
                    const adminchannel10 = row_ChannelAdmin.Admin10;
                    const admin1 = row_RoleAdmin.Admin1;
                    const admin2 = row_RoleAdmin.Admin2;
                    const admin3 = row_RoleAdmin.Admin3;
                    const admin4 = row_RoleAdmin.Admin4;
                    const admin5 = row_RoleAdmin.Admin5;
                    const admin6 = row_RoleAdmin.Admin6;
                    const admin7 = row_RoleAdmin.Admin7;
                    const admin8 = row_RoleAdmin.Admin8;
                    const admin9 = row_RoleAdmin.Admin9;
                    const admin10 = row_RoleAdmin.Admin10;
                    if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3 || message.channel.id === adminchannel4 || message.channel.id === adminchannel5 || message.channel.id === adminchannel6 || message.channel.id === adminchannel7 || message.channel.id === adminchannel8 || message.channel.id === adminchannel9 || message.channel.id === adminchannel10) {
                        if(message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5) || message.member.roles.cache.has(admin6) || message.member.roles.cache.has(admin7) || message.member.roles.cache.has(admin8) || message.member.roles.cache.has(admin9) || message.member.roles.cache.has(admin10)) {
                                if(client){
                                    if(client) {
                                        client.setConfigOnOffCommandAdmin = sql_configOnoff.prepare("REPLACE INTO command_admin (OnOffID, Reload, Restart, Shutdown, Adminhelp, Changelog, Ping, Editconfig, Info, Db) VALUES (@OnOffID, @Reload, @Restart, @Shutdown, @Adminhelp, @Changelog, @Ping, @Editconfig, @Info, @Db);");
                                        client.setConfigOnoffCommandMember = sql_configOnoff.prepare("REPLACE INTO command_member (OnOffID, Fun_Blush, Fun_German, Fun_Grouphug, Fun_Growl, Fun_Hug, Fun_Hydrate, Fun_Slap, Help, McServer) VALUES (@OnOffID, @Fun_Blush, @Fun_German, @Fun_Grouphug, @Fun_Growl, @Fun_Hug, @Fun_Hydrate, @Fun_Slap, @Help, @McServer);");
                                    };
                                    const configembed = new MessageEmbed()
                                    .setColor('DARK_GREEN')
                                    .setTitle('Configs - Main | OnOff | Lang')
                                    if(!args[0]) {
                                        configembed.setDescription('**' + lang.admin.config.noargs1 + `\`${prefix}config list\`` + lang.admin.config.noargs2 + '**')
                                        message.channel.send({embeds: [configembed]});
                                    }
                                    if(args[0] === 'help' || args[0] === 'command' || args[0] === 'commands' || args[0] === 'list') {
                                        configembed.setDescription(lang.admin.config.list)
                                        message.channel.send({embeds: [configembed]});
                                    }
                                    //
                                    //Command Admin
                                    if(args[0] === 'reload') {
                                        if(args[1] === "on") {
                                            let dataConfigReloadOn;
                                            if(!dataConfigReloadOn) {
                                                dataConfigReloadOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: 'true', Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigReloadOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("reload" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigReloadOff;
                                            if(!dataConfigReloadOff) {
                                                dataConfigReloadOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: 'false', Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigReloadOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("reload" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'restart') {
                                        if(args[1] === "on") {
                                            let dataConfigRestartOn;
                                            if(!dataConfigRestartOn) {
                                                dataConfigRestartOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: 'true', Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigRestartOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("restart" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigRestartOff;
                                            if(!dataConfigRestartOff) {
                                                dataConfigRestartOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: 'false', Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigRestartOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("restart" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'shutdown') {
                                        if(args[1] === "on") {
                                            let dataConfigShutdownOn;
                                            if(!dataConfigShutdownOn) {
                                                dataConfigShutdownOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: 'true', Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigShutdownOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("shutdown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigShutdownOff;
                                            if(!dataConfigShutdownOff) {
                                                dataConfigShutdownOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: 'false', Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigShutdownOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("shutdown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'adminhelp') {
                                        if(args[1] === "on") {
                                            let dataConfigAdminhelpOn;
                                            if(!dataConfigAdminhelpOn) {
                                                dataConfigAdminhelpOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: 'true', Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigAdminhelpOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("adminhelp" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigAdminhelpOff;
                                            if(!dataConfigAdminhelpOff) {
                                                dataConfigAdminhelpOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: 'false', Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigAdminhelpOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("adminhelp" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'changelog') {
                                        if(args[1] === "on") {
                                            let dataConfigChangelogOn;
                                            if(!dataConfigChangelogOn) {
                                                dataConfigChangelogOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: 'true', Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigChangelogOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("changelog" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigChangelogOff;
                                            if(!dataConfigChangelogOff) {
                                                dataConfigChangelogOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: 'false', Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigChangelogOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("changelog" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'ping') {
                                        if(args[1] === "on") {
                                            let dataConfigPingOn;
                                            if(!dataConfigPingOn) {
                                                dataConfigPingOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: 'true', Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigPingOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("ping" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigPingOff;
                                            if(!dataConfigPingOff) {
                                                dataConfigPingOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: 'false', Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigPingOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("ping" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'config') {
                                        if(args[1] === "on") {
                                            let dataConfigConfigEditOn;
                                            if(!dataConfigConfigEditOn) {
                                                dataConfigConfigEditOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: 'true', Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigConfigEditOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("config" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigConfigEditOff;
                                            if(!dataConfigConfigEditOff) {
                                                dataConfigConfigEditOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: 'false', Info: row_configOnoffCommandAdmin.Info, Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigConfigEditOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("config" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'info') {
                                        if(args[1] === "on") {
                                            let dataConfigInfoOn;
                                            if(!dataConfigInfoOn) {
                                                dataConfigInfoOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: 'true', Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigInfoOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("botinfo" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigInfoOff;
                                            if(!dataConfigInfoOff) {
                                                dataConfigInfoOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: 'false', Db: row_configOnoffCommandAdmin.Db }
                                            };
                                            client.setConfigOnOffCommandAdmin.run(dataConfigInfoOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white("botinfo" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'db') {
                                        if(args[1] === 'on') {
                                            let dataConfigDatabaseOn;
                                            if(!dataConfigDatabaseOn) {
                                                dataConfigDatabaseOn = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: 'true' }
                                            }
                                            client.setConfigOnOffCommandAdmin.run(dataConfigDatabaseOn);
                                        }
                                        if(args[1] === 'off') {
                                            let dataConfigDatabaseOff;
                                            if(!dataConfigDatabaseOff) {
                                                dataConfigDatabaseOff = { OnOffID: row_configOnoffCommandAdmin.OnOffID, Reload: row_configOnoffCommandAdmin.Reload, Restart: row_configOnoffCommandAdmin.Restart, Shutdown: row_configOnoffCommandAdmin.Shutdown, Adminhelp: row_configOnoffCommandAdmin.Adminhelp, Changelog: row_configOnoffCommandAdmin.Changelog, Ping: row_configOnoffCommandAdmin.Ping, Editconfig: row_configOnoffCommandAdmin.Editconfig, Info: row_configOnoffCommandAdmin.Info, Db: 'false' }
                                            }
                                            client.setConfigOnOffCommandAdmin.run(dataConfigDatabaseOff);
                                        }
                                    }
                                }
                        } else {
                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(lang.admin.config.errorperms)));
                        }
                    } else {
                        console.log(chalk.cyan('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(lang.admin.config.errorchannel)));
                    }
                }}
            }
        }
        break;}
    }
}
