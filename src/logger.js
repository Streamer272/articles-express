const { writeFileSync } = require('fs');
const moment = require('moment');

const fileName = `../log/log-${moment().format('DD_MM_YYYY')}.txt`;

const log = (req, res, next) => {
    let text = 'log';

    console.log(text);
    writeFileSync(fileName, `${text}\n`, {
        encoding: 'utf8',
        flag: 'a'
    });

    next();
}

module.exports = log;
