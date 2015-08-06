#! /usr/bin/env node

var httpProxy = require('http-proxy');
var options = require('./options');
var proxy = httpProxy.createProxyServer(options);
var http = require('http');
var https = require('https');

var args = [].concat(process.argv).splice(-1);

proxy.on('proxyReq', function(proxyReq, req, res, options){
    console.log('proxyReq');
});

proxy.on('proxyRes', function(proxyRes, req, res, options){
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('proxyRes');
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