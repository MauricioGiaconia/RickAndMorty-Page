import { useDispatch } from "react-redux";
import { orderCards } from "../redux/actions";


const Selector = (props) =>{

    

    const optionsOrder =[{ value: 'asc', label: 'Ascendente'},
                        {value: 'desc', label: 'Descendente'}];

    const optionsGender =   [{value: 'male', label: 'Masculino'},
                            {value: 'female', label: 'Femenino'},
                            {value: 'unknown', label: 'Desconocido'},
                            {value: 'genderless', label: 'Genderless'}];

    const printOrderOpt = (options) =>  options.map((opt, index) => {return <option key={index} value={opt.value}>{opt.label}</option>})
    
   

    return <div>
   
  
            <select onChange={props.order} name="order" id="selectOrder">
                { printOrderOpt(optionsOrder)}
            </select>
            <select name="gender" id="selectGender">
                {printOrderOpt(optionsGender)}
            </select>

    </div>
}

export default Selector;