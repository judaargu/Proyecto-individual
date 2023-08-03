require("dotenv").config();
const axios = require("axios");
const { URL, API_KEY } = process.env;
const { Recipe } = require("../db");

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    let { data } = await axios(`${URL}${id}/information?apiKey=${API_KEY}`);

    const recipe = await Recipe.findOrCreate({
      where: { name: data.title },
      defaults: {
        image: data.image,
        steps: data.analyzedInstructions,
        healthScore: data.healthScore,
        summary: data.summary,
      },
    });

    return res.status(200).json(recipe);

  } catch (error) {
    return res.status(404).json({error: error.message + ': ' + id + ' does not exist'});

  }
};

const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  let recipes = [];

  try {
    const { data } = await axios(
      `${URL}complexSearch?apiKey=${API_KEY}&titleMatch=${name}&addRecipeInformation=true`
    );

    if (!data.results.length) {
      return res.status(404).json({ message: `Name ${name} doesn't exist` });
    }

    for (let i = 0; i < data.results.length; i++) {
      let recipe = await Recipe.findOrCreate({
        where: { name: data.results[i].title },
        defaults: {
          image: data.results[i].image,
          steps: data.results[i].analyzedInstructions[0].steps,
          healthScore: data.results[i].healthScore,
          summary: data.results[i].summary,
        },
      });
      recipes.push(recipe[0]);
    }

    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getRecipeById,
  getRecipeByName,
};
