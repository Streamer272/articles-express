const { writeFileSync } = require('fs');
const moment = require('moment');

const fileName = `../log/log-${moment().format('DD_MM_YYYY')}.log`;

const writeOut = (logText) => {
    console.log(logText);
    writeFileSync(fileName, `${logText}\n`, {
        encoding: 'utf8',
        flag: 'a'
    });
}

const getCurrentTime = () => {
    return moment().format('DD:MM:YYYY HH:mm:ss.SSS');
}

const log = (message) => {
    const text = `${message}`.replace('%date', getCurrentTime());

    writeOut(text);
}

const endpointHit = (req, res, next) => {
    const text = `[INFO ${getCurrentTime()}] ${res.statusCode} ${req.method} ${req.url}`;

    writeOut(text);

    next();
}

module.exports = {
    log,
    endpointHit
};
