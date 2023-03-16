import style from '../styles/Form.module.css';
import {useState} from 'react';

export default function Form(props) {

    const [userData, setUserData] = useState({ username: '', password: '' });

    return <div className={`${style.formContainer}`}>
        <form action="">
            <label htmlFor="username">Usuario: </label>
            <div className={`${style.inputBorder}`}>
                <input type="text" />
            </div>
            <label htmlFor="password">Contraseña: </label>
            <div className={`${style.inputBorder}`}>
                <input type="password" />
            </div>
           
            <button>LOGIN</button>
        </form>
    </div>
}