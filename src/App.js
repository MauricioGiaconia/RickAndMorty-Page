import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CardsPage from './components/CardsPage';
import FavouritesPage from './components/FavouritesPage';

function App () {


  return (
    <BrowserRouter>
      <div className='App'>

        <Navigation></Navigation>

        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/personajes' element= {<CardsPage></CardsPage>} />
          <Route path='/favoritos' element= {<FavouritesPage></FavouritesPage>} />
        </Routes>


        <Footer content='© 2023 Proyecto Rick & Morty - Desarrollado por Mauricio Javier Giaconía'></Footer>
      </div>
    </BrowserRouter>
  )
}

export default App
