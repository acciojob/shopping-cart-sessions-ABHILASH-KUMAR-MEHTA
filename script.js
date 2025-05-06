const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render all products
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render items in cart from sessionStorage
function renderCart() {
  cartList.innerHTML = "";
  const cartData = sessionStorage.getItem("cart");
  if (!cartData) return;

  const cart = JSON.parse(cartData);
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Set up event listeners
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    addToCart(id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// ✅ Delay rendering until DOM is fully ready (and Cypress has injected sessionStorage)
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
