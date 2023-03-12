import styles from '../styles/Card.module.css';
import { FaHeart, FaInfoCircle } from 'react-icons/fa';
import  { connect } from 'react-redux'
import { addFavourite, deleteFavourite, getFavourites, setLoading } from '../redux/actions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            image: props.img,
            altImg : props.altImg
         });

         
      }

      setIsFav(false);
      props.deleteFavourite(props.id);
      
   }

   useEffect(() => {

      if (props['myFavourites'].some(character => character.id == props.id)){
         setIsFav(true);
      }
    
   }, []);

   const handlerInfo = () =>{
      props.setLoading(true);
   }

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
           <a className={isFav ? `${styles.cardBtn} ${styles.favSelected}` : `${styles.cardBtn} ${styles.favBtn} notSelected`} onClick={handlerFavourite}><FaHeart></FaHeart></a>
           <Link onClick={handlerInfo} className={`${styles.cardBtn} ${styles.infoBtn}`} to={`/personajes/detalle/${props.id}`}><FaInfoCircle></FaInfoCircle></Link>
         </div>
         
      </div>
   );
}

export function mapDispatchToProps(dispatch){
   return {
      addFavourite : (character) => {dispatch(addFavourite(character))},
      getFavourites : () => {dispatch(getFavourites())},
      deleteFavourite : (xid) => {dispatch(deleteFavourite(xid))},
      setLoading : (loading) => {dispatch(setLoading(loading))}
   }
}

export function mapStateToProps(state){
   return{
      myFavourites : state['myFavourites']
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
