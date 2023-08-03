const { Router } = require('express');
const { getRecipeById, getRecipeByName } = require('../controllers/getRecipeBy');
const { postRecipes } = require('../controllers/postRecipes');
const { getDiets } = require('../controllers/getDiets');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const routerRecipes = Router();
const routerDiets = Router();

routerRecipes.get('/:id', getRecipeById);
routerRecipes.get('/', getRecipeByName);
routerRecipes.post('/', postRecipes);
routerDiets.get('/', getDiets);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = {
    routerRecipes,
    routerDiets,
};
