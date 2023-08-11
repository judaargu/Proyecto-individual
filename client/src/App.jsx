import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Components/Landing page/LandingPage";
import Cards from "./Components/Cards/Cards";
import Detail from "./Components/Detail/Detail";
import Form from "./Components/Form page/Form";
import { useState, useEffect } from "react";
import Nav from "./Components/Nav/Nav";
const RECIPES_PER_PAGE = 9;

function App() {
  const [recipes, setRecipes] = useState();
  const [access, setAccess] = useState(false);
  const [allDiets, setAllDiets] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const onClick = async () => {
    if (!access) {
      setAccess(true);
    }

    try {
      let response = await fetch(`http://localhost:3001/recipes`);

      if (!response.ok) {
        return window.alert("hubo un problema al cargar las recetas");
      }

      const data = await response.json();
      setRecipes(data);

      setShowRecipes([...data].splice(0, RECIPES_PER_PAGE));
    } catch (error) {
      return console.log(error.message);
    }

    try {
      let responseDiets = await fetch(`http://localhost:3001/diets`);

      if (!responseDiets.ok) {
        return window.alert("hubo un problema al cargar las dietas");
      }

      const dataDiets = await responseDiets.json();
      
      setAllDiets(dataDiets);
    } catch (error) {
      return console.log(error.message);
    }

  };

  const onSearch = async (name) => {
    try {
      let response = await fetch(`http://localhost:3001/recipes?name=${name}`);

      if (!response.ok) {
        return window.alert("No existe receta con ese nombre");
      }

      const data = await response.json();
      setRecipes(data);
      setShowRecipes([...data].splice(0, RECIPES_PER_PAGE));
      setCurrent(0);
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handlerNext = () => {
    const next = current + 1;
    const initialStep = next * RECIPES_PER_PAGE;

    if (initialStep > recipes.length) return;

    setShowRecipes([...recipes].splice(initialStep, RECIPES_PER_PAGE));
    setCurrent(next);
  };

  const handlerPrev = () => {
    const prev = current - 1;
    const initialStep = prev * RECIPES_PER_PAGE;

    if (prev < 0) return;

    setShowRecipes([...recipes].splice(initialStep, RECIPES_PER_PAGE));
    setCurrent(prev);
  };

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<LandingPage onClick={onClick} />}></Route>
        <Route
          path="/home"
          element={
            <Cards
              current={current}
              showRecipes={showRecipes}
              handlerNext={handlerNext}
              handlerPrev={handlerPrev}
              allDiets={allDiets}
            />
          }
        ></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
