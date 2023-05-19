import mysql from "../../databases/database.js";

const appController = {};
const parsedData = (param) => JSON.parse(JSON.stringify(param));

appController.getCity = (req, res) => {
  // setTimeout(() => {
  //   res.send({ message: "API is working." });
  // }, 5000);
  const { name, email, password, phoneNum } = req.body;

  mysql(
    `SELECT master.email,master.name,master.password as hashed,master.phoneNum, city.name FROM master , city WHERE city.name LIKE 'jam%'`
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
