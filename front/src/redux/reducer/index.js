import { GET_CHARACTERS, GET_FAVOURITES, DELETE_FAVOURITE, GET_CHARACTERS_STARTED, SEARCH_CHARACTER, SEARCH_FIRST, DELETE_CHARACTER, IS_LOADING, ORDER_CARDS } from "../actions";

const initialState = {
    characters : [],
    myFavourites : [],
    cleanCharacterList : false,
    isSearch : false,
    isFirstSearch : true,
    urlNext : '',
    urlPrev : '',
    loading: true
};

const rootReducer = (state = initialState, {type, payload}) => { 
   
    switch(type){     

        case GET_CHARACTERS: 
            
            if (state.isSearch){

                if (state.isFirstSearch){
                    return {...state, characters: [payload.characters], loading: false, isFirstSearch: false, urlPrev : '', urlNext : '', isSearch: false}
                }

                const found = state.characters.some(el => el.id === payload.characters['id']);

                if (!found){
                    return {...state, characters: [...state.characters, payload.characters], loading: false, urlPrev : '', urlNext : '', isSearch: false}
                }

                return {...state, loading: false, urlPrev : '', urlNext : '', isSearch: false};
               
            }

            return {...state, characters: payload.characters, urlNext : payload.urlNext, urlPrev : payload.urlPrev, cleanCharacterList : payload.cleanList, loading: false, isSearch: false, isFirstSearch: true}

        case GET_CHARACTERS_STARTED: 
            return {...state, loading : true}
        
        case SEARCH_CHARACTER:
            return {...state, isSearch: payload}
        
        case SEARCH_FIRST:
            return {...state, isFirstSearch: true}

        case GET_FAVOURITES:
            return {...state, myFavourites : payload};

        case DELETE_CHARACTER:
            return {...state, characters : state.characters.filter((char) => char.id != payload)}   
             
        case DELETE_FAVOURITE:
            return {...state, myFavourites : state.myFavourites.filter((char) => char.id != payload)}

        case IS_LOADING:
            return {...state, loading : payload};

        case ORDER_CARDS:
            console.log(payload.isFav)
            if (payload.order == 'asc'){
                if (payload.isFav){
                    const sortedCharacters = [...state.myFavourites].sort((a, b) => a.id - b.id);
              
                    return {...state, myFavourites : sortedCharacters}
                }

                const sortedCharacters = [...state.characters].sort((a, b) => a.id - b.id);
              
                return {...state, characters : sortedCharacters}
            }

            if (payload.isFav){
                const sortedCharacters = [...state.myFavourites].sort((a, b) => b.id - a.id);
          
                return {...state, myFavourites : sortedCharacters}
            }

            const sortedCharacters = [...state.characters].sort((a, b) => b.id - a.id);
            
            return {...state, characters : sortedCharacters}

        default: return {...state};
    }
};

export default rootReducer;
