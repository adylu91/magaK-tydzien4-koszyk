class Basket {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
    this.setProductsInLocaleStorage();
  }

  removeProduct(no) {
    this.products.splice(no, 1);
    this.setProductsInLocaleStorage();
  }

  removeAllProducts() {
    this.products.length = 0;
    this.setProductsInLocaleStorage();
  }

  setProductsInLocaleStorage() {
    localStorage.setItem("basket", JSON.stringify(this.products));
  }

  getProductsFromLocaleStorage() {
    return JSON.parse(localStorage.getItem("basket"));
  }

  getTotalValue() {
    return this.products.reduce(
      (a, b) => {
        return { price: a.price + b.price };
      },
      { price: 0 }
    ).price;
  }

  getProducts() {
    return [...this.products];
  }
}

export { Basket };
