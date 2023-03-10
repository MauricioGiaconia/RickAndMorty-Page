
const url = `https://rickandmortyapi.com/api`;

//Exportamos la funcion que recibira una cb por parametro la cual se encargará de dibujar cada card

function getCharacters(done){
 
  const chars = fetch(url + '/character')
  chars 
    .then( response => {

        if (response.status == 200){
          return response.json();
        }
      }
    )
    .then(data => {
      
      done(data);
      
      }
  
    );
  

}



number=5; console.log(number);  

const characters = [
  {
    id: 2,
    name: "Morty Smith",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    id: 3,
    name: "Summer Smith",
    species: "Human",
    gender: "Female",
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    id: 4,
    name: "Beth Smith",
    species: "Human",
    gender: "Female",
    image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
];

export const Rick = {
  id: 1,
  name: "Rick Sanchez",
  species: "Human",
  gender: "Male",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

export default getCharacters;
