const http = require('http');

<<<<<<< HEAD
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World</h1></body></html>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
=======
function solveRect(l, b){
    console.log("Solving for rectangle with l = " +l +" b= "+ b);
}

solveRect(2, 3);
solveRect(20, 32);
solveRect(21, 33);
solveRect(21, 33);
>>>>>>> parent of 421bb94...  node callback
