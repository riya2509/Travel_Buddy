import moment from "moment";
const authController = {};
import mysql from "../../databases/database.js";

authController.register = (req, res) => {
  const token = Math.random().toString().substring(2, 8);
  const expiry = moment().add(15, "minute").format("YYYY-MM-DD HH:mm:ss");
  const { name, email, password, phoneNum } = req.body;
  mysql(
    `INSERT INTO master (email,name,password,phoneNum,token,expiry) VALUES ('${email}', '${name}', '${password}', '${phoneNum}', '${token}','${expiry}');`
  )
    .then(() => {
      res.status(201).send({
        message: `Registered successfully`,
        status: 1,
      });
    })
    .catch((e) => {
      if (e.code === "ER_DUP_ENTRY") {
        res.status(200).send({ status: 0, message: `Email already exists` });
      } else {
        console.log(e);
        res
          .status(500)
          .send({ status: 0, message: `Some other error occured`, error: e });
      }
    });
};

export default authController;

// | token | varchar |
//  | expiry | dateTime |
//  | show | tinyInt |
//  | isActive | tinyInt
