const configmain = require('../../../../ClanSys/config/config.json')
const lang = require('../../../.' + configmain.lang);
const chalk = require('chalk');
const { DateTime } = require('luxon');
const format1 = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = {
    name: 'ready',
    execute(client){
        console.log(chalk.yellow('[' + DateTime.utc().toFormat(format1) + ']' + lang.prefix.clan, chalk.white(lang.log.ready)));
        client.user.setActivity('Tamani Wolf', {type: 'LISTENING'});
    }
};
