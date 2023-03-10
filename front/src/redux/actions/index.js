import axios from 'axios';

export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_CHARACTERS_STARTED = 'GET_CHARACTERS_STARTED';
export const SEARCH_CHARACTER = 'SEARCH_CHARACTER';
export const SEARCH_FIRST = 'SEARCH_FIRST';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const FILTER_CARDS = 'FILTER_CARDS';
export const ORDER_CARDS = 'ORDER_CARDS';
const url = 'http://localhost:3001/rickandmorty';
const apiKey = 'ac10126d166d.71df16a1f54c9d912e78';

export const getCharacters = (xUrl = `${url}/character` , cleanData = false) => {
    return (async function(dispatch){
        const response = await axios.get(`${xUrl}`)
                        .then((resp) => resp.data)
                        .then((data) => {
                          
                            if (data.info){
                            
                                if (data.info['next'] && data.info['prev']){
                                    
                                    return {type: GET_CHARACTERS, payload: {characters : data.info['results'], urlPrev : data.info['prev'], urlNext : data.info['next'], cleanList : cleanData}}

                                } else if (data.info['next'] && !data.info['prev']){
                                    return {type: GET_CHARACTERS, payload: {characters : data.info['results'], urlPrev : null, urlNext : data.info['next'], cleanList : cleanData}}
                                }
                                return {type: GET_CHARACTERS, payload: {characters : data.info['results'], urlPrev : data.info['prev'], urlNext : null, cleanList : cleanData}}
                            }

                                return {type: GET_CHARACTERS, payload: {characters : data, cleanList : cleanData}}
                            });
        
        return dispatch(response);
    })
}

export const getCharactersStarted = () => {
    return {type : GET_CHARACTERS_STARTED, payload: null}
}

export const searchCharacter = (search) => {
    return {type: SEARCH_CHARACTER, payload: search}
}

export const searchFirst = () =>{
    return {type: SEARCH_FIRST, payload: null}
}

export const addFavourite = (fav) => {
    return {type: ADD_FAVOURITE, payload: fav}
}

export const deleteCharacter = (xid) => {
    return {type: DELETE_CHARACTER, payload: xid}
}

export const deleteFavourite = (xid) => {
    return {type: DELETE_FAVOURITE, payload: xid}
}

export const filterCards = (gender) => {
    return {type: ORDER_CARDS, payload: gender}
}

export const orderCards = (order) => {
    return {type: ORDER_CARDS, payload: order}
}