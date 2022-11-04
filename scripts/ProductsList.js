class ProductsList {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(no) {
    this.products.splice(no - 1, 1);
  }

  getProducts() {
    return [...this.products];
  }

  getProductByIndex(index) {
    const i = Number(index);
    return { ...this.products[i] };
  }
}

export { ProductsList };
