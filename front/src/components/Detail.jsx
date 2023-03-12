import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styleMain from '../styles/MainPage.module.css';
import Loading from './Loading';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/actions';

export default function Detail(props){

    const [charDetail, setCharDetail] = useState([]);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const id = useParams();
    
    console.log(loading);

    const getDetail = async (xid) =>{
    
        await axios.get(`http://localhost:3001/rickandmorty/detail/${xid}`)
        .then((response) => response.data)
        .then((data) => {
           
            setCharDetail(data);
            dispatch(setLoading(false));
        })
        .catch((err) => {console.log(err)});
    }

    
    useEffect(() => {
        getDetail(id.id);
       
    }, []);

    if (loading){
        return <div key={id.id} className={`${styleMain.mainContainer}`}>
            <Loading></Loading>
        </div>
    }

    return <div key={id.id} className={`${styleMain.mainContainer}`}>
        <div className={`imgDetail`}><img src={charDetail.image} alt={`Image of ${charDetail.name}`} /></div>
        <h1>{charDetail.name}</h1>
        <ul>
            <li><strong>Genero: </strong>{charDetail.gender}</li>
            <li><strong>Estado: </strong>{charDetail.status}</li>
            <li><strong>Origen: </strong>{charDetail.origin ? charDetail.origin['name'] : 'Desconocido'}</li>
            <li><strong>Especie: </strong>{charDetail.species}</li>
        </ul>
    
  
    </div>
}