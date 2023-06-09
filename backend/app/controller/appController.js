import mysql from "../../databases/database.js";

const appController = {};
const parsedData = (param) => JSON.parse(JSON.stringify(param));

appController.getCity = (req, res) => {
  // const vName = req.body.name;
  mysql(
    `SELECT t1.name as city_name,t1.id as id, t2.name as country_name, t2.code,t2.code2 AS flag FROM city AS t1 inner join country as t2 ON t1.CountryCode = t2.code WHERE t1.name != "" OR t1.name != " "  ORDER BY t1.name ASC;`
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
  mysql(
    `SELECT name,email,id,phoneNum,gender,year, college FROM master WHERE id='${jwt_id}'`
  )
    .then((response) => {
      res.send({ message: `User present`, data: response, status: 1 });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ message: `User not present` });
    });
};

appController.updateProfile = (req, res) => {
  console.log(req.body);
  const { name, phoneNum, gender, year, college, id } = req.body;
  mysql(
    `UPDATE master SET  name = '${name}', phoneNum = '${phoneNum}', gender = '${gender}', year = '${year}', college = '${college}' WHERE (id = '${id}');`
  )
    .then((response) => {
      const data = parsedData(response);

      console.log(data);
      if (data.changedRows > 0) {
        res.send({
          message: `Profile updated successfully`,
          data: {},
          status: 2,
        });
      } else {
        res.send({ message: `No changes are done`, data: response, status: 1 });
      }
    })
    .catch((e) => {
      console.log(e);
      res
        .status(500)
        .send({ message: `Some error while updating profile`, status: 0 });
    });
};

appController.updateLocation = (req, res) => {
  const { currLocation, destination, description } = req.body;

  mysql(
    `UPDATE master SET currLocation = '${currLocation}', destination = '${destination}', description= '${description}' WHERE (id = '${req.id}');`
  )
    .then((response) => {
      const data = parsedData(response);

      console.log(data);
      if (data.changedRows > 0) {
        res.send({
          message: `Successfully posted your travel plan!`,
          data: {},
          status: 2,
        });
      } else {
        res.send({
          message: `No changes are done in travel plan`,
          data: {},
          status: 1,
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: `Some error while posting your travel plan!`,
        status: 0,
      });
    });
};

export default appController;
