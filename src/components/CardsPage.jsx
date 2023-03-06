import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styleMain from '../styles/MainPage.module.css';
import SearchBar from './SearchBar.jsx';
import Cards from './Cards.jsx';
import Loading from './Loading';
import { connect } from 'react-redux';
import { getCharacters, getCharactersStarted, searchCharacter, searchFirst } from '../redux/actions';

function CardsPage(props) {

  const url = 'https://be-a-rym.up.railway.app/api';

  useEffect(() => {
    props.getCharactersStarted();
    props.getCharacters();
  }, []);


  const onClickHandleSearch = (xid) => {
    props.getCharactersStarted();
    props.searchCharacter(true);
    props.getCharacters(`${url}/character/${xid}?`, true);
  }

  const onClickHandleReset = () =>{
    props.getCharactersStarted();
    props.searchCharacter(false);
    props.searchFirst();
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

    <Cards faIconNext={<FaArrowRight />}
      faIconPrev={<FaArrowLeft />}
      data={props.characters}
      dataType='character'
      btnPrev={props.urlPrev ? () => {props.getCharactersStarted(); props.getCharacters(`${props.urlPrev}&`)} : false}
      btnNext={props.urlNext ? () => { props.getCharactersStarted(); props.getCharacters(`${props.urlNext}&`)} : false}></Cards>
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