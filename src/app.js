const express = require('express');
const log = require('./logger');
const app = express();

app.use(express.json());
app.use(log);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.all('*', (req, res) => {
    res.status(404).send('Invalid resource');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});
