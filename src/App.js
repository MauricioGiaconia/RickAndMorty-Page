import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CardsPage from './components/CardsPage';

function App () {


  return (
    <BrowserRouter>
    <div className='App'>

      <Navigation></Navigation>

      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/personajes' element= {<CardsPage></CardsPage>} />
      </Routes>


      {/*       <div className='indexTest'>

              <div className='logo-border'>

                  <div className='logo-border-two'>
                    <div className='logo-border-center'>

                    </div>


                  </div>

              </div>} 

      
      </div>*/}


     
       

      
     

      <Footer content='© 2023 Proyecto Rick & Morty - Desarrollado por Mauricio Javier Giaconía'></Footer>
    </div>
    </BrowserRouter>
  )
}

export default App
