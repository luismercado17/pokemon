import React,{useState, useEffect} from "react";
import Boton from '../components/Boton';
import { useNavigate, useLocation } from "react-router-dom";

const Details =(props)=> {
    const location = useLocation();
    const navigate = useNavigate();
    //console.log("Props en details ",location);
    const [data, setdata] = useState({abilities:[], types:[], stats:[]});
    let apiUrlSpecies = location.state.species.url;
    const [dataspecies, setdataspecies] = useState({egg_groups:[]});

    //console.log("APi ",apiUrlSpecies);

    useEffect(() => {
        peticionApi();
    }, [])

    function peticionApi (){
        fetch(apiUrlSpecies)
        .then(response => response.json())
        .then(r => {
          setdataspecies(r || []) // setdata(r?.abilitiesd)
          //console.log("Datos species",r.color.name)
          //console.log("Imagen url",r.sprites.back_default)
            //let apiUrlSpecies = r.species.url;
            //fetch(apiUrlSpecies)
            //.then(response => response.json())
            //.then(r => {
             //   setdataspecies(r || []) 
           // })
        })
    }
    //console.log("Data ",location.state.abilities)

    return (
        <div className="container" style={{marginTop: "30px"}}>
            <Boton onClick={() => navigate(-1)} onpress={() => navigate(-1) }></Boton>
            <div className="row details_pokemon" style={{alignItems: "center"}}>
                <div className="col-lg-6 col-md-12">
                <ul className="nav nav-tabs" id="pills-tab" role="tablist">
                     <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about" aria-selected="true">About</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-stats-tab" data-bs-toggle="pill" data-bs-target="#pills-stats" type="button" role="tab" aria-controls="pills-stats" aria-selected="false">Base Stats</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab">
                        <div className="row_about">
                        <div className="itemsAbout">
                            <h5>weight:</h5>
                            <p>{location.state.weight}KL</p>
                        </div>
                        <div className="itemsAbout">
                            <h5>height:</h5>
                            <p>{location.state.height}CM</p>
                        </div>
                        <div className="itemsAbout">
                            <h5>Habilidades:</h5>
                            <p className="abilities">
                                {location.state.abilities.map((it)=>
                                <span>{it.ability.name}</span>
                                )}
                            </p>
                        </div>
                        <div className="itemsAbout">
                        <h5>EGG Groups:</h5>
                        <p>
                            {dataspecies.egg_groups.map((it)=>
                            <span>{it.name} </span>
                            )}
                        </p>
                        </div>
                        </div>                       
                    </div>
                    <div className="tab-pane fade" id="pills-stats" role="tabpanel" aria-labelledby="pills-stats-tab">
                    {location.state.stats.map((it)=>
                        <div className="stats_item">
                        <span>{it.stat.name}</span>
                        <span>{it.base_stat}</span>
                        <div className="bord_back"> 
                        {dataspecies?.color?.name && ( 
                        <div style={{width: ` ${it.base_stat > 100 ? 100: it.base_stat}%`, background: dataspecies.color.name}}></div>
                        )}
                        </div>
                        </div>
                    )}
                    

                    </div>
                </div>
                </div>
                <div className="col-lg-6 col-md-12">
                <h2 style={{textAlign: "center", textTransform: "capitalize", fontFamily: "cursive"}}>{location.state.name}</h2>
                {dataspecies?.color?.name && (
                        <div className="tipos_item">{location.state.types.map((it)=>
                            <span style={{background: dataspecies.color.name}}>{it.type.name} </span>
                        )}</div>
                )}
                {dataspecies?.color?.name && (
               <div className="image_pokemon" style={{background: dataspecies.color.name, textAlign: "center", height: "350", display: "flex", justifyContent: "center", borderRadius: "60px 250px 60px 200px"}}>
                    <img style={{width: 300, paddingTop: 60, marginBottom: -80}} src={location.state.sprites.other.dream_world.front_default}/>
                </div>
                )}
            </div>
            </div>
        </div>
    );
}

export default Details;