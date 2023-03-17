const axios = require('axios');
const KEY = 'ac10126d166d.71df16a1f54c9d912e78';

const getAllChars = async (req, res) => {

    let finalUrl = '';
    let params = req.params;
    
    if (Object.keys(params).length > 0){
        finalUrl = `https://be-a-rym.up.railway.app/api/character?page=${params.page}&`;
      
    } else{
        finalUrl = 'https://be-a-rym.up.railway.app/api/character?';
    }
  
    try{

        const response = await axios.get(`${finalUrl}key=${KEY}`)  
        
        res.status(200);
        return res.json(response.data);

    } catch(err){
        res.status(404);
        return res.json({
                error : err,
                message :`¡Lo siento! El portal de Rick no funciona correctamente`
            });
    };

}

module.exports = {getAllChars}