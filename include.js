#!/usr/bin/env node

fs = require('fs')

var targets = fs.readdirSync('docs').filter(f => f.endsWith('.html')).map(f => ({file:f, content:fs.readFileSync('docs/'+f, 'utf-8')}))
var includes = {}
for(f of fs.readdirSync('html_include'))
  includes[f.substr(0,f.length-5)] = fs.readFileSync('html_include/'+f, 'utf-8')
for(t of targets) {
  for(i in includes)
    t.content = t.content.replace(new RegExp(`<!--${i}-->[^]*?<!---->`, "g"), `<!--${i}-->\n${includes[i]}`)
  fs.writeFileSync('docs/'+t.file, t.content)
}
