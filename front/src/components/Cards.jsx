import Card from './Card';
import styles from '../styles/Cards.module.css';
import { useDispatch } from 'react-redux';
import { deleteCharacter } from '../redux/actions';

export default function Cards(props) {

   const dispatch = useDispatch();

   //Funcion recursiva para traer todos los ricks o mortys etc etc

   const characters = props.data?.map((character) => <Card
      key={character.id}
      id={character.id}
      name={character.name}
      species={character.species}
      gender={character.gender}
      img={character.image}
      altImg={`Imagen de ${character.name}`}
      class={character['species'].toLowerCase()}
      onClose={() => { dispatch(deleteCharacter(character.id)) }}
   ></Card>)

   return <div className={`${styles.container}`}>

      <div className={`${styles.cardsContainer}`}>
         {characters}
      </div>

   </div>;



}

