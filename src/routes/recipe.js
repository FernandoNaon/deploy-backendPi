const { Router } = require("express");
const router = Router();
const { postRecipe } = require("../Controllers/RecipeControllers");

router.post("/", async (req, res, next) => {
  const { name, summary, rating, healthScore, steps, diets, image } = req.body;
  try {
    const addRecipe = await postRecipe(
      name,
      summary,
      rating,
      healthScore,
      steps,
      diets,
      image
    );
    addRecipe
      ? res.status(200).json(addRecipe)
      : res.status(400).json({ message: "Error: Recipe not created" });
    console.log(addRecipe);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
