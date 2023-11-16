import moment from "moment";
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
      res.status(500).send({ message: `User not present`, status: 0 });
    });
};

appController.updateProfile = (req, res) => {
  console.log(req.body);
  const { name, phoneNum, gender, year, college } = req.body;
  mysql(
    `UPDATE master SET  name = '${name}', phoneNum = '${phoneNum}', gender = '${gender}', year = '${year}', college = '${college}' WHERE (id = '${req.id}');`
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

appController.insertPost = (req, res) => {
  const { fromPlaceId, toPlaceId, description, startDate, endDate, trainInfo } =
    req.body;

  mysql(
    `INSERT INTO post (description, fromPlaceId, toPlaceId, startDate, endDate, trainInfo, userId) VALUES ('${description}', '${fromPlaceId}', '${toPlaceId}', '${startDate}', '${endDate}', '${trainInfo}', '${req.id}')`
  )
    .then((response) => {
      const data = parsedData(response);

      console.log(data);
      if (data.insertId) {
        mysql(`call getPost(1, 0);`)
          .then((response) => {
            res.send({
              message: `Successfully posted your travel plan!`,
              data: response[0][0],
              status: 1,
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(500).send({
              message: `Some error while posting your travel plan!`,
              status: 0,
            });
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

const postQueryBuilder = ({ req, type = "all", value, row }) => {
  let query = ``;
  switch (type) {
    case "myplan":
      query = `where t1.userId = ${req.id}`;
      break;
    case "today":
      query = `where t1.startDate = '${moment().format("YYYY-MM-DD")}'`;
      break;

    default:
      query = ``;
      break;
  }
  return `SELECT 
  t4.name,
  t4.college,
  t1.id,
  t1.description,
  t1.endDate,
  t1.startDate,
  t1.trainInfo,
  t2.Name AS fromPlace,
  t3.Name AS toPlace,
  t1.fromPlaceId,
  t1.toPlaceId
FROM
  post AS t1
      JOIN
       master AS t4 ON t4.id = t1.userId
      JOIN
  city AS t2 ON t1.fromPlaceId = t2.ID
      JOIN
  city AS t3 ON t3.ID = t1.toPlaceId 
  ${query}
ORDER BY ID DESC LIMIT ${row} OFFSET ${value}`;
};

appController.fetchPost = (req, res) => {
  const { page, row, type } = req.query;
  // const value = (page - 1) * row;
  const value = page <= 0 || isNaN(page) ? 0 : (page - 1) * row;
  console.log(postQueryBuilder({ req, type, value, row }));
  mysql(postQueryBuilder({ req, type, value, row }))
    .then((response) => {
      res.send({ message: `Data present`, data: response, status: 1 });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ message: `Data not present`, status: 0 });
    });
};

appController.like = (req, res) => {
  const post_Id = req.query.post_Id;
  const user_Id = req.id;

  if (!post_Id || !user_Id) {
    res.status(400).send({
      message: `Please send proper payload`,
      status: 0,
    });
  } else {
    mysql(`call travel_buddy.like(${user_Id}, ${post_Id}, @flag)`)
      .then((response) => {
        const data = parsedData(response);
        res.send({
          message:
            data[0][0].flag === 1
              ? `Interested for this journey`
              : `Not Interested for this journey`,
          status: 1,
          data: data[0][0].flag,
          isLiked: data[0][0].flag === 1,
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send({
          message: `Some issue while performing the operation`,
          status: 0,
        });
      });
  }
};

export default appController;
