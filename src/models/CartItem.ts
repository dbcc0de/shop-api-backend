import { ObjectId } from "mongodb";
import Product from "./Product";

export default interface CartItem {
  _id?: ObjectId;
  userId: ObjectId;
  product: Product;
  quantity: number;
}

// template

// db.cart_items.insertMany([
//     {
//   userId: ObjectId("64dcec1b8599d73faf48c1cd"),
//    product: {name: 'lawn chairs', price: 9.99},
//   quantity: 4
//   },
//     {
//   userId: ObjectId("64dcec1b8599d73faf48c1cd"),
//    product: {name: 'cooler', price: 60},
//   quantity: 1
//   },
//   ])
