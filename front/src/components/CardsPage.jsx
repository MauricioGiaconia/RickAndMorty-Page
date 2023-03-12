import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styleMain from '../styles/MainPage.module.css';
import SearchBar from './SearchBar.jsx';
import Cards from './Cards.jsx';
import Loading from './Loading';
import { connect } from 'react-redux';
import { getCharacters, getCharactersStarted, searchCharacter, searchFirst } from '../redux/actions';

function CardsPage(props) {

  const [next, setNext] = useState(2);
  const [prev, setPrev] = useState(0); 

  const url = 'http://localhost:3001/rickandmorty';

  useEffect(() => {
    props.getCharactersStarted();
    props.getCharacters();
  }, []);


  const onClickHandleSearch = (xid) => {
    props.getCharactersStarted();
    props.searchCharacter(true);
    props.getCharacters(`${url}/onsearch/${xid}`, true);
  }

  const onClickHandleReset = () =>{
    setNext(2);
    setPrev(0);
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
      btnPrev={props.urlPrev ? () => {props.getCharactersStarted();   
                                      setNext(next-1);
                                      setPrev(prev-1);
                                      props.getCharacters(`${url}/characters/${prev}`)} : false}
      btnNext={props.urlNext ? () => { props.getCharactersStarted(); 
                                       setNext(next+1);
                                       setPrev(prev+1);
                                       props.getCharacters(`${url}/characters/${next}`)} : false}></Cards>
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