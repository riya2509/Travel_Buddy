import mysql from "../../databases/database.js";

const appController = {};
const parsedData = (param) => JSON.parse(JSON.stringify(param));

appController.getCity = (req, res) => {
  const vName = req.query.name;
  mysql(
    `SELECT t1.name as city_name, t2.name as country_name, t2.code FROM city AS t1 inner join country as t2 ON t1.CountryCode = t2.code WHERE t1.name LIKE '%${vName}%';`
  )
    .then((response) => {
      const data = parsedData(response);
      console.log(data);
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
      res.send({ message: `User not found`, error: e });
    });
};

//getcity-> function
//route -> /city
// jam% with country
// city then country
export default appController;
