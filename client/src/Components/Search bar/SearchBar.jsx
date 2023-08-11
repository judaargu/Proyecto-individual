import React, { useState } from "react";
import Styles from './Styles/SearchBar.module.css';

export default function SearchBar (props) {

    const [name, setName] = useState('');

    const handleChange = (event) =>{
        setName(event.target.value);
    }

    return (
        <div className={Styles.search}>
            <input type="search" placeholder="Busca una receta" onChange={handleChange} value={name}/>
            <button onClick={() => {props.onSearch(name)}} id={Styles.searchButton}>Buscar</button>
        </div>
    );
}