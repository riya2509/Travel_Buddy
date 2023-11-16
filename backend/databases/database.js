import Sqllib from "mysql";
import dotenv from "dotenv";
dotenv.config();
const { DB_HOST, DB_PASSWORD, DB_USER, DB_DATABASE } = process.env;
const sql = Sqllib.createConnection({
  host: DB_HOST,
  password: DB_PASSWORD,
  user: DB_USER,
  database: DB_DATABASE,
  // timezone: "+05:30",
});

sql.query(`select 1+1 as solution`, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Database connected at ${new Date().toLocaleString()}`);
  }
});
const mysql = (queryString = "") =>
  new Promise((resolve, reject) =>
    sql.query(queryString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );

export default mysql;
