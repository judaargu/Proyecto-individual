export const order = (myRecipes, order) => {
  const orderRecipes = myRecipes.sort((a, b) => {
    if (order === "A") {
      if ((a.title || a.name) > (b.title || b.name)) {
        return 1;
      }
      if ((a.title || a.name) < (b.title || b.name)) {
        return -1;
      }
      return 0;
    } else if (order === "D") {
      if ((a.title || a.name) > (b.title || b.name)) {
        return -1;
      }
      if ((a.title || a.name) < (b.title || b.name)) {
        return 1;
      }
      return 0;
    } else if (order === "RNS") {
      if (a.healthScore > b.healthScore) {
        return 1;
      }
      if (a.healthScore < b.healthScore) {
        return -1;
      }
      return 0;
    } else if (order === "RS"){
      if (a.healthScore > b.healthScore) {
        return -1;
      }
      if (a.healthScore < b.healthScore) {
        return 1;
      }
      return 0;
    } else {
        return 0;
    }
  });

  return orderRecipes;
};
