const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.all('*', (req, res) => {
    res.status(404).send('Invalid resource');
});

app.use(express.json());

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});
