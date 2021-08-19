const express = require('express');
const { endpointHit } = require('./logger');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Welcome!');

    next();
});

app.all('*', (req, res, next) => {
    if (!res.headersSent) {
        res.status(404).send('Invalid resource');
    }

    next();
});

app.use(endpointHit);

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});
