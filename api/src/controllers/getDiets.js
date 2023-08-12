require("dotenv").config();
const axios = require("axios");
const { URL, API_KEY } = process.env;
const { DietsRecipe } = require("../db");

const getDiets = async (req, res) => {
  try {
    let diets = await DietsRecipe.findAll();

    if (!diets.length) {
      const { data } = await axios(
        `${URL}complexSearch?apiKey=${API_KEY}&number=40&addRecipeInformation=true`
      );

      let set = new Set();

      data.results.map(async (obj) => {
        for (let i = 0; i < obj.diets.length; i++) {
          set.add(obj.diets[i]);

        }
      });

      const allDiets = await DietsRecipe.bulkCreate(
        Array.from(set).map((diet) => {
          return { name: diet };
        
        })
      );

      return res.status(200).json(allDiets);
    }

    return res.status(200).json(diets);
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getDiets,
};
