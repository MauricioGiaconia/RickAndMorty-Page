import style from '../styles/SearchBar.module.css';
import {FaSearch, FaRedo} from 'react-icons/fa';
import { useState } from 'react';


export default function SearchBar(props) {
   const [value, setValue] = useState('');
   const [searching, setSearching] = useState(0);


   const handleChange = (event) => {
      setValue(event.target.value);
   }

   const handleClick = () =>{
 
      if (value){
      
         props.onSearch(value);
    
      } 
    
    }
   

   return (
      <div className={`${style.barContainer}`}>
         <input onChange={handleChange} type='search' />
         <button disabled={value ? false : true} onClick={handleClick}><FaSearch></FaSearch></button> 
         <button onClick={props.onReset}><FaRedo></FaRedo></button>
      </div>
   );

}