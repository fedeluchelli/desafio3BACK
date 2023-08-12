console.log("Hola este es el desafío entregable 3");

import { promises as fs } from "fs";
import ProductsManager from "./ProductsManager";
import Products from "./Products";

const productManager = new ProductsManager();
productManager.writeProducts();

const product1 = new Products(
  "AirJordan 1",
  "Zapatillas icónicas con diseño clásico",
  1500,
  "AJ1-001",
  5,
  []
);
const product2 = new Products(
  "AirJordan 4",
  "Zapatillas de baloncesto con tecnología de amortiguación avanzada",
  1800,
  "AJ4-003",
  8,
  []
);
const product3 = new Products(
  "AirJordan 6",
  "Zapatillas de edición especial en colaboración con un artista famoso",
  2200,
  "AJ6-005",
  3,
  []
);

setTimeout(() => {
  productManager.addProduct(product1);
  productManager.addProduct(product2);
  productManager.addProduct(product3);
}, 100);

setTimeout(() => {
  productManager.deleteProduct(2);
}, 200);

setTimeout(() => {
  productManager.updatedProduct(3, "Prueba", "número 3");
}, 300);
