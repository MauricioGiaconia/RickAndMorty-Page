const axios = require('axios');
const URL = 'https://be-a-rym.up.railway.app/api/character/';
const KEY = 'ac10126d166d.71df16a1f54c9d912e78';

function getCharById(req, res){

    const params = req.params

    axios.get(`${URL}${params.id}?key=${KEY}`)  
    .then((response) => response.data)
    .then((data) => {  
        
        res.status(200);

        let obj = {
            id : data.id,
            image : data.image,
            name : data.name,
            gender : data.gender,
            species : data.species
        }

        return res.json(obj);
    })
    .catch((err) => {
        res.status(500);
        return res.json({'message' : err});
    })
}

module.exports = {getCharById};