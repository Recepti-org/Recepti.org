function createAlert(message) {
    const alertDiv = document.getElementById('alertDiv');
    if (alertDiv) {
      alertDiv.innerHTML = message + '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
      alertDiv.className = 'alert';
      window.scrollTo(0, 0);
    }
  }
  function createSuccessAlert(message) {
    const alertDiv = document.getElementById('alertDiv');
    if (alertDiv) {
      alertDiv.innerHTML = message + '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
      alertDiv.className = 'successAlert';
      window.scrollTo(0, 0);
    }
  }

// PRI IZDELKIH SE KAŽEJO V KOSARICI
document.addEventListener("DOMContentLoaded", function() {     
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  
  const updateCartCount = () => {
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      const cartIcon = document.querySelector('.icon-item:nth-child(2)');
      if (cartIcon) cartIcon.innerText = `👜${totalQuantity}`;
  };
  
  const updateTotalPrice = () => {
      const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const totalPriceElement = document.getElementById('totalPrice');
      if (totalPriceElement) totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
      const headerTotalElement = document.getElementById('header-total');
      if (headerTotalElement) headerTotalElement.innerText = `$${totalPrice.toFixed(2)}`;
  };

  const updateCartSidebar = () => {
    const cartItemsElement = document.getElementById('cartItems');
  
    if (cartItemsElement) {
      cartItemsElement.innerHTML = ''; 
  
      cart.forEach((item, index) => {
        let productElement = document.createElement('div');
        productElement.classList.add('sidebar-cart-item');
        productElement.innerHTML = `
          <img src="${item.img}" class="sidebar-cart-item-img" alt="${item.name}" />
          <div class="item-info">
              <p>${item.name}</p>
              <div class="quantity-controls">
                  <button class="decrease-quantity" data-index="${index}">-</button>
                  <span>${item.quantity}</span>
                  <button class="increase-quantity" data-index="${index}">+</button>
              </div>
              <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
              <button class="remove-item" data-index="${index}">🗑️</button>
          </div>
        `;
        cartItemsElement.appendChild(productElement);
      });

       attachEventListeners();
  }
};
function addToCart(e) {
    try{
        const button = e.target; 
    const product = button.closest('.product'); 
    const productName = product.querySelector('h3').innerText;
    const productPrice = parseFloat(product.querySelector('.price').innerText.replace('$', ''));
    const productImgSrc = product.querySelector('img').src;
    const productCategory = product.getAttribute('data-category');
    const newProduct = {
        name: productName,
        price: productPrice,
        img: productImgSrc,
        category: productCategory,
        quantity: 1
    };
    let existingProduct = cart.find(item => item.name === newProduct.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(newProduct);
    }
  
      console.log(newProduct);
  
      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartSidebar();
      updateTotalPrice();
      openSidebar();

      createSuccessAlert('Izdelek dodan v košarico!');
      
    } catch {
        console.error(error);
        createAlert('Napaka pri dodajanju izdelka v košarico!');
    }
  }

  const removeFromCart = (index) => {
      cart.splice(index, 1);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      updateCartSidebar();
      updateCartCount();
      updateTotalPrice();
  };
  
  const changeQuantity = (index, delta) => {
      const newQuantity = cart[index].quantity + delta;
      if (newQuantity <= 0) {
          removeFromCart(index);
      } else {
          cart[index].quantity = newQuantity;
          sessionStorage.setItem('cart', JSON.stringify(cart));
          updateCartSidebar();
          updateCartCount();
          updateTotalPrice();
      }
  };
  const attachEventListeners = () => {
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            changeQuantity(parseInt(this.getAttribute('data-index')), -1);
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            changeQuantity(parseInt(this.getAttribute('data-index')), 1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(parseInt(this.getAttribute('data-index')));
        });
    });
};
  const openSidebar = () => {
      document.getElementById('cartSidebar')?.classList.add('open');
  };
  
  document.querySelectorAll('.cart-btn').forEach(button => {
      button.addEventListener('click', addToCart);
  });
  
  updateCartSidebar();
  updateCartCount();
  updateTotalPrice();
  });
  