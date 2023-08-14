import React, { useState } from "react";
import { validate } from "../../validate";
import { useDispatch } from "react-redux";
import { addRecipe } from "../../Redux/actions";
import Style from "./Styles/Form.module.css";

export default function Form() {
  const [step, setStep] = useState({ ingredients: [], step: "" });
  const [allSteps, setAllSteps] = useState([]);
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: [],
    image: "",
    diets: [],
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.name === "ingredients" || event.target.name === "step") {
      const newValue =
        event.target.name === "ingredients"
          ? event.target.value.split(",")
          : event.target.value;
      setStep({ ...step, [event.target.name]: newValue });
    } else if (event.target.name === "diets") {
      const diets = event.target.value.split(",");

      setInput({ ...input, diets });
      setErrors(validate({ ...input, diets }));
    } else if (event.target.name === "healthScore") {
      setInput({ ...input, [event.target.name]: Number(event.target.value) });
      setErrors(
        validate({ ...input, [event.target.name]: Number(event.target.value) })
      );
    } else {
      setInput({ ...input, [event.target.name]: event.target.value });
      setErrors(
        validate({ ...input, [event.target.name]: event.target.value })
      );
    }
  };

  const onClick = (event) => {
    event.preventDefault();
    setAllSteps([...allSteps, step]);
    setInput({ ...input, steps: [...allSteps, step] });
    setStep({ ingredients: [], step: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(errors).length === 0) {
      dispatch(addRecipe(input));
    }

    setAllSteps([]);
    setInput({
      name: "",
      summary: "",
      healthScore: 0,
      steps: [],
      image: "",
      diets: [],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={Style.formText}>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={Style.form}>
          <label>Resumen: </label>
          <textarea
            name="summary"
            cols="30"
            rows="3"
            onChange={handleChange}
            value={input.summary}
          ></textarea>
          {errors.summary && <p>{errors.summary}</p>}
        </div>

        <div className={Style.formText}>
          <label>Health Score: </label>
          <input
            type="number"
            name="healthScore"
            onChange={handleChange}
            value={input.healthScore}
          />
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>

        <div className={Style.form}>
          <label>Paso a paso </label>
          <br />
          <label>Ingredientes para este paso: </label>
          <input
            type="text"
            name="ingredients"
            onChange={handleChange}
            value={step.ingredients.join(",")}
            placeholder="Separa los ingredientes por coma"
          />
          <label></label>
          <label>Paso: </label>
          <textarea
            name="step"
            cols="30"
            rows="3"
            onChange={handleChange}
            value={step.step}
          ></textarea>
          <button onClick={onClick}>Añadir paso</button>
        </div>

        <div className={Style.formText}>
          <label>Imagen: </label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={input.image}
          />
        </div>

        <div className={Style.formText}>
          <label>Dietas: </label>
          <input
            type="text"
            name="diets"
            onChange={handleChange}
            value={input.diets.join(",")}
            placeholder="Separa las dietas por coma y al final pon una coma"
          />
          {errors.diets && <p>{errors.diets}</p>}
        </div>

        <button type="submit" className={Style.buttonForm}>
          Crear receta
        </button>
      </form>
    </div>
  );
}
