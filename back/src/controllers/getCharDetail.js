const axios = require('axios');
const URL = 'https://be-a-rym.up.railway.app/api/character/';
const KEY = 'ac10126d166d.71df16a1f54c9d912e78';

const getCharDetail = async (req, res) => {

    let params = req.params;
    
    try {
        
        const response = await axios.get(`${URL}${params.id}?key=${KEY}`);
           
        let obj = {
            id : response.data.id,
            image : response.data.image,
            name : response.data.name,
            gender : response.data.gender,
            status : response.data.status,
            origin : response.data.origin,
            species : response.data.species
        }

        res.status(200);
        res.json(obj);
    } catch(err)  {
        res.status(500);
        res.json({
            error : err,
            message : 'Problemas al traer la informacion!'});
    };

}

module.exports = {getCharDetail}