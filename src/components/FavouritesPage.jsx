import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styleMain from '../styles/MainPage.module.css';
import Card from './Cards.jsx';
import Loading from './Loading';
import { connect } from 'react-redux';

function FavouritesPage(props) {

    if (props.myFavourites['myFavourites'].length === 0){
    
        return <div className={`${styleMain.mainContainer}`}>
           <h1>PAGINA VACIA</h1>
        </div>
    }
    //CUANDO VUELVA: PASAR POR PROPS VALOR ONCLOSE QUE SAQUE AL FAV DE LA LISTA
    const printFavourites = props.myFavourites['myFavourites'].map((fav) =>{
            return <Card
                key={fav.id}
                id={fav.id}
                name={fav.name}
                species={fav.species}
                gender={fav.gender}
                img={fav.img}
                altImg={`Imagen de ${fav.name}`}
                class={fav.species.toLowerCase()}
            />
        });
    
 
  return <div className={`${styleMain.mainContainer}`}>
    <h1>HOLA</h1>

        <div> {printFavourites}</div>
   
  </div>
}

export function mapStateToProps(state){
    return{
       myFavourites : state
    }
 }
 
 export default connect(mapStateToProps, null)(FavouritesPage);