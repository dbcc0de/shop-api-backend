// require the express module

import express from "express";
import { getClient } from "../db";
import Product from "../models/Product";
import { ObjectId } from "mongodb";
const productsRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// endpoints go here

productsRouter.get("/products", async (req, res) => {
  try {
    let maxPrice: number | null = Number(req.query["max-price"]);
    if (isNaN(maxPrice)) maxPrice = null;
    let includes: string | null = (req.query.includes as string) || null;
    const query: any = {
      ...(maxPrice ? { price: { $lte: maxPrice } } : {}),
      ...(includes ? { product: new RegExp(`${includes}`, "i") } : {}),
    };
    let limit: number | null = parseInt(req.query.limit as string);
    if (isNaN(limit)) limit = null;
    const client = await getClient();
    const cursor = client.db().collection<Product>("products").find(query);
    if (limit) cursor.limit(limit);
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (error) {
    errorResponse(error, res);
  }
});

productsRouter.get("/products/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Product>("products")
      .findOne({ _id });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: `Item with id:${_id} not found` });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default productsRouter;