#!/usr/bin/env node

http = require('http')
fs = require('fs')
path = require('path')
url =  require('url')

host = process.argv[2] || "::1"
port = process.argv[3] || 8080

var server = http.createServer( (req, res) => {
  if(req.url != path.normalize(req.url)) {
    res.writeHead(400)
    res.end('invalid path')
  } else {
    if(req.url.endsWith('/')) req.url += 'index.html'
    var pathname = url.parse(req.url).pathname
    fs.createReadStream(`./public${pathname}`)
      .on('error', () => {
        res.writeHead(404)
        res.end('not found') })
      .on('open', () => {
        contenttypes = {
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.styl': 'text/css',
          '.svg': 'image/svg+xml',
          '.png': 'image/png',
          '.jpg': 'image/jpg',
          '.html': 'text/html; charset=utf-8'
        };
        // 'Content-Type': 'text/html; charset=utf-8'
        res.writeHead(200, {'Content-Type': contenttypes[path.extname(pathname)] || 'text/plain'})})
      .pipe(res)
  }
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}/`))
