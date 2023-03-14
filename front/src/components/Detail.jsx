import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styleMain from '../styles/MainPage.module.css';
import style from '../styles/Detail.module.css'
import Loading from './Loading';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/actions';
import { FaBackward } from 'react-icons/fa';

export default function Detail(props){

    const [charDetail, setCharDetail] = useState([]);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams();

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
      
        <div className={`${style.detailContainer}`}>
            <div className={`${style.detailBackground}`}></div>
            <div className={`${style.imgDetailContainer}`}><img src={charDetail.image} alt={`Image of ${charDetail.name}`} /></div>
            <div className={`${style.characterInfo}`}>
                <h1>{charDetail.name}</h1>
                <ul>
                    <li><strong className={`${style.strongItem}`}>Genero: </strong>{charDetail.gender}</li>
                    <li><strong className={`${style.strongItem}`}>Estado: </strong>{charDetail.status}</li>
                    <li><strong className={`${style.strongItem}`}>Origen: </strong>{charDetail.origin ? charDetail.origin['name'] : 'Desconocido'}</li>
                    <li><strong className={`${style.strongItem}`}>Especie: </strong>{charDetail.species}</li>
                </ul>

                <button className={`${style.backBtn}`} onClick={() => {navigate(-1)}}><FaBackward></FaBackward></button>
            </div>

          
           
        </div>
    </div>
}