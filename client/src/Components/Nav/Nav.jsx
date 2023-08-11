import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from '../Search bar/SearchBar';
import Style from './Styles/Nav.module.css'

export default function Nav (props) {

    const location = useLocation();

    return (
        <div>
            <img src="/src/Components/Nav/Image/titulo.png" alt="Título" className={Style.titulo}></img>
            <div className={Style.nav}>
                <Link to='/form'><button>Nueva receta</button></Link>
                {location.pathname === '/home' && <SearchBar onSearch={props.onSearch}/>}
                <Link to='/home'><button>Home</button></Link>
            </div>
        </div>
    )
};