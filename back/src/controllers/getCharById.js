const axios = require('axios');
const URL = 'https://be-a-rym.up.railway.app/api/character/';
const KEY = 'ac10126d166d.71df16a1f54c9d912e78';

async function getCharById(req, res) {

    const params = req.params

    try {
        const response = await axios.get(`${URL}${params.id}?key=${KEY}`)


        res.status(200);

        let obj = {
            id: response.data.id,
            image: response.data.image,
            name: response.data.name,
            gender: response.data.gender,
            species: response.data.species
        }

        return res.json(obj);

    } catch (err) {
        res.status(500);
        return res.json({ 
            error : err,
            message: 'Problemas para traer al personaje!' });
    }
}

module.exports = { getCharById };