const jwt = require("jsonwebtoken");
const express = require("express");
const { JWT_TOKEN } = require("../config");
const app = express();

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   jwt.verify(authToken, JWT_TOKEN, ({userId}) => {
  //     req.userId = userId
  //     next();
  //   });

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json("please provide the Bearer token");
  }
  try {
    const authToken = authHeader.split(" ")[1];
    console.log(authToken);
    const decoded = jwt.verify(authToken, JWT_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "you token in invalid" });
  }
};

module.exports = { authenticate };
