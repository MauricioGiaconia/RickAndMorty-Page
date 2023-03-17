import { GET_CHARACTERS, SET_ERROR, GET_FAVOURITES, DELETE_FAVOURITE, GET_CHARACTERS_STARTED, SEARCH_CHARACTER, SEARCH_FIRST, DELETE_CHARACTER, IS_LOADING, ORDER_CARDS, FILTER_CARDS } from "../actions";

const initialState = {
    characters : [],
    auxCharacters : [],
    myFavourites : [],
    auxFavourites : [],
    cleanCharacterList : false,
    error : {
        type : '',
        message: '',
    },
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
                    return {...state, characters: [payload.characters], auxCharacters: [payload.characters], loading: false, isFirstSearch: false, urlPrev : '', urlNext : '', isSearch: false}
                }

                const found = state.characters.some(el => el.id === payload.characters['id']);

                if (!found){
                    return {...state, characters: [...state.characters, payload.characters], auxCharacters: [...state.auxCharacters, payload.characters], loading: false, urlPrev : '', urlNext : '', isSearch: false}
                }

                return {...state, loading: false, urlPrev : '', urlNext : '', isSearch: false};
               
            }

            return {...state, characters: payload.characters, auxCharacters: payload.characters, urlNext : payload.urlNext, urlPrev : payload.urlPrev, cleanCharacterList : payload.cleanList, loading: false, isSearch: false, isFirstSearch: true}

        case GET_CHARACTERS_STARTED: 
            return {...state, loading : true}
        
        case SEARCH_CHARACTER:
            return {...state, isSearch: payload}
        
        case SEARCH_FIRST:
            return {...state, isFirstSearch: true}

        case GET_FAVOURITES:
            return {...state, myFavourites : payload, auxFavourites: payload};

        case DELETE_CHARACTER:
            return {...state, characters : state.characters.filter((char) => char.id !== payload)}   
             
        case DELETE_FAVOURITE:
            return {...state, myFavourites : state.myFavourites.filter((char) => char.id !== payload), auxFavourites : state.auxFavourites.filter((char) => char.id !== payload)}

        case IS_LOADING:
            return {...state, loading : payload};

        case ORDER_CARDS:
            state.myFavourites = state.auxFavourites;
            if (payload.order === 'asc'){
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
            
            return {...state, characters : sortedCharacters};

        case FILTER_CARDS: 
            state.myFavourites = state.auxFavourites;
            state.characters = state.auxCharacters;
        
            if (payload.isFav){

                if (payload.gender !== 'all'){
                    const filteredCharacters = [...state.myFavourites].filter((char) => char.gender.toLowerCase() === payload.gender.toLowerCase());
                    
                    return {...state, myFavourites : filteredCharacters}
                }

                return {...state}
            }

            if (payload.gender !== 'all'){
                const filteredCharacters = [...state.characters].filter((char) => char.gender.toLowerCase() === payload.gender.toLowerCase());
                return {...state, characters : filteredCharacters};
            }
            
          
            return {...state, characters : state.auxCharacters};

        case SET_ERROR:
            return {...state, error : {type : payload.error, message : payload.message}}


        default: return {...state};
    }
};

export default rootReducer;
