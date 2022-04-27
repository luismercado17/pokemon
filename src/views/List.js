import logo from '../logo.svg';
import '../App.css';
import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';

const List =()=> {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [loading, sedloading] = useState();

  useEffect(() => {
    peticionApi();
  }, [])

  async function peticionApi (){
    sedloading(true)
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
    .then(response => response.json())
    .then(result => {
      sedloading(false)
      //console.log('result',result)
      buscarImagenes(result.results)
    })
  }

  const buscarImagenes = async (data) =>{
    //console.log('data parametro',data)
    let pokemons = []
    //console.log("Pokemons", pokemons)
    const dataResult = await data.map((it,item)=>
      fetch(it.url)
      .then(response => response.json())
      .then(result => {
        pokemons.push(result)
        if(item +1  === data.length){
          // como ordenar con sort
          pokemons.sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          console.log("orden pokemons ",pokemons)
          //pokemons.sort();
          //console.log("funciona el orden",pokemons);
          setdata(pokemons)
        }
      })
    )
  }

  
  //console.log("Data afuera", data);

  function click_pokemon (e, it){
    e.preventDefault();
    //console.log("Datos it ",it);
    navigate(`/details`, {state:it});
  }

  return (
    <div className="App container mt-5">
      {loading ? 
      <img src='https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'/>
      :
      
      <div className="list_poke row">
        {data.map((it)=> {
          //console.log("IT Map",it)
          return(
            <div className='col-item'>
              <a onClick={(e) => click_pokemon (e, it)}>
                <img src={it.sprites.other.dream_world.front_default}/>
                <h3>{it.name}</h3>
              </a>
            </div>
          )
        }
         )}
         </div>
      
      }
    </div>
  );
}

export default List;
