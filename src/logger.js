const { writeFileSync } = require('fs');
const moment = require('moment');

const fileName = `../log/log-${moment().format('DD_MM_YYYY')}.txt`;

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

const getResType = (res) => {
    if (res.status <= 200) {
        return 'INFO';
    }
    else if (res.status > 200 < 400) {
        return 'WARNING';
    }
    else {
        return 'ERROR';
    }
}

const log = (type, message) => {
    const text = `[${type}] ${getCurrentTime()} ${message}`;

    writeOut(text);
}

const endpointHit = (req, res, next) => {
    const text = `[INFO] ${getCurrentTime()} ${res.statusCode} ${req.method} ${req.url}`;

    writeOut(text);

    next();
}

module.exports = {
    log,
    endpointHit
};
