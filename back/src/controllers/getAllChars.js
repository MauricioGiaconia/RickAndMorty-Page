const axios = require('axios');
const key = 'ac10126d166d.71df16a1f54c9d912e78';

const getAllChars = (res, page) => {

    let finalUrl = '';
    if (page === 'character'){
        finalUrl = 'https://be-a-rym.up.railway.app/api/character?';
    } else{
        finalUrl = `https://be-a-rym.up.railway.app/api/character?page=${page}&`
    }
    console.log(`${finalUrl}key=${key}`);
    axios.get(`${finalUrl}key=${key}`)  
    .then((response) => response.data)
    .then((data) => {  
        
        res.writeHead(200, {'Content-Type' : 'application/json'});
  
        res.end(JSON.stringify(data));
    })
    .catch((err) => {
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        res.end(`¡Lo siento! El portal de Rick no funciona correctamente`);
    });

    return;
}

module.exports = {getAllChars}