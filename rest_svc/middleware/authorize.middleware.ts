import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET || "default");
    req.body.user = decode;
    next();
  } catch (error) {
    req.body.user = undefined;
    next();
  }
};

export default authorize;
