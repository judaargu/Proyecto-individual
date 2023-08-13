const RECIPES_PER_PAGE = 9;

export const next = (current, setCurrent, myRecipes, setShowRecipes) => {
    const next = current + 1;
    const initialStep = next * RECIPES_PER_PAGE;

    if (initialStep > myRecipes.length) return;

    setShowRecipes([...myRecipes].splice(initialStep, RECIPES_PER_PAGE));

    setCurrent(next);
}

export const prev = (current, setCurrent, myRecipes, setShowRecipes) => {
    const prev = current - 1;
    const initialStep = prev * RECIPES_PER_PAGE;

    if (prev < 0) return;

    setShowRecipes([...myRecipes].splice(initialStep, RECIPES_PER_PAGE));

    setCurrent(prev);
}

