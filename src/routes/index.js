const { Router } = require("express");
// Importar todos los routers;
const recipes = require("./recipes");
const recipe = require("./recipe");
const types = require("./types");

const router = Router();

// Configurar los routers
router.use("/recipes", recipes);
router.use("/recipe", recipe);
router.use("/types", types);

module.exports = router;
