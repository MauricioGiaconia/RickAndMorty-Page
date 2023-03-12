const axios = require('axios');
const URL = 'https://be-a-rym.up.railway.app/api/character/';
const KEY = 'ac10126d166d.71df16a1f54c9d912e78';

const getCharDetail = (req, res) => {

    let params = req.params;
    
    axios.get(`${URL}${params.id}?key=${KEY}`)  
    .then((response) => response.data)
    .then((data) => {  
        
        let obj = {
            id : data.id,
            image : data.image,
            name : data.name,
            gender : data.gender,
            status : data.status,
            origin : data.origin,
            species : data.species
        }
        
        res.status(200);
        res.json(obj);
    })
    .catch((err) => {
        res.status(500);
        res.json({message : err});
    })
}

module.exports = {getCharDetail}