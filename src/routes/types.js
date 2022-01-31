const { Router } = require("express");
const router = Router();
const { Diet } = require("../db");

router.get("/", async function (req, res, next) {
  try {
    let allDiets = await Diet.findAll();
    let dietTypes = allDiets.map((d) => d.name);

    dietTypes
      ? res.status(200).json(dietTypes)
      : res.status(404).send("Diet types not found");
    console.log(dietTypes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
