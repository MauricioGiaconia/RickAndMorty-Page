import styles from '../styles/Card.module.css';
import { FaHeart } from 'react-icons/fa';
import  { connect } from 'react-redux'
import { addFavourite, deleteFavourite } from '../redux/actions';
import { useEffect, useState } from 'react';

function Card(props) {

   const [myFavourites, setMyFavourites] = useState([]);
   const [isFav, setIsFav] = useState(false);

   //Separo las clases si tienen espacios en blancos para asignar correctamente el estilo a traves de css module (mythological creature daba undefined si se mandaba completo)
   const splitedClass = props.class.split(' ');

   const handlerFavourite = () =>{

      if (!isFav){

        setIsFav(true);
         return props.addFavourite({
            id : props.id,
            name : props.name,
            species : props.species,
            gender : props.gender,
            img: props.img,
            altImg : props.altImg
         });
      }

      setIsFav(false);
      return props.deleteFavourite(props.id);
   }

   useEffect(() => {
      myFavourites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [myFavourites]);

   return (
      <div className={`${styles.card} ${styles[splitedClass[0]]}`}>
         <div className={`${styles.textContainer}`}>
            <button onClick={props.onClose}>X</button>
            <h2>{props.name}</h2>
            <h2>{props.species}</h2>
            <h2>{props.gender}</h2>
            
         </div>
         
         <img  src={props.img} alt={props.altImg} />
         <div className={`${styles.favBtnContainer}`}>
           <button className={isFav ? `${styles.favSelected}` : 'notSelected'} onClick={handlerFavourite}><FaHeart></FaHeart></button> 
         </div>
         
      </div>
   );
}

export function mapDispatchToProps(dispatch){
   return {
      addFavourite : (character) => {dispatch(addFavourite(character))},
      deleteFavourite : (xid) => {dispatch(deleteFavourite(xid))}
   }
}

export function mapStateToProps(state){
   return{
      myFavourites : state.favourites
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
