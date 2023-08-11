import React from "react";
import Card from "../Card/Card";
import Style from "./Styles/Cards.module.css"

export default function Cards(props) {

  return (
    <div>
        <label>Filtrar por recetas: </label>
        <select>
            <option></option>
            <option value='T'>Todas las recetas</option>
            <option value='M'>Mis recetas</option>
            <option value='P'>Recetas de la página</option>
        </select>
        <label>Filtrar por dieta: </label>
        <select>
            <option></option>
            {props.allDiets.map(diet => {
                return <option key={diet.id} value={diet.name}>{diet.name}</option>
            })}
        </select>
        <label>Ordenar: </label>
        <select>
            <option></option>
            <option value='aa'>Orden alfabético ascendente</option>
            <option value='ad'>Orden alfabético descendente</option>
            <option value='rs'>Orden por receta saludable</option>
            <option value='rns'>Orden por receta poco saludable</option>
        </select>
        <div className={Style.cards}>
            {props.showRecipes.map(recipe => {
                return <Card
                id={recipe.id}
                name={recipe.title || recipe.name}
                summary={recipe.summary}
                healthScore={recipe.healthScore}
                steps={recipe.analyzedInstructions || recipe.steps}
                image={recipe.image}
                diets={recipe.diets || recipe.dietsRecipe}
                key={recipe.id}
                />
            })}
        </div>
        <div className={Style.pages}>
            <button onClick={props.handlerPrev}>Prev</button>
            <h3>Página: {props.current + 1}</h3>
            <button onClick={props.handlerNext}>Next</button>
        </div>
    </div>
  );
}
