import * as express from "express";
var jwt = require("jsonwebtoken");

export const SIGN_TOKEN = (data: any) => {
  return jwt.sign(data, "payme");
};

export const VERIFY_TOKEN = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  let isRouteExcluded = excludeRoutes.filter(route => {
    return req.originalUrl.search(route) > -1;
  })[0];

  if (isRouteExcluded) {
    next();
    return;
  }
  //when using Request only can not see authorization so using express.Request
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized request" });
  } else {
    try {
      const token = req.headers.authorization;

      const decode_token = jwt.verify(token, "payme");
      req.user = decode_token;
      if (!decode_token) {
        return res.status(401).json({ message: "Unauthorized request" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
};

let excludeRoutes: Array<string> = [
];
