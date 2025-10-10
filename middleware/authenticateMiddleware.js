
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const protectedAction = (req, res, next) => {
  const { authorization } = req.headers;

  // console.log("Authorization: ", authorization);
  if (!authorization) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized",
      data: [],
    });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        data: [],
      });
    }

    // req.user = decoded.payload;

     req.user = decoded; 
    next();
  });


};