import { Product } from "./Product.js";
import { Basket } from "./Basket.js";
import { ProductsList } from "./ProductsList.js";

const productsList = new ProductsList();

if (productsList.getProductsFromLocaleStorage().length === 0) {
  productsList.addProduct(new Product("tv", 200));
  productsList.addProduct(new Product("stolik", 100));
  productsList.addProduct(new Product("piwo", 5));
  productsList.addProduct(new Product("kanapa", 1000));
  productsList.addProduct(new Product("ramka", 50));
}

const basket = new Basket();

const createProductsListInHtml = () => {
  const domObjectProductsList = document.querySelector(".products-list-ul");
  domObjectProductsList.innerText = "";

  productsList.getProducts().forEach((el, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}. nazwa: ${el.name}, cena: ${el.price} zł.`;
    domObjectProductsList.appendChild(li);

    const btn = document.createElement("button");
    btn.innerText = "dodaj";
    btn.dataset.indexArray = index;
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.indexArray;
      const product = productsList.getProductByIndex(index);
      basket.addProduct(product);
      createBasketListInHtml();
    });
    li.appendChild(btn);
  });
};

const createBasketListInHtml = () => {
  const domObjectBasket = document.querySelector(".basket-list-ul");
  domObjectBasket.innerText = "";

  basket.getProductsFromLocaleStorage();

  if (basket.getProducts().length === 0) {
    const li = document.createElement("li");
    li.innerText = "Brak produktów w koszyku";
    domObjectBasket.appendChild(li);
  }

  basket.getProducts().forEach((el, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}. nazwa: ${el.name}, cena: ${el.price} zł.`;
    domObjectBasket.appendChild(li);

    const btn = document.createElement("button");
    btn.innerText = "usuń";
    btn.dataset.indexArray = index;
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.indexArray;
      basket.removeProduct(index);
      createBasketListInHtml();
    });
    li.appendChild(btn);
  });

  const btnPurchase = document.createElement("button");
  btnPurchase.classList.add("btnPurchase");
  btnPurchase.innerText = `Kup teraz - łączna kwota: ${basket.getTotalValue()} zł`;
  btnPurchase.addEventListener("click", (e) => {
    alert(
      `Gratulacje dokonania zakupu za łączną kwotę ${basket.getTotalValue()} zł`
    );
    basket.removeAllProducts();
    createBasketListInHtml();
  });

  if (basket.getProducts().length !== 0) {
    domObjectBasket.appendChild(btnPurchase);
  }
};

const handleAdminPanelInHtml = () => {
  const adminForm = document.querySelector(".form-administration");
  const nameInput = document.querySelector(".product-name-input");
  const priceInput = document.querySelector(".product-price-input");
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const price = Number(priceInput.value);
    productsList.addProduct({
      name,
      price,
    });
    nameInput.value = "";
    priceInput.value = "";
    createProductsListInHtml();
  });
};

createProductsListInHtml();
createBasketListInHtml();
handleAdminPanelInHtml();
