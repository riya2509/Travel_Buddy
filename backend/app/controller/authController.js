import moment from "moment";
const authController = {};

authController.register = (req, res) => {
  const token = Math.random().toString().substring(2, 8);
  const expiry = moment().add(15, "minute").format("YYYY-MM-DD HH:mm:ss");
  const payload = { ...req.body, token, expiry };
  console.log(payload);
  res.send({});
};

export default authController;

// | token | varchar |
//  | expiry | dateTime |
//  | show | tinyInt |
//  | isActive | tinyInt
