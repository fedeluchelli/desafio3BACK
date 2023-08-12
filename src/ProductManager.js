import { promises as fs } from "fs";

class ProductsManager {
  constructor() {
    this.products = [];
    this.usedIds = new Set();
    this.filePath = "./products.json";
    this.readProducts();
  }

  async writeProducts() {
    const datos = JSON.stringify(this.products, null, 4);
    await fs.writeFile(this.filePath, datos, "utf8");
  }

  async readProducts() {
    try {
      const data = JSON.parse(await fs.readFile(this.filePath, "utf-8"));
      this.products = data;
      this.products.forEach((producto) => this.usedIds.add(producto.id));
      return this.products;
    } catch (error) {
      if (error) {
        this.products = [];
        this.usedIds = new Set();
      }
    }
  }

  async addProduct(product) {
    try {
      const existingProduct = this.products.find(
        (prod) => prod.code === product.code
      );
      if (existingProduct) {
        throw new Error(
          "Producto ya existente. Verifique que haya ingresado correctamente los datos"
        );
      } else {
        this.products.push(product);
        this.usedIds.add(product.id);
        console.log("Producto correctamente agregado");
        await this.writeProducts();
      }
    } catch (error) {
      console.error("Ups! Surgió un error");
    }
  }

  async updatedProduct(productId, propertyName, newValue) {
    try {
      const productToUpdate = this.products.find(
        (prod) => prod.id === productId
      );
      if (!productToUpdate) {
        throw new Error("Producto no existente en base de datos");
      } else {
        productToUpdate[propertyName] = newValue;

        const index = this.products.findIndex((prod) => prod.id === productId);
        if (index !== -1) {
          this.products[index] = productToUpdate;
          const productos = JSON.stringify(this.products, null, 4);
          await this.writeProducts();
        }
      }
    } catch (error) {
      console.error("Ups!", error.message);
    }
  }

  async getProductById(id) {
    const productId = this.products.find((prod) => prod.id === id);
    if (productId) {
      console.log("Producto encontrado");
      console.log(productId);
    } else {
      console.log("Producto no encontrado");
      return null;
    }
  }

  async getProducts() {
    const products = await this.readProducts();
    console.log(products);
  }

  async deleteProduct(id) {
    try {
      const products = this.products.find((prod) => prod.id === id);
      if (products) {
        const prodsToDelete = this.products.filter((prod) => prod.id !== id);
        this.products = prodsToDelete;
        await this.writeProducts();
      }
    } catch (error) {
      console.error("Surgió un error al eliminar prooducto", error.message);
    }
  }
}
export default ProductsManager;
