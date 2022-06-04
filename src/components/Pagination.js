import React from "react";


function Pagination (props){
    const {prevlist, nextlist} = props;
    return(
        <>
        <button onClick={prevlist}>Anterior</button>
        <button onClick={nextlist}>Siguiente</button>
        </>
    )
}

export default Pagination;