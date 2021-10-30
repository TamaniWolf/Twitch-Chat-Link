
// const chalk = require('chalk');
const { readdirSync } = require('fs');
const { DateTime } = require('luxon');
const format1 = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const format2 = 'yyyy'+'-'+'LL'+'-'+'dd'+"'T'"+'hh'+':'+'mm'+':'+'ss'+'.'+'SSS'+'ZZ';

module.exports = (client, chalk, Discord) =>{
    const eventFolders = readdirSync('./ClanCore/Commen/events');
    for (const folder of eventFolders) {
        const eventFiles = readdirSync(`./ClanCore/Commen/events/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client, Discord));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client, Discord));
            };
        };
    };
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + '][Discord]', chalk.white('Event Heandler loaded')));
};
