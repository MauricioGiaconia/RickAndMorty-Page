import style from '../styles/Form.module.css';
import {useState} from 'react';

export default function Form(props) {

    const [userData, setUserData] = useState({ username: '', password: '' });
    const [isEmail, setIsEmail] = useState(false);
    const [isPass, setIsPass] = useState(true);

    const onEmailChangeHandler = (e) => {
        
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])+.[a-zA-Z]*$/;
       
        if (e.target['value'].match(validRegex)){
        
            setIsEmail(true);
            setUserData({...userData, username : e.target.value});
            return;
        }   
      
        setUserData({...userData, username : e.target.value});
        setIsEmail(false);
    }

    const onPasswordChangeHandler = (e) => {
        if (e.target['value'].length >= 6 && e.target['value'].length <= 10){
            if (/[a-zA-Z]*\d+[a-zA-Z]*/.test(e.target['value'])){
                setUserData({...userData, password : e.target.value});
                return setIsPass(true);

            }
        } 

        setUserData({...userData, password : e.target.value});
        return setIsPass(false);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if (e.nativeEvent.submitter['id'] == 'invitedBtn'){
            return props.onLogin({username : 'maurigiaconia@hotmail.com', password : 'password18'});
        }

        return props.onLogin(userData);
    }

    return <div className={`${style.formContainer}`}>
        <form action='' onSubmit={onSubmit}>
            <label htmlFor="username">Usuario: </label>
            <div className={`${style.inputBorder}`}>
                <input type="text" onChange={onEmailChangeHandler}/>
            </div> <br />
            {!isEmail && userData.username != '' ? <p className={`${style.errorMessage}`}>¡Debes ingresar un mail valido!</p> : false}
            <label htmlFor="password">Contraseña: </label>
            <div className={`${style.inputBorder}`}>
                <input type="password" onChange={onPasswordChangeHandler}/>
            </div> <br />
            {!isPass && userData.password != '' ? <p className={`${style.errorMessage}`}>La contraseña debe contener:<br/>
             * Minimo un numero! <br/> 
             * Entre 6 y 10 caracteres!</p> : false}
           
            <div className={`${style.inputBorder}`}>
                <button>LOGIN</button>
                
            </div>

            <div className={`${style.inputBorder} ${style.lastElement}`}>
                <button id='invitedBtn'>Entrar como invitado</button>
            </div>
        </form>
    </div>
}