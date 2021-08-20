const express = require('express');
const { MongoClient } = require('mongodb');
const { endpointHit } = require('./logger');

const app = express();

app.use(express.json());

let db;

app.get('/', async (req, res, next) => {
    const cursor = db.collection('articles').find();
    const articles = await cursor.toArray();

    res.status(200).send(articles);

    next();
});

app.post('/', async (req, res, next) => {
    try {
        db.collection('articles').insert();
    }
    catch (err) {
        res.status(400).send();
    }

    next();
});

app.all('*', (req, res, next) => {
    if (!res.headersSent) {
        res.status(404).send('Invalid resource');
    }

    next();
});

app.use(endpointHit);

const main = async () => {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        db = client.db('articles');
        console.log(`Successfully connected to database ${db.databaseName}...`);
    }
    catch (err) {
        console.error(`Error occurred while connecting to the database (${err})`);
        return 1;
    }

    app.listen(5000, () => {
        console.log('Server is running on port 5000...');
    });

    return 0;
}

main();
