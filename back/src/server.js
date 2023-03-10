var fs = require("fs");
var http = require("http");
const getAll = require('./controllers/getAllChars')
const onsearch = require('./controllers/getCharById.js');
const getDetail = require('./controllers/getCharDetail.js');
const PORT = 3001;

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   
    if (req.url.includes('rickandmorty/character')){
    
        getAll.getAllChars(res, req.url.split('/').pop());
        return;
        
    }

    if (req.url.includes('rickandmorty/onsearch')){    
        const id = req.url.split('/').pop();    
        onsearch.getCharById(res, id);
        return;
    }

    if (req.url.includes('rickandmorty/detail')){    
        const id = req.url.split('/').pop();    
        getDetail.getCharDetail(res, id);
        return;
    }

    res.writeHead(404, 'text/plain');
    res.end('Route not found');
})
.listen(PORT, 'localhost');