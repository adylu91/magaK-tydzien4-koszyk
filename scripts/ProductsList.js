class ProductsList {
  constructor() {
    this.products = this.getProductsFromLocaleStorage();
  }

  addProduct(product) {
    this.products.push(product);
    this.setProductsInLocaleStorage();
  }

  removeProduct(no) {
    this.products.splice(no - 1, 1);
    this.setProductsInLocaleStorage();
  }

  setProductsInLocaleStorage() {
    localStorage.setItem("productsList", JSON.stringify(this.products));
  }

  getProductsFromLocaleStorage() {
    if (JSON.parse(localStorage.getItem("productsList")) === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem("productsList"));
    }
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
