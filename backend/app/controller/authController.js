import moment from "moment";
import bcryptjs from "bcryptjs";
import mysql from "../../databases/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authController = {};
const parsedData = (param) => JSON.parse(JSON.stringify(param));

authController.register = (req, res) => {
  const token = Math.random().toString().substring(2, 8);
  const expiry = moment().add(15, "minute").format("YYYY-MM-DD HH:mm:ss");
  const { name, email, password, phoneNum, gender, year, college } = req.body;
  var salt = bcryptjs.genSaltSync(10);
  var hashedPassword = bcryptjs.hashSync(password, salt);
  mysql(
    `INSERT INTO master (email,name,password,phoneNum,token,expiry,gender,year,college) VALUES ('${email}', '${name}', '${hashedPassword}', '${phoneNum}', '${token}','${expiry}','${gender}','${year}','${college}');`
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
        const { id, name, email, hashed, isActive } = data[0];
        const ismatched = bcryptjs.compareSync(password, hashed ? hashed : "");
        if (isActive === 1) {
          if (ismatched) {
            //token generation
            const token = jwt.sign(
              {
                id: id,
                name: name,
                email: email,
              },
              process.env.SECRET,
              { expiresIn: "2h" }
            );
            res.send({ message: `Logged in succesfully`, token, status: 1 });
          } else {
            res.send({ message: `Invalid credentials`, status: 0 });
          }
        } else {
          res.send({ message: `Your account is not active yet!`, status: 0 });
        }
      } else {
        res.send({ message: `Invalid credentials`, status: 0 });
      }
    })
    .catch((e) => {
      console.log(e);
      res.send({ message: `Trouble signing you in`, error: e, status: 0 });
    });
};

export default authController;
