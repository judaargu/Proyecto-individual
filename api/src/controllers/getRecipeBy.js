require("dotenv").config();
const axios = require("axios");
const { URL, API_KEY } = process.env;
const { Recipe } = require("../db");

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    let { data } = await axios(`${URL}${id}/information?apiKey=${API_KEY}`);
    
    return res.status(200).json(data);
  } catch (error) {

    try {

      const [recipe] = await Recipe.findAll({where: {id}});
      return res.status(200).json(recipe);

    } catch (error) {
      return res.status(404).json({ error: error.message + ": " + id + " does not exist" });
    }
  }

  // } else {
    
    
  // }
};

const getRecipeByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    try {
      const { data } = await axios(
        `${URL}complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      );
      
      const recipe = await Recipe.findAll();
      const allRecipes = [...recipe, ...data.results];

      return res.status(200).json(allRecipes);
    } catch (error) {
      return res.status(500).json(error.message);
    }

  }else{
    try {
      const { data } = await axios(
        `${URL}complexSearch?apiKey=${API_KEY}&titleMatch=${name}&number=100&addRecipeInformation=true`
      );
  
      if (!data.results.length) {
        return res.status(404).json({ message: `Name ${name} doesn't exist` });
      }
  
      return res.status(200).json(data.results);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  
};

module.exports = {
  getRecipeById,
  getRecipeByName,
};
