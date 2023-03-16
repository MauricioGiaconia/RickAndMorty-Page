import axios from 'axios';

export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_CHARACTERS_STARTED = 'GET_CHARACTERS_STARTED';
export const SEARCH_CHARACTER = 'SEARCH_CHARACTER';
export const SEARCH_FIRST = 'SEARCH_FIRST';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const GET_FAVOURITES = 'GET_FAVOURITES';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const FILTER_CARDS = 'FILTER_CARDS';
export const ORDER_CARDS = 'ORDER_CARDS';
export const IS_LOADING = 'IS_LOADING';
const url = 'http://localhost:3001/rickandmorty';

export const getCharacters = (xUrl = `${url}/characters`, cleanData = false) => {
    return (async function (dispatch) {

        try{
            const response = await axios.get(`${xUrl}`);

            if (response.data.info) {

                if (response.data.info['next'] && response.data.info['prev']) {

                    return dispatch({ type: GET_CHARACTERS, payload: { characters: response.data.info['results'], urlPrev: response.data.info['prev'], urlNext: response.data.info['next'], cleanList: cleanData } });

                } else if (response.data.info['next'] && !response.data.info['prev']) {
                    return dispatch({ type: GET_CHARACTERS, payload: { characters: response.data.info['results'], urlPrev: null, urlNext: response.data.info['next'], cleanList: cleanData } });
                }
                return dispatch({ type: GET_CHARACTERS, payload: { characters: response.data.info['results'], urlPrev: response.data.info['prev'], urlNext: null, cleanList: cleanData } });
            }

            return dispatch({ type: GET_CHARACTERS, payload: { characters: response.data, cleanList: cleanData } });
        } catch (err){
            console.log(err);
        }


    })
}

export const getCharactersStarted = () => {
    return { type: GET_CHARACTERS_STARTED, payload: null }
}

export const searchCharacter = (search) => {
    return { type: SEARCH_CHARACTER, payload: search }
}

export const searchFirst = () => {
    return { type: SEARCH_FIRST, payload: null }
}

export const addFavourite = (fav) => {

    return async () => {

        try {
            const response = await axios.post(`${url}/fav`, fav);
            
        } catch (err) {
            console.log(err);
        }

    }
}

export const getFavourites = () => {
    return (async function (dispatch) {
        try{

        const response = await axios.get(`${url}/fav`);
        return dispatch({ type: GET_FAVOURITES, payload: response.data });

        } catch (err){
            console.log(err);
        }
    })
}

export const deleteCharacter = (xid) => {
    return { type: DELETE_CHARACTER, payload: xid }
}

export const deleteFavourite = (xid) => {
    return async function (dispatch) {

        try {

            const response = await axios.delete(`${url}/fav/${xid}`);
            console.log(response.data['idDeleted']);
            return dispatch({ type: DELETE_FAVOURITE, payload: response.data['idDeleted'] });
        
        } catch (err){
            console.log(err);
        }
    }
}

export const filterCards = (gender) => {
    return { type: ORDER_CARDS, payload: gender }
}

export const orderCards = (order) => {
    return { type: ORDER_CARDS, payload: order }
}

export const setLoading = (loading) => {
    return { type: IS_LOADING, payload: loading }
}