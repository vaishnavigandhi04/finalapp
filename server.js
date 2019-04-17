const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = port = process.env.PORT || 8080;

// var app = express();
//
// app.get('/', (request, response) => {
//     response.send('<h1> Hello Express!</h1>');
// });

app.listen(port,() => {
    console.log(`Server is up on the port ${port}`);
});