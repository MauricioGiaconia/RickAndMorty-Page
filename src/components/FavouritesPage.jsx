import styleMain from '../styles/MainPage.module.css';
import Card from './Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavourite } from '../redux/actions';


export default function FavouritesPage() {

  const myFavourites = useSelector((state) => state.myFavourites);
  const dispatch = useDispatch();

  if (myFavourites.length === 0) {

    return <div className={`${styleMain.mainContainer}`}>
      <h1>PAGINA VACIA</h1>
    </div>
  }


  const disableCard = (xid) => {
    dispatch(deleteFavourite(xid));
  }

  
  const printFavourites = myFavourites.map((fav) => {
    return <Card
      key={fav.id}
      id={fav.id}
      name={fav.name}
      species={fav.species}
      gender={fav.gender}
      img={fav.img}
      altImg={`Imagen de ${fav.name}`}
      class={fav.species.toLowerCase()}
      onClose={() => { disableCard(fav.id) }}
    />
  });


  return <div className={`${styleMain.mainContainer}`}>

    <div> {printFavourites}</div>

  </div>
}