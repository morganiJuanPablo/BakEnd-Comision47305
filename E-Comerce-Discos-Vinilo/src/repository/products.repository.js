//
export class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async addManyProducts(products) {
    try {
      const productsToMock = await this.dao.addManyProducts(products);
      return productsToMock;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async createProduct(product) {
    try {
      const newProduct = await this.dao.createProduct(product);
      return newProduct;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getProductById(productId) {
    try {
      const product = await this.dao.getProductById(productId);
      return product;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getProducts(category, options) {
    try {
      const products = await this.dao.getProducts(category, options);
      return products;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async deleteProductById(idProduct) {
    try {
      await this.dao.deleteProductById(idProduct);
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async updateProductById(productId, productUpdated) {
    try {
      await this.dao.updateProductById(productId, productUpdated);
    } catch (error) {
      logger.error(error.message);
    }
  }
}
