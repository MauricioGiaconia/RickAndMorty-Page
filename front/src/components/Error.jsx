import styleMain from '../styles/MainPage.module.css';
import style from '../styles/Error.module.css';
import { cleanErrors } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Error(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cleanErrors);
    }, [])

    if (props.inFavorites){
        return <div className={`${style.errorFavourite}`}>
        <div className={`${style.errorContainer}`}>
            <h1>{props.errorText}</h1>
        </div>
        <div className={`${style.imgContainer}`}>       
            <img src={require('../img/errors.png')} alt="Img of error feedback" />
        </div>
    </div>
    }
   

    return <div className={`${styleMain.mainContainer}`}>
        <div className={`${style.errorContainer}`}>
            <h1>{props.errorText}</h1>
        </div>
        <div className={`${style.imgContainer}`}>       
            <img src={require('../img/errors.png')} alt="Img of error feedback" />
        </div>
    </div>
}