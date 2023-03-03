const initialState = {
    myFavourites : []
};

const rootReducer = (state = initialState, {type, payload}) => { 
    console.log(state);
    switch(type){      
        case ('ADD_FAVOURITE'):
            return {...state, myFavourites : state.myFavourites.concat(payload)};
        case ('DELETE_FAVOURITE'):
            return {...state, myFavourites : state.myFavourites.filter((char) => char.id != payload)}
        default: return {...state};
    }


};

export default rootReducer;
