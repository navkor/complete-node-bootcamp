const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.error(err);
  //     res.end(data);
  // Solution 2: streams
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //     res.write(chunk);
  // })
  // readable.on('end', () => {
  //     res.end();
  // })
  // readable.on('error', (err) => {
  //     console.error(err)
  //     res.statusCode = 500;
  //     res.end('file not found');
  // });
  // Solution 3: pipe
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readablesource.pipe(writeable destination);
  
})

server.listen(8001, '127.0.0.1', () => {
    console.log('listening on 8001');
});