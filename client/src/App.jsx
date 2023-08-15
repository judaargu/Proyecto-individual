import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Components/Landing page/LandingPage";
import Cards from "./Components/Cards/Cards";
import Detail from "./Components/Detail/Detail";
import Form from "./Components/Form page/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Nav from "./Components/Nav/Nav";
import { getRecipes } from "./Redux/actions";
import { next, prev } from "./pages";
import { order } from "./order";
const RECIPES_PER_PAGE = 9;

function App() {
  const [access, setAccess] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const [allDiets, setAllDiets] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myRecipes = useSelector(state => state.myRecipes);

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
      setAllRecipes(data);
      dispatch(getRecipes(data));
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
      dispatch(getRecipes(data));
      setAllRecipes(data)
      setShowRecipes([...data].splice(0, RECIPES_PER_PAGE));
      setCurrent(0);
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleFilter = (event) => {

    if (event.target.value !== 'todas'){
      const filteredRecipes = allRecipes.filter(recipe => recipe.diets.includes(event.target.value));
      setShowRecipes([...filteredRecipes].splice(0, RECIPES_PER_PAGE));
      dispatch(getRecipes(filteredRecipes));
      setCurrent(0)

    } else {
      setShowRecipes([...allRecipes].splice(0, RECIPES_PER_PAGE));
      dispatch(getRecipes(allRecipes));
      setCurrent(0);
    }
  };

  const handleMyRecipes = (event) => {

    if (event.target.value === 'M'){
      const filteredRecipes = myRecipes.filter(recipe => typeof recipe.id === 'string');
      setShowRecipes([...filteredRecipes].splice(0, RECIPES_PER_PAGE));
      setCurrent(0);
    } else if (event.target.value === 'P'){
      const filteredRecipes = myRecipes.filter(recipe => typeof recipe.id === 'number');
      setShowRecipes([...filteredRecipes].splice(0, RECIPES_PER_PAGE));
      setCurrent(0);
    } else {
      setShowRecipes([...myRecipes].splice(0, RECIPES_PER_PAGE));
      setCurrent(0);
    }

  };

  const orderRecipes = (event) => {

    const ordered = order(myRecipes, event.target.value);
    setShowRecipes([...ordered].splice(0, RECIPES_PER_PAGE));
    setCurrent(0);

  }
  
  const handlerPrev = () => {
    prev(current, setCurrent, myRecipes, setShowRecipes);

  };

  const handlerNext = () => {
    next(current, setCurrent, myRecipes, setShowRecipes);

  };

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch} onClick={onClick}/>}
      <Routes>
        <Route path="/" element={<LandingPage onClick={onClick} />}></Route>
        <Route
          path="/home"
          element={
            <Cards
              current={current}
              showRecipes={showRecipes}
              handleFilter={handleFilter}
              handleMyRecipes={handleMyRecipes}
              orderRecipes={orderRecipes}
              handlerNext={handlerNext}
              handlerPrev={handlerPrev}
              allDiets={allDiets}
            />
          }
        ></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
