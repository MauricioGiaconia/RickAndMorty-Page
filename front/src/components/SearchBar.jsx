import style from '../styles/SearchBar.module.css';
import {FaSearch, FaRedo, FaDice} from 'react-icons/fa';
import { useState } from 'react';


export default function SearchBar(props) {
   const [value, setValue] = useState('');

   const handleChange = (event) => {
      setValue(event.target.value);
   }

   const handleClick = (random = false) =>{
 
      if (value && !random){
      
         props.onSearch(value);
    
      } else if (random){
       
         props.onSearch(Math.floor(Math.random() *  (829 - 1 + 1) + 1));
      } 
    
    }
   

   return (
      <div className={`${style.barContainer}`}>
         <input onChange={handleChange} type='search' />
         <button disabled={value ? false : true} onClick={() => {handleClick(false)}}><FaSearch></FaSearch></button> 
         <button onClick={()=>{handleClick(true)}}><FaDice></FaDice></button>
         <button onClick={props.onReset}><FaRedo></FaRedo></button>
      </div>
   );

}