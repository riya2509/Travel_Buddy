import mysql from "../../databases/database.js";

const appController = {};
const parsedData = (param) => JSON.parse(JSON.stringify(param));

appController.getCity = (req, res) => {
  // setTimeout(() => {
  //   res.send({ message: "API is working." });
  // }, 5000);
  const name = req.body;

  // mysql(
  //   `SELECT master.email,master.name as cust_name,master.password as hashed,master.phoneNum, city.name FROM master , city WHERE city.name LIKE 'jam%'`
  // )
  mysql(
    `SELECT t1.name as city_name, t2.name as country_name, t2.code FROM city AS t1 inner join country as t2 ON t1.CountryCode = t2.code WHERE t1.name LIKE 'jam%';`
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
