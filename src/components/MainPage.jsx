import Loading from './Loading.jsx';
import style from '../styles/MainPage.module.css';
import indexRick from '../img/rick-index.svg';

export default function MainPage(props){
    return <div className={`${style.mainContainer}`}>
        <div className={`${style.contentContainer}`}>
            <div className={`${style.logoBox}`}>
                <img className={`${style.logoTitle}`} src={require('../img/rickAndMorty-logo.png')} alt='Logo de Rick & Morty' />
                <Loading className={`${style.logow}`}> </Loading>
            
            </div>
            
            <div className={`${style.rickContainer}`}>
                <img className={`${style.indexRick}`} src={indexRick} alt='Rick png'></img>
                <svg></svg>
            </div>
        </div>
       
    </div>
}