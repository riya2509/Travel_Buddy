import mysql from "../../databases/database.js";

const appController = {};
// const parsedData = (param) => JSON.parse(JSON.stringify(param));

appController.getCity = (req, res) => {
  const vName = req.query.name;
  mysql(
    `SELECT t1.name as city_name, t2.name as country_name, t2.code,t2.code2 AS flag FROM city AS t1 inner join country as t2 ON t1.CountryCode = t2.code WHERE t1.name LIKE '%${vName}%';`
  )
    .then((response) => {
      res.send({ data: response });
    })
    .catch((e) => {
      console.log(e);
      res.send({ message: `User not found`, error: e });
    });
};

appController.getProfile = (req, res) => {
  const jwt_id = req.id;
  mysql(`SELECT name,email,id,phoneNum FROM master WHERE id='${jwt_id}'`)
    .then((response) => {
      res.send({ message: `User present`, data: response });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ message: `User not present` });
    });
};

/**
 * route name-> /me
 * function name-> getProfile
 * input nothing
 * output email, name,phoneNum
 */
export default appController;
