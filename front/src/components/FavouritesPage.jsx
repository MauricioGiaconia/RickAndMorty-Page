import styleMain from '../styles/MainPage.module.css';
import Card from './Card.jsx';
import Loading from './Loading';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getFavourites, deleteFavourite } from '../redux/actions';



export default function FavouritesPage() {

  
  const myFavourites = useSelector((state) => state.myFavourites);
  const loading = useSelector((state) => state.loading);
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
      class={fav['species'].toLowerCase()}
      onClose={() => { disableCard(fav.id) }}
    />
  });

  if (loading){
    return <div className={`${styleMain.mainContainer}`}>

      <Loading></Loading>
    </div>
  }


  return <div className={`${styleMain.mainContainer}`}>

    <div> {printFavourites}</div>

  </div>
}