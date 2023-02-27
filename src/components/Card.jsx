import styles from '../styles/Card.module.css';

export default function Card(props) {

   //Separo las clases si tienen espacios en blancos para asignar correctamente el estilo a traves de css module (mythological creature daba undefined si se mandaba completo)
   const splitedClass = props.class.split(' ');

   
   
   return (
      <div className={`${styles.card} ${styles[splitedClass[0]]}`}>
         <div className={`${styles.textContainer}`}>
            <button onClick={props.onClose}>X</button>
            <h2>{props.name}</h2>
            <h2>{props.species}</h2>
            <h2>{props.gender}</h2>
         </div>
       
         <img  src={props.img} alt={props.altImg} />
      </div>
   );
}
