document.addEventListener("DOMContentLoaded", function() {
  console.log("JavaScript is running");

  const cartSidebar = document.getElementById("cartSidebar");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  let cart = [];

  function updateCart() {
      cartItems.innerHTML = '';
      let totalPrice = 0;

      cart.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.className = 'sidebar-cart-item';

          itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="sidebar-cart-item-img">
              <div>
                  <h5>${item.name}</h5>
                  <p>${item.price}</p>
              </div>
          `;

          cartItems.appendChild(itemElement);
          totalPrice += parseFloat(item.price.replace('$', ''));
      });

      totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  function addToCart(product) {
      cart.push(product);
      updateCart();
      cartSidebar.classList.add("open");
  }

  closeCart.addEventListener("click", function() {
      cartSidebar.classList.remove("open");
  });

  // Fetch products from JSON
  fetch('../data/products.json')
      .then(response => response.json())
      .then(products => {
          const productContainer = document.getElementById('productContainer');

          products.forEach(product => {
              const productCard = document.createElement('div');
              productCard.className = 'col-md-4';

              productCard.innerHTML = `
                  <div class="card product-card">
                      <img src="${product.src}" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">$${product.price}</p>
                          <button class="btn btn-primary add-to-cart">Dodaj v koÅ¡arico</button>
                      </div>
                  </div>
              `;

              productCard.querySelector('.add-to-cart').addEventListener('click', () => {
                  addToCart({
                      name: product.name,
                      price: `$${product.price}`,
                      image: product.src
                  });
              });

              productContainer.appendChild(productCard);
          });
      });
});