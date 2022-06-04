/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from '../logo.svg';
import '../App.css';
import React,{useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../lottie/pokemon';
import Pagination from '../components/Pagination';
//import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const List =()=> {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [datapoke, setdatapoke] = useState();
  const [loading, sedloading] = useState();
  const location = useLocation();
  const [busqueda, setbusqueda] = useState();

  async function peticionApi (){
    sedloading(true)
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=16`)
    .then(response => response.json())
    .then(result => {
       //apiNext(result.next);
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
        sedloading(false)
        //console.log("Result segundo",result)
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
          //console.log("orden pokemons ",pokemons)
          //pokemons.sort();
          //console.log("funciona el orden",pokemons);
          setdatapoke(pokemons)
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

//const apiNext  = async (data) =>{
  //console.log("Aquí la devuelve",data);
//}

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleChange=e=> {
    filtrar(e.target.value)
  }

const filtrar=(terminoBusqueda)=>{
  let resultadosBusqueda=datapoke.filter((it)=>{
    if (it.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
      ){
      return it;
    }
  });
  setdata(resultadosBusqueda);
}

useEffect(() => {
    peticionApi();
  }, [])
  
  return (
    <div className="App container mt-5">
      <div className="buscador">
        <input style={{width: "30%"}} value={busqueda} placeholder="Busca Tu Pokemon Favorito" onChange={handleChange}/>
        <button className="btn">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
      {loading ? 
      <Lottie options={defaultOptions} height={400} width={400}/>
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
