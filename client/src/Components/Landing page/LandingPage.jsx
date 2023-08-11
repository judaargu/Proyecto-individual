import React from "react";
import { Link } from "react-router-dom";
import Style from "./Styles/LandingPage.module.css";

export default function LandingPage(params) {
  return (
    <div className={Style.landing}>
      <img src="src/Components/Landing page/Image/Landing-image.png" alt="Imagen de bienvenida"></img>
      <div className={Style.text}>
          <h1>¡Bienvenido a nuestra api food!</h1>
          <h3>Haz clic en el botón de ingresar para encontrar nuestras mejores recetas...</h3>
      </div>
      <Link to="/home">
        <button onClick={params.onClick} className={Style.enterButton}>
            <span className={Style.noHover}>Ingresar</span> 
            <span className={Style.hoverButton}>¡Bienvenido!</span>
        </button>
      </Link>
    </div>
  );
}
