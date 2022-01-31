const { Router } = require("express");
const router = Router();
const {
  getRecipes,
  getByName,
  getDbbyId,
  getApiById,
} = require("../Controllers/RecipesController");

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      const recipeByName = await getByName(name);

      recipeByName.length
        ? res.status(200).json(recipeByName)
        : res.status(404).send("Recipe not found");
    } else {
      const allRecipes = await getRecipes();
      allRecipes.length
        ? res.status(200).json(allRecipes)
        : res.status(404).send("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (typeof id === "string" && id.length > 15) {
      const dbId = await getDbbyId(id);

      dbId
        ? res.status(200).json(dbId)
        : res.status(404).send("Recipe not found");
    } else {
      const apiId = await getApiById(id);
      apiId
        ? res.status(200).json(apiId)
        : res.status(404).send("Recipe not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
