const express = require('express');
const router = require('./routes/index.js');
const PORT = 3001;
const server = express();

server.use(express.json());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.use('/', router);
server.use('/rickandmorty/characters', router);
server.use('/rickandmorty/characters/:page', router);
server.use('/rickandmorty/onsearch/:id', router);
server.use('/rickandmorty/detail/:id', router);
server.use('/rickandmorty/rickandmorty/fav', router);

server.listen(PORT);
