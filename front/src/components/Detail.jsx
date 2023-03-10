import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styleMain from '../styles/MainPage.module.css';
import axios from 'axios';

export default function Detail(){

    const [charDetail, setCharDetail] = useState({});
    const id = useParams();
 
    const getDetail = async (xid) =>{
    
        await axios.get(`http://localhost:3001/rickandmorty/detail/${xid}`)
        .then((response) => response.data)
        .then((data) => {
            setCharDetail(data);
        })
        .catch((err) => {console.log(err.data)});
    }

    useEffect(() => {
        getDetail(id.id);
       
    }, []);


    return <div key={id.id} className={`${styleMain.mainContainer}`}>
        <div className={`imgDetail`}><img src={charDetail.image} alt={`Image of ${charDetail.name}`} /></div>
        <h1>{charDetail.name}</h1>
        <p><strong>Genero: </strong>{charDetail.gender}</p><br />
        <p><strong>Estado: </strong>{charDetail.status}</p><br />
        <p><strong>Origen: </strong>{charDetail.origin['name']}</p><br />
        <p><strong>Especie: </strong>{charDetail.species}</p><br />
    </div>
}