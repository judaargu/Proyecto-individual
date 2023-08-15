import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Style from "./Styles/Detail.module.css";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  let allSteps;
  let table;

  useEffect(() => {
    axios(`http://localhost:3001/recipes/${id}`).then(({ data }) => {
      setRecipe(data);
    });
    return setRecipe({});
  }, [id]);

  if (recipe.analyzedInstructions) {
    allSteps = recipe.analyzedInstructions[0].steps;
  } else {
    allSteps = recipe.steps;
  }

  if (allSteps) {
    table = allSteps.map((step) => {
      const ingredients = step.ingredients.map((ingredient) => {
        if (ingredient.name) {
          return (
            <label key={ingredient.name}>
              <input
                type="checkbox"
                key={ingredient.id}
                name={`chb${ingredient.id}`}
              />
              {ingredient.name}
              <br />
            </label>
          );
        } else {
          return (
            <label key={ingredient}>
              <input
                type="checkbox"
                key={ingredient}
                name={`chb${ingredient}`}
              />
              {ingredient}
              <br />
            </label>
          );
        }
      });

      return (
        <li key="steps">
          <br />
          Ingredients: <br />
          {ingredients} <br />
          Step: <br />
          {step.step}{" "}
        </li>
      );
    });
  }

  return (
    <div>
      <img src={recipe.image} alt="Imagen receta"></img>
      {recipe.name && <h2>{recipe.name}</h2>}
      <div className={Style.detailDiv}>
        <span>ID: </span>
        <p>{id}</p>
        <br />
        <span>Summary: </span>
        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
        <br />
        <span>Health Score: </span>
        <p>{recipe.healthScore}</p>
        <br />
        <span>Diets: </span>
        <ul>
          {recipe.diets
            ? recipe.diets.map((diet) => {
                return <li key={diet}>{diet}</li>;
              })
            : "There are not diets"}
        </ul>
        <br />
        <span>Steps: </span>
        <ol>{table}</ol>
        <br />
      </div>
    </div>
  );
}

