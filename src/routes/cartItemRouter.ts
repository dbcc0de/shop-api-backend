import express from "express";
import { getClient } from "../db";
import Product from "../models/Product";
import { ObjectId } from "mongodb";
import CartItem from "../models/CartItem";

const cartItemRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

cartItemRouter.get("/users/:userId/cart", async (req, res) => {
  try {
    const client = await getClient();
    const userId: string | null = (req.params.userId as string) || null;
    const query: any = {
      ...(userId ? { userId: new RegExp(userId, "i") } : {}),
    };
    const cursor = client.db().collection<CartItem>("cartItems").find(query);
    const result = await cursor.toArray();
    res.status(200).json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

cartItemRouter.post("/users/:userId/cart", async (req, res) => {
  try {
  } catch (err) {}
});

cartItemRouter.patch("/users/:userId/cart/:productId", async (req, res) => {
  try {
    const userId: ObjectId = new ObjectId(req.params.userId);
    const productId: ObjectId = new ObjectId(req.params.productId);
    const update = req.body;
    const client = await getClient();
    const results = await client.db().collection<CartItem>("cartItems").updateOne({userId: userId, productId: productId},  {$set: update})
    if (results.modifiedCount) {
      res.status(200).json(results)
    } else {
      res.status(404).json({message: `id not found`})
    }
  } catch(err) {
    errorResponse(err, res)
  }
})

export default cartItemRouter;
