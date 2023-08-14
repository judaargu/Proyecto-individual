const NUM_REGEX = /(\d+)/g;

export const validate = (input) => {
    let errors = {};
    let diets = ['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan', 'paleolithic', 'primal', 'whole 30', 'pescatarian', 'ketogenic', 'foodmap friendly'];
    let wrongDiet;
   
    if (input.name.match(NUM_REGEX)) {
        errors.name = 'Los nombres de las recetas no pueden contener números';
    }
    if (input.summary.match(NUM_REGEX)) {
        errors.summary = 'El resumen no puede contener números';
    }
    if (input.healthScore < 1 || input.healthScore > 100){
        errors.healthScore = 'El valor no puede ser menor a 1 o mayor a 100';
    }

    for (let i = 0; i < input.diets.length; i++) {
        let validation = false;
        for (let j = 0; j < diets.length; j++) {
            if (input.diets[i] === diets[j]){
                validation = true;
            }
        }
        if (!validation) {
            wrongDiet = input.diets[i];
        }
    }

    if (wrongDiet) {
        errors.diets = `La dieta ${wrongDiet} no es válida`
    }
    
    return errors;
}

