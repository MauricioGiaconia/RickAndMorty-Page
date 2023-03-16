const express = require('express');
const router = express.Router();
const { getAllChars } = require('../controllers/getAllChars.js');
const { getCharById } = require('../controllers/getCharById.js');
const { getCharDetail } = require('../controllers/getCharDetail.js');
var favs = require('../utils/favs.js');

router.get('/rickandmorty/characters', (req, res) => {getAllChars(req, res)});

router.get('/rickandmorty/characters/:page', (req, res) => {getAllChars(req, res)});

router.get('/rickandmorty/onsearch/:id', (req, res) => {getCharById(req, res)});

router.get('/rickandmorty/detail/:id', (req, res) => {getCharDetail(req, res)});

router.post('/rickandmorty/fav', (req, res) => {
    
    let obj = {};

    if (req.body.id && req.body.name && req.body.species && req.body.gender && req.body.image && req.body.altImg){

        if (favs.filter((fav) => fav.id == req.body.id).length > 0){
            res.status(500);
            return res.json({error : '¡El personaje ingresado ya existe en la lista de favoritos!'});
        }

        obj = {
            id : req.body.id,
            name : req.body.name,
            species: req.body.species,
            gender: req.body.gender,
            image : req.body.image,
            altImg : req.body.altImg
        }

        favs.push(obj);

        res.status(200);
        return res.json({success : '¡Personaje agregado a favoritos!'});
    }

    res.status(404);
    return res.json({error : '¡Error al cargar el personaje a favoritos!'});
});

router.get('/rickandmorty/fav', (req, res) => {

    if (favs.length > 0){
        res.status(200);
        return res.json(favs);
    };

    res.status(200);
    return res.json(favs);
});

router.delete('/rickandmorty/fav/:id', (req, res) => {

    let params = req.params;

    if (params.id){
        for (let i = 0; i < favs.length; i++){
            if (favs[i].id == params.id){
                favs.splice(i, 1);
                res.status(200);
                return res.json({success : '¡Personaje eliminado con exito!', idDeleted : params.id});
            }
        }

        res.status(500);
        return res.json({error : '¡El personaje ingresado no se encuentra en la lista de favoritos!'});
    }

    res.status(404);
    return res.json({error : '¡El id ingresado no es valido'});
});

module.exports = router;