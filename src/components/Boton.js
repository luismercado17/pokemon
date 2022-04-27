import React from "react";
import { useNavigate } from "react-router-dom";

function Boton (props) {

    return (
    <div>
        <button {...props}><i class="fa-solid fa-arrow-left-long"></i> Atras</button>
    </div>
    )
}

export default Boton;