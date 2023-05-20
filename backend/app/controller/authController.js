import moment from "moment";
import bcryptjs from "bcryptjs";
import mysql from "../../databases/database.js";
import jwt from "jsonwebtoken";

const authController = {};
const parsedData = (param) => JSON.parse(JSON.stringify(param));

authController.register = (req, res) => {
  const token = Math.random().toString().substring(2, 8);
  const expiry = moment().add(15, "minute").format("YYYY-MM-DD HH:mm:ss");
  const { name, email, password, phoneNum } = req.body;
  var salt = bcryptjs.genSaltSync(10);
  var hashedPassword = bcryptjs.hashSync(password, salt);
  mysql(
    `INSERT INTO master (email,name,password,phoneNum,token,expiry) VALUES ('${email}', '${name}', '${hashedPassword}', '${phoneNum}', '${token}','${expiry}');`
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

authController.login = (req, res) => {
  const { email, password } = req.body;
  mysql(
    `SELECT email,id,name,password as hashed,phoneNum,token,expiry,isActive from master WHERE email='${email}'`
  )
    .then((response) => {
      const data = parsedData(response);
      if (data.length > 0) {
        const { id, name, email, hashed } = data[0];
        const ismatched = bcryptjs.compareSync(password, hashed ? hashed : "");
        if (ismatched && data[0].isActive === 1) {
          //token generation
          const token = jwt.sign(
            {
              id: id,
              name: name,
              email: email,
            },
            "secret_key",
            { expiresIn: "2h" }
          );
          res.send({ message: `Logged in succesfully`, token });
        } else {
          res.send({ message: `Invalid credentials` });
        }
      } else {
        res.send({ message: `Invalid credentials` });
      }
    })
    .catch((e) => {
      console.log(e);
      res.send({ message: `Trouble signing you in`, error: e });
    });
};

export default authController;

// | token | varchar |
//  | expiry | dateTime |
//  | show | tinyInt |
//  | isActive | tinyInt
