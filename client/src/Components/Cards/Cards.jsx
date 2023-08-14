import Card from "../Card/Card";
import Style from "./Styles/Cards.module.css"


export default function Cards(props) {

  return (
    <div>
        <div className={Style.filters}>
            <label>Filtrar por recetas: </label>
            <select onChange={props.handleMyRecipes}>
                <option value='T'>Todas las recetas</option>
                <option value='M'>Mis recetas</option>
                <option value='P'>Recetas de la página</option>
            </select>
            <label>Filtrar por dieta: </label>
            <select onChange={props.handleFilter}>
                <option value='todas'>Todas las dietas</option>
                {props.allDiets.map(diet => {
                    return <option key={diet.id} value={diet.name}>{diet.name}</option>
                })}
            </select>
            <label>Ordenar: </label>
            <select onChange={props.orderRecipes}>
                <option></option>
                <option value='A'>Orden alfabético ascendente</option>
                <option value='D'>Orden alfabético descendente</option>
                <option value='RS'>Orden por receta saludable</option>
                <option value='RNS'>Orden por receta poco saludable</option>
            </select>
        </div>
        <div className={Style.cards}>
            {props.showRecipes.map(recipe => {
                return <Card
                id={recipe.id}
                name={recipe.title || recipe.name}
                summary={recipe.summary}
                healthScore={recipe.healthScore}
                steps={recipe.analyzedInstructions || recipe.steps}
                image={recipe.image}
                diets={recipe.diets}
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
