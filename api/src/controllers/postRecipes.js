const { Recipe } = require("../db");

const postRecipes = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;

  try {
    if (!name || !image || !summary || !healthScore || !steps || !diets) {
      return res.status(401).json({ error: "missing data" });
    }

    await Recipe.findOrCreate({
      where: { name },
      defaults: { image, summary, healthScore, steps, diets },
    });

    const allRecipes = await Recipe.findAll();
    return res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  postRecipes,
};
