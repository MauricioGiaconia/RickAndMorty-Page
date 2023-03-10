import Card from './Card';
import styles from '../styles/Cards.module.css';
import { useDispatch } from 'react-redux';
import { deleteCharacter } from '../redux/actions';

export default function Cards(props) {

   const dispatch = useDispatch();

   //Funcion recursiva para traer todos los ricks o mortys etc etc
   
   const characters = props.data?.map((character) =>  <Card
      key={character.id}
      id={character.id}
      name={character.name}
      species={character.species}
      gender={character.gender}
      img={character.image}
      altImg={`Imagen de ${character.name}`}
      class={character['species'].toLowerCase()}
      onClose={() => { dispatch(deleteCharacter(character.id))}}
   ></Card>)

   if (!props.btnPrev && !props.btnNext){
      return <div>
     
         <div className={`${styles.cardsContainer}`}>
            {characters}
         </div>

      </div>;
   }

   if (!props.btnPrev){
      return <div>
     
         <div className={`${styles.cardsContainer}`}>
            {characters}
         </div>

         <button className={`${styles.btnPagination}`} onClick={props.btnNext}>{props.faIconNext}</button>

      </div>;
   }

   if (!props.btnNext){
      return <div>
       
         <div className={`${styles.cardsContainer}`}>
            {characters}
         </div>

         <button className={`${styles.btnPagination}`} onClick={props.btnPrev}>{props.faIconPrev}</button>

      </div>;
   }

   return <div>
       
         <div className={`${styles.cardsContainer}`}>
            {characters}
         </div>
    
      <button className={`${styles.btnPagination}`} onClick={props.btnPrev}>{props.faIconPrev}</button>
      <button className={`${styles.btnPagination}`} onClick={props.btnNext}>{props.faIconNext}</button>

   </div>; 
}

