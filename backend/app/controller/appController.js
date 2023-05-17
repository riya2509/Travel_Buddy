const appController = {};
import sql from "../database.js";

appController.welcome = (req, res) => {
  setTimeout(() => {
    res.send({ message: "API is working." });
  }, 5000);
};

appController.createData = (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const phoneNum = req.body.phoneNum;

  sql.query(
    `INSERT INTO master (email,name,password,phoneNum) VALUES ('${email}', '${name}', '${password}', '${phoneNum}');`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.send({ error });
      } else {
        res.send({ message: `Task created successfully` });
      }
    }
  );
};

export default appController;
