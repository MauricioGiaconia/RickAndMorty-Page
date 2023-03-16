import './App.css';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CardsPage from './components/CardsPage';
import FavouritesPage from './components/FavouritesPage';
import Detail from './components/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { getFavourites } from './redux/actions';
import { useEffect, useState } from 'react';

function App () {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const favs = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const username = 'maurigiaconia@hotmail.com';
  const password = 'password18';

  function loginUser(data){

    if (data.username == username && password == data.password){
      setLogin(true);
      return navigate('/personajes');
    } 

    alert('¡El email o la contraseña no coincide!');
    
  }

  function logout(){
    setLogin(false);
  }

  useEffect(() => {

    dispatch(getFavourites())

  }, [favs]);

  useEffect(() => {
    !login && navigate('/');
  }, [login]);

  return (
   
      <div className='App'>


        {login ? <Navigation onLogout={logout}></Navigation> : false}

        <Routes>
          <Route path='/' element={<MainPage onLogin = {loginUser}/>} />
          <Route path='/personajes' element= {<CardsPage></CardsPage>} />
          <Route path='/personajes/:page' element= {<CardsPage></CardsPage>} />
          <Route path='/personajes/detalle/:id' element = {<Detail></Detail>}/>
          <Route path='/favoritos' element= {<FavouritesPage></FavouritesPage>} />
        </Routes>


        <Footer content='© 2023 Proyecto Rick & Morty - Desarrollado por Mauricio Javier Giaconía'></Footer>
      </div>
   
  )
}

export default App
