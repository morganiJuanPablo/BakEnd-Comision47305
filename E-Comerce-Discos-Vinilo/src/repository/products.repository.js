//
export class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async addManyProducts(products) {
    const productsToMock = await this.dao.addManyProducts(products);
    return productsToMock;
  }

  /////////////////////////////////////////////////////
  async createProduct(product) {
    const newProduct = await this.dao.createProduct(product);
    return newProduct;
  }

  /////////////////////////////////////////////////////
  async getProductById(productId) {
    const product = await this.dao.getProductById(productId);
    return product;
  }

  /////////////////////////////////////////////////////
  async getProducts(category, options) {
    const products = await this.dao.getProducts(category, options);
    return products;
  }

  /////////////////////////////////////////////////////
  async deleteProductById(idProduct) {
    await this.dao.deleteProductById(idProduct);
  }

  /////////////////////////////////////////////////////
  async updateProductById(productId, productUpdated) {
    await this.dao.updateProductById(productId, productUpdated);
  }
}
