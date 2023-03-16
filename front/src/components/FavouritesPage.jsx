import styleMain from '../styles/MainPage.module.css';
import styleCards from '../styles/Cards.module.css';
import Card from './Card.jsx';
import Selector from './Selector.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites, deleteFavourite } from '../redux/actions';
import { useEffect } from 'react';

export default function FavouritesPage() {

  
  const myFavourites = useSelector((state) => state.myFavourites);
  
  const dispatch = useDispatch();

  

  useEffect(() => {

    dispatch(getFavourites());

  }, [myFavourites]);

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
      img={fav.image}
      altImg={`Imagen de ${fav.name}`}
      class={fav['species'].toLowerCase()}
      onClose={() => { disableCard(fav.id)}}
    />
  });

  return <div className={`${styleMain.mainContainer}`}>
    <div className={`${styleCards.barsContainer}`}><Selector></Selector></div>
    
    <div className={`${styleCards.cardsContainer}`}> 
      
      {printFavourites}
    </div>

  </div>
}