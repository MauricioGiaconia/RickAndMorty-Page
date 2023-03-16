import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import styles from '../styles/Navigation.module.css';





export default function Navigation(props){
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const logoutHandler = () =>{
        props.onLogout();
    }

    return  <nav className={`${styles.navContainer}`}>
        <ul>
            <li><Link  className={splitLocation[1] === 'personajes' ? `${styles.selected}` : ''} to='/personajes'>PERSONAJES</Link></li>     
            <li><Link  className={splitLocation[1] === 'favoritos' ? `${styles.selected}` : ''} to='/favoritos'>FAVORITOS</Link></li>    
            <li><Link onClick={logoutHandler}> LOGOUT </Link></li> 
        </ul>
    </nav>
}