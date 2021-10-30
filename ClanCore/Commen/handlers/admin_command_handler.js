const fs = require('fs');
const { DateTime } = require('luxon');
const format1 = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = (client, chalk, Discord) =>{
    const load_dir = (dirs) =>{
        const command_files2 = fs.readdirSync(`./ClanSys/commands/admins/${dirs}`).filter(file2 => file2.endsWith('.js'));

        for(const file2 of command_files2){
            const command2 = require(`../../../ClanSys/commands/admins/${dirs}/${file2}`);
            
            if(command2.name){
                client.commands.set(command2.name, command2);
            } else {
                continue;
            }
        }
    }
    ['master', 'edit', 'utils'].forEach(c => load_dir(c));
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + '][Discord]', chalk.white('Admin Command Heandler loaded')));
}
