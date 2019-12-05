const http = require('http');
const url = require('url');

let port = process.env.PORT || 3000;

process.argv.every(arg => ~arg.indexOf('--port=') ? !(port = +(arg.substring(7))) : true);

http.createServer((req, res) => {
  let body = [];
  req
    .on('error', error => { console.log(error); })
    .on('data', chunk => { body.push(chunk); })
    .on('end', () => {
      try {
        console.log(body, body.length, url.parse(req.url).query);
        res.write(url.parse(req.url).query || '');
        res.end(body.length ? Buffer.concat(body).toString() : '');
      } catch (error) {
        console.log(error);
        res.end();
      }
    });
}).listen(port, () => console.log('Echo server running on port ' + port));
