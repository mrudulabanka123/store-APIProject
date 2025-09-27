const cartItemsEl = document.getElementById("cartItems");
const productsTotalEl = document.getElementById("productsTotal");
const totalAmountEl = document.getElementById("totalAmount");
const itemCountEl = document.getElementById("itemCount");
const cartCountEl = document.getElementById("cart-count");
const shippingCost = 30;




function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty</p>";
    productsTotalEl.textContent = "0";
    totalAmountEl.textContent = "0";
    if (cartCountEl) cartCountEl.textContent = "0";
    if (itemCountEl) itemCountEl.textContent = "0";
    return;
  }



  let productsTotal = 0;

  cart.forEach((item) => {
    productsTotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      
      
       <div class="cart-info">
        <h4>${item.title}</h4>
        
        
      </div>
    
      <div class="quantity-controls">
          <button class="quantity-btn" onclick="changeQty(${item.id},'dec')">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="changeQty(${item.id},'inc')">+</button>
          
          <p>${item.quantity} X <strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
        </div>
    `;
    cartItemsEl.appendChild(div);
  });

  productsTotalEl.textContent = productsTotal.toFixed(0);
  totalAmountEl.textContent = (productsTotal + shippingCost).toFixed(0);
  itemCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = itemCountEl.textContent;
}

function changeQty(id, type) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map(item => {
    if (item.id === id) {
      if (type === "inc") item.quantity += 1;
      else item.quantity = Math.max(1, item.quantity - 1);
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();
