import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CardsPage from './components/CardsPage';
import FavouritesPage from './components/FavouritesPage';
import Detail from './components/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from './redux/actions';
import { useEffect } from 'react';

function App () {

  const favs = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourites())
  }, [favs]);

  return (
    <BrowserRouter>
      <div className='App'>

        <Navigation></Navigation>

        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/personajes' element= {<CardsPage></CardsPage>} />
          <Route path='/personajes/:page' element= {<CardsPage></CardsPage>} />
          <Route path='/personajes/detalle/:id' element = {<Detail></Detail>}/>
          <Route path='/favoritos' element= {<FavouritesPage></FavouritesPage>} />
          
        </Routes>


        <Footer content='© 2023 Proyecto Rick & Morty - Desarrollado por Mauricio Javier Giaconía'></Footer>
      </div>
    </BrowserRouter>
  )
}

export default App
