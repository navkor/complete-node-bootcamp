const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
    console.log('There was a new sales');
});

myEmitter.on('newSale', () => {
    console.log('Customer name: jonas');
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left to sell`);
});

myEmitter.emit('newSale', 9);


//////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received');
    console.log(req.url);
    res.end('Success');
});


server.on('request', (req, res) => {
  console.log('Request received again');
});

server.on('close', () => {
    console.log('Server closed');
})

server.listen(8001, '127.0.0.1',  () => {
    console.log('waiting for request');
});