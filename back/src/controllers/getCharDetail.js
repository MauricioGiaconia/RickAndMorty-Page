const axios = require('axios');
const key = 'ac10126d166d.71df16a1f54c9d912e78';

const getCharDetail = (res, id) => {
    axios.get(`https://be-a-rym.up.railway.app/api/character/${id}?key=${key}`)  
    .then((response) => response.data)
    .then((data) => {  
        
        res.writeHead(200, {'Content-Type' : 'application/json'});

        let obj = {
            id : data.id,
            image : data.image,
            name : data.name,
            gender : data.gender,
            status : data.status,
            origin : data.origin,
            species : data.species
        }

        res.end(JSON.stringify(obj));
    })
    .catch((err) => {
        res.writeHead(500, {'Content-Type' : 'text/plain'});
        res.end(`¡Persona con ID ${id} no encontrado!`);
    })
}

module.exports = {getCharDetail}