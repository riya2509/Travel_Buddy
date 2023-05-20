import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.id = decoded.id;
    req.email = decoded.email;
    req.name = decoded.name;

    next();
  } catch (e) {
    // console.log(e);
    res.status(401).send({ message: `Please login again` });
  }
};
