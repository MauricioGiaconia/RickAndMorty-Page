import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styleMain from '../styles/MainPage.module.css';
import Card from './Card.jsx';
import Loading from './Loading';
import { connect } from 'react-redux';
import { deleteFavourite } from '../redux/actions';

function FavouritesPage(props) {

  if (props.myFavourites['myFavourites'].length === 0) {

    return <div className={`${styleMain.mainContainer}`}>
      <h1>PAGINA VACIA</h1>
    </div>
  }


  const disableCard = (xid) => {
    props.deleteFavourite(xid)
  }

  
  const printFavourites = props.myFavourites['myFavourites'].map((fav) => {
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

export function mapStateToProps(state) {
  return {
    myFavourites: state
  }
}

export function mapDispatchToProps(dispatch){
  return {
    deleteFavourite: (xid) => dispatch(deleteFavourite(xid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPage);