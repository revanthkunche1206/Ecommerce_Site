document.addEventListener('DOMContentLoaded', function () {
  const cartData = sessionStorage.getItem('cart');
  if (cartData) {
    const cartlist = JSON.parse(cartData);
    displayCart(cartlist);
  }
});

function displayCart(cart) {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const productImg = document.createElement('img');
    productImg.className = 'product-img';

    productImg.src = item.images?.[0] || item.thumbnail || '';
    productImg.alt = item.title;
    cartItem.appendChild(productImg);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';

    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = item.title;
    infoDiv.appendChild(title);

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${item.price}`;
    infoDiv.appendChild(price);

    cartItem.appendChild(infoDiv);
    cartContainer.appendChild(cartItem);

    totalPrice += item.price;
  }

  const priceSummary = document.getElementById('checkout-details');
  priceSummary.innerHTML = ''; 
  const totalPriceDiv = document.createElement('div');
  totalPriceDiv.className = 'item';

  const totalPriceLabel = document.createElement('div');
  totalPriceLabel.className = 'item-label';
  totalPriceLabel.textContent = 'TOTAL PRICE';

  const totalPriceValue = document.createElement('div');
  totalPriceValue.className = 'item-value';
  totalPriceValue.textContent = `$${totalPrice.toFixed(2)}`;

  totalPriceDiv.appendChild(totalPriceLabel);
  totalPriceDiv.appendChild(totalPriceValue);
  priceSummary.appendChild(totalPriceDiv);
}
