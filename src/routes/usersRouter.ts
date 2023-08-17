// require the express module

import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import User from "../models/User";

// import User from "../models/User";
const usersRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);

  res.status(500).json({ message: "Internal Server Error" });
};

// endpoints go here

usersRouter.get("/users/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client.db().collection<User>("users").findOne({ _id });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `User with id:${_id} not found` });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

usersRouter.post("/users", async (req, res) => {
  try {
    const newUser: User = req.body;
    const client = await getClient();
    client.db().collection<User>("users").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

usersRouter.put("/users/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const updatedUser: User = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<User>("users")
      .replaceOne({ _id }, updatedUser);
    if (result.modifiedCount) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: `User with id:${_id} not found` });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

usersRouter.delete("/users/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<User>("users")
      .deleteOne({ _id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "nah" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default usersRouter;
