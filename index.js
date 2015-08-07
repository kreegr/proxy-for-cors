#! /usr/bin/env node

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var http = require('http');

var args = [].concat(process.argv).splice(-1);

proxy.on('proxyReq', function(proxyReq, req, res, options){
    console.log('proxying ' + req.url);
});

proxy.on('proxyRes', function(proxyRes, req, res, options){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
});

var server = http.createServer(function(req, res){
   proxy.web(req, res, {
       target : args[0],
       port : 80
   });
});

server.listen(5150, function(){
    console.log('Proxy server listening on 5150 forwarding to %s', args[0]);
});