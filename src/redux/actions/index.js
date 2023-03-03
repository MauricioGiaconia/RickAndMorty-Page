export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';

export const addFavourite = (fav) =>{
    return {type: ADD_FAVOURITE, payload: fav}
}

export const deleteFavourite = (xid) =>{
    return {type: DELETE_FAVOURITE, payload: xid}
}