const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan('combined'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><body><h1>Hello express</h1></body><html>");
})

const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`);
})