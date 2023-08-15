import React from "react";
import { NavLink } from "react-router-dom";
import Style from './Styles/Card.module.css'

export default function Card (props) {
    
    return (
        <NavLink to={`/detail/${props.id}`} className={Style.navLink}>
            <div className={Style.cardStyle}>
                <div className={Style.image}><img src={props.image} alt="Imagen de receta" ></img></div>
                <div className={Style.info}>
                    <h2>{props.name}</h2>
                    <h3>diets: </h3>
                    {props.diets.map(diet => {
                        return <p key={diet}>{diet}</p>
                    })}
                </div>
            </div>
        </NavLink>
    )
} 