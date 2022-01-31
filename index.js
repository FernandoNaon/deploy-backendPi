//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Diet } = require("./src/db.js");
const axios = require("axios");
const { API_KEY6, PORT } = process.env;

// const typeOfDiets = [
//   "gluten free",
//   "ketogenic",
//   "vegetarian",
//   "lacto vegetarian",
//   "ovo vegetarian",
//   "lacto ovo vegetarian",
//   "vegan",
//   "pescetarian",
//   "paleo",
//   "primal",
//   "low fodmap",
//   "whole 30",
//   'dairy free',
// ];

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  // typeOfDiets.map((diet) => {
  //   Diet.create({
  //     name: diet,
  //   });
  // });

  try {
    const res = await axios.get(
      ` https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY6}&number=100&addRecipeInformation=true`
    );
    const modelDiet = new Set(
      res.data.results
        .map((el) => el.diets)
        .flat()
        .concat(
          "ketogenic",
          "vegetarian",
          "lacto vegetarian",
          "ovo vegetarian",
          "primal"
        )
    );
    modelDiet.forEach((el) => {
      Diet.findOrCreate({
        where: { name: el },
      });
    });
  } catch (err) {
    console.error(err);
  }

  server.listen(PORT, () => {
    console.log("%s listening at 3001 - Diets loaded"); // eslint-disable-line no-console
  });
});
