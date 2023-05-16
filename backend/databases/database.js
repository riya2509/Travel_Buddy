import Sqllib from "mysql";
const sql = Sqllib.createConnection({
  host: "localhost",
  password: "root",
  user: "root",
  database: "travel_buddy",
  timezone: "+00:00",
});

sql.query(`select 1+1 as solution`, (err, result) => {
  if (err) {
    console.log(error);
  } else {
    console.log(`Database connected at ${new Date().toUTCString()}`);
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
