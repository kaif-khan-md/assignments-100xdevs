//  Create a middleware that logs all incoming requests to the console.

const express = require('express');
const app = express();

function logRequests(req, res, next) {
    // write the logic for request log here
    const methods = req.method;
    const urls = req.url;
    const dates = new Date().toISOString();
    console.log(`${methods} ${urls} - ${dates}`);
    next();

}

app.use(logRequests);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

module.exports = app;
