const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  }, 100);//сервер отвечает на запрос через 100ms
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});