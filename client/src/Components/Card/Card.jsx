import React from "react";
import { Link } from "react-router-dom";

export default function Card (props) {
    
    return (
        <Link to={`/detail/${props.id}`}>
            <div>
                <img src={props.image} alt="Imagen de receta" ></img>
                <p>{props.name}</p>
                <p>diets: </p>
                {props.diets.map(diet => {
                    return <p key={diet}>{diet}</p>
                })}
            </div>
        </Link>
    )
} 