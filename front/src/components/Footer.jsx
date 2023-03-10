import style from '../styles/Footer.module.css';

export default function Footer(props){
    return <footer>
        <span className={`${style.foot}`}>{props.content}</span>
    </footer>
}