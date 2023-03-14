import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styleMain from '../styles/MainPage.module.css';
import style from '../styles/Cards.module.css';
import SearchBar from './SearchBar.jsx';
import Cards from './Cards.jsx';
import Loading from './Loading';
import { connect } from 'react-redux';
import { getCharacters, getCharactersStarted, searchCharacter, searchFirst } from '../redux/actions';
import { useParams, Link, useNavigate } from 'react-router-dom';

function CardsPage(props) {

  const url = 'http://localhost:3001/rickandmorty';
  const {page} = useParams();
  const navigate = useNavigate();

  let prev = parseInt(page) - 1;
  let next = parseInt(page) + 1;

  if (isNaN(page)){
    next = 2;
  }

  useEffect(() => {
    props.getCharactersStarted();
    
    if (page){
      props.getCharacters(`${url}/characters/${page}`);
    } else{
      props.getCharacters();
    }
    
  
  }, [useParams()]);

  const onClickHandleSearch = (xid) => {
    props.getCharactersStarted();
    props.searchCharacter(true);
    props.getCharacters(`${url}/onsearch/${xid}`, true);
  }

  const onClickHandleReset = () =>{
    props.getCharactersStarted();
    props.searchCharacter(false);
    props.searchFirst();
    navigate('/personajes');
    props.getCharacters();
  }



  if (props.loading) {
    return <div className={`${styleMain.mainContainer}`}>
      <Loading></Loading>
    </div>
  }

  return <div className={`${styleMain.mainContainer}`}>

    <div style={{ width: '100%', marginBottom: 'auto' }}>
      <SearchBar
        onSearch={onClickHandleSearch}
        onReset={onClickHandleReset}
      />
     
    </div>

    <Cards
      data={props.characters}
      dataType='character'></Cards>


      {props.urlPrev ? <Link to={`/personajes/${prev}`} className={`${style.btnPagination}`}><FaArrowLeft></FaArrowLeft></Link> : false} 

      {props.urlNext ? <Link to={`/personajes/${next}`} className={`${style.btnPagination}`}><FaArrowRight></FaArrowRight></Link> : false}
      
  </div>
}

export function mapDispatchToProps(dispatch){
  return{
    getCharacters : (url) => dispatch(getCharacters(url)),
    getCharactersStarted : () => dispatch(getCharactersStarted()),
    searchCharacter : (search) => dispatch(searchCharacter(search)),
    searchFirst : () => dispatch(searchFirst())
  }
}

export function mapStateToProps(state){
  return{
    characters : state.characters,
    urlPrev : state.urlPrev,
    urlNext : state.urlNext,
    cleanList : state.cleanCharacterList,
    loading: state.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);