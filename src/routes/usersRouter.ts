// require the express module

import express from "express";
import { getClient } from "../db";
// import User from "../models/User";
const usersRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);

  res.status(500).json({ message: "Internal Server Error" });
};

// endpoints go here

export default usersRouter;
