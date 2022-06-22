import React, {useEffect, useState} from "react"
import {useParams,NavLink} from "react-router-dom";
import axios from "axios";
function Up(){
    let {pro} = useParams();
    const [details, setDetails] = useState([]);

    useEffect(()=>{
        console.log(pro)
        axios.get(`https://62959f8e810c00c1cb644854.mockapi.io/projects?p_id=${pro}`)
          .then((response)=>{
              setDetails(response.data)
              console.log(details)
          });
    },[]);
    return(
        <>
            {details.map(info=>{
                return(
                    <h1>{info.p_name}</h1>
                )
            })}
        </>
    )
}

export default Up;